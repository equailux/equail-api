import { Tunnel } from "cloudflared"

//

let url = ""

//

const connect = async () => {
    const tunnel = Tunnel.quick()
    url = await new Promise(res => tunnel.once("url", res))
    return await new Promise(res => tunnel.once("connected", res))
}

const getUrl = () => url

//

export default { connect, getUrl }
