const { request: Req } = require('express')
const { response: Res } = require('express')
const { Datastore } = require("@google-cloud/datastore");
const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, "../../.env") });

const kind = "about_page_content"
const datastore = new Datastore();
const STATIC_HIST = "history"
// const STATIC_VIS = "vision"

const controllerHistroyUpdate = async (req: typeof Req, res: typeof Res) => {
    const {content, imgUrl, contentType} = req.body

    try{
        if(contentType === STATIC_HIST){
            const query = datastore.createQuery(kind).filter('contentType', '=', contentType);
            const [entities] = await datastore.runQuery(query);
            const idSet = entities[0][datastore.KEY]['id']
            const id = parseInt(idSet)
            const taskKey = datastore.key([kind,id])
            const task = {
                key: taskKey,
                data: {
                    contentType: contentType,
                    content: content? content: entities[0].content,
                    imgUrl: imgUrl? imgUrl: entities[0].imgUrl,
                }
            }
            await datastore.update(task);
            res.status(200).send("update!")
        }else{
            const query = datastore.createQuery(kind).filter('contentType', '=', contentType);
            const [entities] = await datastore.runQuery(query);
            const idSet = entities[0][datastore.KEY]['id']
            const id = parseInt(idSet)
            const taskKey = datastore.key([kind,id])
            const task = {
                key: taskKey,
                data: {
                    contentType: contentType,
                    content: content? content: entities[0].content,
                    imgUrl: imgUrl?imgUrl: entities[0].imgUrl,
                }
            }
            await datastore.update(task);
            res.status(200).send("update!")
        }
        
    }catch(err){
        res.status(500).send(err)
    }
}

export {controllerHistroyUpdate}