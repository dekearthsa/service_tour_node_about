const { request: Req } = require('express')
const { response: Res } = require('express')
const { Datastore } = require("@google-cloud/datastore");

const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, "../../.env") });

const KIND = process.env.KIND_STAFF
const datastore = new Datastore();

const controllerGetStaff = async (req: typeof Req, res: typeof Res) => {
    try{
        const query = datastore.createQuery(KIND)
        const [tasks] = await datastore.runQuery(query);
        res.status(200).send(tasks)
    }catch(err){
        console.log(`error in controllerGetStaff: ${err}`)
        res.status(500).send(err)
    }
}

export {controllerGetStaff}