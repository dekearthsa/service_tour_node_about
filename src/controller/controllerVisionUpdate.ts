const { request: Req } = require('express')
const { response: Res } = require('express')

const controllerVisionUpdate = async (req: typeof Req, res: typeof Res) => {
    res.status(200).send("update!")
}

export {controllerVisionUpdate}