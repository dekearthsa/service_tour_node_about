const { request: Req } = require('express')
const { response: Res } = require('express')
const { Datastore } = require("@google-cloud/datastore");
const path = require("path");
const serviceType = require("../interface/serviceType");
require('dotenv').config({ path: path.resolve(__dirname, "../../.env") });

const kind = "about_page_service"
const datastore = new Datastore();


const controllerServiceUpdate = async (req: typeof Req, res: typeof Res) => {
    const {services} = req.body
    // console.log("services => ",services)
    try{
        await services.map( async (el: typeof serviceType) => {
            // console.log("el => ",el)
            const query = datastore.createQuery(kind).filter('static_name_id', '=', el.static_name_id);
            const [entities] = await datastore.runQuery(query);
            // console.log("entities => ", entities)
            const idSet = entities[0][datastore.KEY]['id']
            // console.log("idSet => ", idSet)
            const id = parseInt(idSet)
            const taskKey = datastore.key([kind,id])

            const task = {
                key: taskKey,
                data: {
                    static_name_id: el.static_name_id,
                    title: el.title,
                    iconUrl: el.iconUrl,
                }
            }
            // console.log("task => ",task)
            await datastore.update(task);
        })
        res.status(200).send("update!")
    }catch(err){
        res.status(500).send(err)
    }
}

export {controllerServiceUpdate}