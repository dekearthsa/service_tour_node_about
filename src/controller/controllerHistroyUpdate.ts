const { request: Req } = require('express')
const { response: Res } = require('express')

const controllerHistroyUpdate = async (req: typeof Req, res: typeof Res) => {
    res.status(200).send("update!")
}

export {controllerHistroyUpdate}