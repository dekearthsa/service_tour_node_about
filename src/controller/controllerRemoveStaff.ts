const { request: Req } = require('express')
const { response: Res } = require('express')
const { Datastore } = require("@google-cloud/datastore");
const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, "../../.env") });

const kind = "about_page_staff"
const datastore = new Datastore();

const controllerRemoveStaff = async (req: typeof Req, res: typeof Res) => {
    const {name} = req.body;
    try{
        const query = datastore.createQuery(kind).filter('staff_name', '=', name);
        const [entities] = await datastore.runQuery(query);
        const idSet = entities[0][datastore.KEY]['id']
        const id = parseInt(idSet)
        const taskKey = datastore.key([kind,id])
        await datastore.delete(taskKey);
        res.status(200).send(`Staff name ${name} is deleted.`)
    }catch(err){
        console.log("errr => ", err)
        res.status(500).send(err)
    }
    
}

export {controllerRemoveStaff}