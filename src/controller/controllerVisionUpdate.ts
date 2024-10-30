const { request: Req } = require('express')
const { response: Res } = require('express')
const { Datastore } = require("@google-cloud/datastore");
const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, "../.env") });

const kind = "about_page_vision"
const datastore = new Datastore();


const controllerVisionUpdate = async (req: typeof Req, res: typeof Res) => {
    const {content, imgUrl} = req.body
    try{
        const taskKey = datastore.key([kind]);
        const task = {
            key: taskKey,
            data: {
                content: content,
                imgUrl: imgUrl,
            }
        }
        await datastore.save(task);
        res.status(200).send("update!")
    }catch(err){
        res.status(500).send(err)
    }
}

export {controllerVisionUpdate}