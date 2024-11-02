const { request: Req } = require('express')
const { response: Res } = require('express')
const { Datastore } = require("@google-cloud/datastore");
const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, "../../.env") });

const kind = process.env.KIND_STAFF
const datastore = new Datastore();

const controllerRemoveStaff = async (req: typeof Req, res: typeof Res) => {
    const {name} = req.body;
    try{
        const query = datastore.createQuery(kind).filter('name', '=', name);
        const [entities] = await datastore.runQuery(query);
        const keys = entities.map((entity:any) => entity[datastore.KEY]);
        await datastore.delete(keys);
        res.status(200).send(`Staff name ${name} is deleted.`)
    }catch(err){
        res.status(500).send(err)
    }
    
}

export {controllerRemoveStaff}