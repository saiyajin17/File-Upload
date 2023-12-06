const express = require('express');
const app = express();
require('dotenv').config();
const fileUpload = require('express-fileupload');
app.use(express.json(),fileUpload({
    useTempFiles:true,
    tempFileDir:'/tmp/'
}));
const db = require('./src/config/database');
db.connectDB();
const cloud = require('./src/config/cloudinary');
cloud.connectCloudinary();

const PORT = process.env.PORT || 5000;

const upload = require('./src/routes/route')
app.use('/v1/upload',upload);

app.listen(PORT,()=>{
    console.log("Service started successfully on PORT:"+PORT);
})