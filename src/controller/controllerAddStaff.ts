const { request: Req } = require('express')
const { response: Res } = require('express')
const { Datastore } = require("@google-cloud/datastore");
const { Storage } = require('@google-cloud/storage');
const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, "../../.env") });

const storage = new Storage(
    {
        projectId: process.env.PROJECT_ID,
        keyFilename: path.join(__dirname, "../../key.json"),
    }
)

const kind = process.env.KIND_STAFF
const datastore = new Datastore();
const bucket = storage.bucket(process.env.KIND_STAFF);
const urlCloudStorage = process.env.URL_CLOUD_STORAGE

const controllerAddStaff = async (req: typeof Req, res: typeof Res) => {
    // console.log(path.join(__dirname, "../../key.json"))
    // console.log(path.resolve(__dirname, "../../.env"))
    // console.log(process.env.PROJECT_ID)
    const date = new Date();
    const padZero = (num: number): string => num.toString().padStart(2, '0');

    const day = padZero(date.getDate());
    const month = padZero(date.getMonth() + 1); // Months are zero-based
    const year = padZero(date.getFullYear() % 100); // Get last two digits of the year
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());
    const seconds = padZero(date.getSeconds());

    try{
        const {
            position,
            rank,
            name,
            contact
        } = req.body

        const imgFile = req.file;

        if (!imgFile) {
            return res.status(400).json({ message: 'Image file is required.' });
        }   

        const createImgName = `${name}_${day}_${month}_${year}_${hours}_${minutes}_${seconds}.png`

        // Upload image to Google Cloud Storage
        const file = bucket.file(createImgName);
        await file.save(imgFile.buffer, {
            metadata: {
                contentType: imgFile.mimetype,
            },
            public: true, 
        });

        const taskKey = datastore.key([kind]);
        const task = {
            key: taskKey,
            data: {
                staff_name: name,
                rank: rank,
                position: position,
                contact: contact,
                imageUrl: `${urlCloudStorage}/${createImgName}`
            }
        }
        await datastore.save(task);
        res.send("ok")
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
}

export {controllerAddStaff}