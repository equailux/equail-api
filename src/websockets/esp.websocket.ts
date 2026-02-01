import { RawData, WebSocket, WebSocketServer } from "ws";
import { type IncomingMessage } from "http"
import { type Duplex } from "stream";

//

type Cmd = `c:${string}` | `r:${string}` | `u:${string}` | `d:${string}`
type Handler<T = any> = (data: T) => any

//

const wss = new WebSocketServer({ noServer: true })
const sockets: WebSocket[] = []
const handlers = new Map<Cmd, Handler[]>()

//

const upgrade = async (req: IncomingMessage, socket: Duplex, head: NonSharedBuffer) => {
    wss.on("connection", onConnect)
    wss.handleUpgrade(req, socket, head, (ws) => wss.emit("connection", ws))
}

const respond = async <T = any>(cmd: Cmd, handler: Handler<T>) => {
    if (!handlers.has(cmd)) handlers.set(cmd, [handler])
    handlers.get(cmd)?.push(handler)
}

const broadcast = async (msg: string) => {
    sockets
        .filter((s) => s.OPEN)
        .forEach((s) => s.send(msg, (e) => console.error(`Esp websocket error: ${e?.message}.`)))
}

//

const onConnect = async (ws: WebSocket) => {
    sockets.push(ws)
    ws.on("message", onMessage)
    ws.on("close", onDisconnect)
    console.info(`Esp websocket device connected.`)
}

const onMessage = async <T = any>(ws: WebSocket, data: RawData, isBinary: boolean) => {
    if (isBinary) return console.info(`Esp websocket received binary.`)
    
    const dstr = data.toString()
    const parsed = await Promise
        .resolve()
        .then(() => JSON.parse(dstr))
        .catch(() => undefined)
    
    if (!parsed) return console.info(`Esp websocket received invalid message.`)
    if (!("cmd" in parsed)) return console.info(`Esp websocket received cmdless message.`)
    
    const msg = parsed as T & { cmd: Cmd }
    const cbs = handlers.get(msg.cmd)
    if (!cbs || cbs.length <= 0) return console.info(`Esp websocket doesn't have handler for ${msg.cmd}.`)
    
    const promises = []
    for (const cb of cbs) {
        const prms = Promise
            .resolve()
            .then(() => cb(msg))
            .catch((e) => console.error(`Esp websocket handler error: ${e?.message}.`))
        promises.push(prms)
    }
    
    await Promise.all(promises)
}

const onDisconnect = async (ws: WebSocket, code: number, reason: Buffer) => {
    const index = sockets.indexOf(ws)
    if (index !== -1) sockets.splice(index, 1)
    console.info(`Esp websocket device disconnected.`)
}

//

export default { upgrade, respond, broadcast }
