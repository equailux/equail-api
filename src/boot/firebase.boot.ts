import firebaseService from "@/shared/services/firebase.service.js"

//

const boot = async () => {
    await firebaseService
        .connect()
        .then(() => console.info(`Firebase connection successful.`))
        .catch(() => console.info(`Firebase connection failed.`))
}

//

export default { boot }
