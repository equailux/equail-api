import { type IncomingMessage } from "http"
import { type Duplex } from "stream";
import espWebsocket from "src/websockets/esp.websocket.js";

//

const connect = async (req: IncomingMessage, socket: Duplex, head: NonSharedBuffer) => {
    const pathname = new URL(req.url!, "http://localhost").pathname
    if (pathname.startsWith("/ws/esp")) espWebsocket.upgrade(req, socket, head)
    else socket.destroy(new Error("Path provided doesn't handle websocket."))
}

//

export default { connect }
