const { request: Req } = require('express')
const { response: Res } = require('express')
const { Datastore } = require("@google-cloud/datastore");
const path = require("path");
const serviceType = require("../interface/serviceType");
require('dotenv').config({ path: path.resolve(__dirname, "../../.env") });

const kind = process.env.KIND_SERVICE
const datastore = new Datastore();


const controllerServiceUpdate = async (req: typeof Req, res: typeof Res) => {
    const {services} = req.body
    const taskKey = datastore.key([kind]);
    try{
        services.map( async (el: typeof serviceType) => {
            const task = {
                key: taskKey,
                data: {
                    title: el.title,
                    iconUrl: el.iconUrl,
                }
            }
            await datastore.save(task);
        })
        res.status(200).send("update!")
    }catch(err){
        res.status(500).send(err)
    }
}

export {controllerServiceUpdate}