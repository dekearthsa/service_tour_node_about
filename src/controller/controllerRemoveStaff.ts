const { request: Req } = require('express')
const { response: Res } = require('express')

const controllerRemoveStaff = async (req: typeof Req, res: typeof Res) => {
    res.status(200).send("Delete!")
}

export {controllerRemoveStaff}