const express =require("express");
const cors = require("cors");
const {controllerDebug} = require("../controller/controllerDebug");
const {controllerAddStaff} = require("../controller/controllerAddStaff");
const {controllerHistroyUpdate} = require("../controller/controllerHistroyUpdate");
const {controllerServiceUpdate} = require("../controller/controllerServiceUpdate");
const {controllerRemoveStaff} = require("../controller/controllerRemoveStaff");
const {controllerGetAbout} = require("../controller/controllerGetAbout");
const {controllerGetStaff} = require("../controller/controllerGetStaff");
const {controllerGetServices} = require("../controller/controllerGetServices");
const multer = require('multer');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(
    {origin: '*'}
));

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

app.get("/api/debug", controllerDebug);
app.get("/api/get/about", controllerGetAbout);
app.get("/api/get/staff", controllerGetStaff);
app.get("/api/get/services", controllerGetServices);

app.post("/api/add/about/staff",  upload.single("image") ,controllerAddStaff);
app.post("/api/update/about/content", controllerHistroyUpdate);
app.post("/api/update/about/service", controllerServiceUpdate);

app.delete("/api/delete/about/staff", controllerRemoveStaff);

export {app}