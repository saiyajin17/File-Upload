const mongoose = require('mongoose');
require('dotenv').config();

exports.connectDB = ()=>{
    mongoose.connect(process.env.MONGO_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(console.log("DB connected successfully"))
    .catch((err)=>{
        console.error("Something went wrong in DB connection " +err)
        process.exit(1);
    })
}