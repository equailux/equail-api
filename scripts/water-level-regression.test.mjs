import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { createRequire } from "node:module"
import { runInNewContext } from "node:vm"
import { test } from "node:test"
import ts from "typescript"
import z from "zod"

const require = createRequire(import.meta.url)

// Load the actual modules with isolated database and websocket dependencies.
function load(path, mocks) {
	const source = readFileSync(new URL(path, import.meta.url), "utf8")
	const { outputText } = ts.transpileModule(source, {
		compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
	})
	const exports = {}
	runInNewContext(outputText, { exports, require: name => name in mocks ? mocks[name] : require(name), console })
	return exports.default
}

test("successive low readings rerun the pump; normal readings do not; active runs do not overlap", async () => {
	let active = false
	let input = 0
	let releaseDuration
	let started
	let starts = 0
	const actuator = { id: 1, input: 0 }
	const action = { id: 1, thresholdId: 1, actuatorId: 1, input: 1, delay: 0, duration: 100 }
	const broadcasts = []
	const actuatorModel = {
		findByPk: async () => ({ input }),
		findAll: async () => [actuator],
		update: async data => {
			input = data.input
			if (input === 1) starts++
		},
	}
	const actions = load("../src/modules/actions/action.module.ts", {
		"timers/promises": { setTimeout: async delay => {
			if (!delay) return
			await new Promise(resolve => { releaseDuration = resolve; started() })
		} },
		"@/modules/actuators/actuator.model.js": { Actuator: actuatorModel },
		"@/realtime/websockets/esp.websocket.js": { broadcast: async event => broadcasts.push(event) },
		"@/realtime/websockets/app.websocket.js": { broadcast: async () => {} },
	})
	const handler = load("../src/realtime/handlers/esp.handler.ts", {
		"@/modules/readings/reading.model.js": { Reading: { bulkCreate: async data => data.map(dataValues => ({ dataValues })) } },
		"@/modules/sensors/sensor.model.js": { Sensor: { findAll: async () => [{ id: 1, tag: "water" }] } },
		"@/modules/thresholds/threshold.model.js": { Threshold: { findAll: async () => [{ id: 1, sensorId: 1, activated: active }] } },
		"@/modules/conditions/condition.model.js": { Condition: { findAll: async () => [] } },
		"@/modules/readings/reading.schema.js": { ReadingCreateSchema: z.object({ name: z.string(), unit: z.string(), value: z.number() }) },
		"@/realtime/websockets/app.websocket.js": { broadcast: async () => {} },
		"@/modules/thresholds/threshold.module.js": { evaluate: async (_threshold, _conditions, value) => (active = value <= 25) },
		"@/modules/conditions/condition.module.js": {},
		"@/modules/actions/action.model.js": { Action: { findAll: async ({ where }) => where.thresholdId[Reflect.ownKeys(where.thresholdId)[0]].includes(1) ? [action] : [] } },
		"@/modules/actuators/actuator.model.js": { Actuator: actuatorModel },
		"@/modules/actions/action.module.js": actions,
		"@/modules/system-error/system-error.service.js": {},
		"@/modules/power/power.model.js": {},
		"@/modules/power/power.schema.js": {},
		"@/modules/power/power.service.js": {},
		"@/modules/power/interruption/power.interruption.schema.js": {},
		"@/modules/power/interruption/power.interruption.service.js": {},
	})
	const reading = value => handler.onCreateReading([{ tag: "water", name: "Water level", unit: "%", value }])
	for (const value of [20, 15, 25]) {
		const running = new Promise(resolve => { started = resolve })
		const completed = reading(value)
		await running
		const count = starts
		await reading(10)
		assert.equal(starts, count, "a reading during a pump run must not start another run")
		releaseDuration()
		await completed
		assert.equal(input, 0, "pump must return to its resting input")
	}
	assert.equal(starts, 3, "each low reading after completion must start a fresh pump run")
	await reading(26)
	assert.equal(starts, 3, "a reading above the threshold must not run the pump")
	assert.deepEqual(broadcasts.map(event => event.data[0].input), [1, 0, 1, 0, 1, 0])
})
