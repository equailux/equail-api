import { v2 as cloudinary } from "cloudinary"

//

let cloudName: string = ""
let apiKey: string = ""
let apiSecret: string = ""

//

const connect = async (name: string, key: string, secret: string) => {
    [cloudName, apiKey, apiSecret] = [name, key, secret]
    cloudinary.config({ cloud_name: name, api_key: key, api_secret: secret })
}

const create = async (
    path: string,
    filename: string,
    folder: string = "equail"
) => {
    return await cloudinary.uploader.upload(path, { public_id: filename, folder })
}

const retrieve = async (filename: string, folder: string = "equail") => {
    const url = `https://res.cloudinary.com/${cloudName}/image/upload/${folder}/${filename}`
    return await fetch(url)
}

const destroy = async (filename: string) => {
    return await cloudinary.uploader.destroy(filename)
}

//

export default { cloudinary, connect, create, retrieve, destroy }
