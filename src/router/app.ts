const express =require("express");
const cors = require("cors");
const {controllerDebug} = require("../controller/controllerDebug")
const {controllerAddStaff} = require("../controller/controllerAddStaff")
const multer = require('multer');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(
    {origin: '*'}
));


const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

app.get("/api/debug", controllerDebug)
app.post("/api/about/add/staff",  upload.single("image") ,controllerAddStaff)

export {app}