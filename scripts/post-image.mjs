import { readFile } from "node:fs/promises"
import { basename, dirname, extname, isAbsolute, join } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))

const [url, imageFile, fieldName = "image"] = process.argv.slice(2)

if (!url || !imageFile) {
	console.error("Usage: node scripts/post-image.mjs <url> <image-file> [field-name]")
	console.error("Example: node scripts/post-image.mjs http://localhost:3000/api/captures photo.jpg image")
	process.exit(1)
}

const imagePath = isAbsolute(imageFile) ? imageFile : join(__dirname, imageFile)
const imageBuffer = await readFile(imagePath)

const form = new FormData()
const blob = new Blob([imageBuffer], { type: getContentType(imagePath) })
form.append(fieldName, blob, basename(imagePath))

const response = await fetch(url, {
	method: "POST",
	body: form,
})

const contentType = response.headers.get("content-type") ?? ""
const body = contentType.includes("application/json") ? await response.json() : await response.text()

console.log(`Status: ${response.status} ${response.statusText}`)
console.log(typeof body === "string" ? body : JSON.stringify(body, null, 2))

if (!response.ok) {
	process.exit(1)
}

function getContentType(filePath) {
	switch (extname(filePath).toLowerCase()) {
		case ".jpg":
		case ".jpeg":
			return "image/jpeg"
		case ".png":
			return "image/png"
		case ".webp":
			return "image/webp"
		case ".gif":
			return "image/gif"
		default:
			return "application/octet-stream"
	}
}
