const { request: Req } = require('express')
const { response: Res } = require('express')
const { Datastore } = require("@google-cloud/datastore");
const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, "../../.env") });

const kind = process.env.KIND_CONTENT
const datastore = new Datastore();
const STATIC_HIST = "history"
// const STATIC_VIS = "vision"

const controllerHistroyUpdate = async (req: typeof Req, res: typeof Res) => {
    const {content, imgUrl, contentType} = req.body
    try{
        if(contentType === STATIC_HIST){
            const taskKey = datastore.key([kind]);
            const task = {
                key: taskKey,
                data: {
                    contentType: contentType,
                    content: content,
                    imgUrl: imgUrl,
                }
            }
            await datastore.save(task);
            res.status(200).send("update!")
        }else{
            const taskKey = datastore.key([kind]);
            const task = {
                key: taskKey,
                data: {
                    contentType: contentType,
                    content: content,
                    imgUrl: imgUrl,
                }
            }
            await datastore.save(task);
            res.status(200).send("update!")
        }
        
    }catch(err){
        res.status(500).send(err)
    }
}

export {controllerHistroyUpdate}