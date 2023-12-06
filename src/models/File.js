const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

const { createTtransporter } = require('../config/nodemailer');
require('dotenv').config();


const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    },
    tags:{
        type:String,
    },
    email:{
        type:String,
    },
})

fileSchema.post('save',async (doc)=>{
    try {
        console.log("Doc: ",doc);
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 465,
            secure:true,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        }) 
        
        const info = await transporter.sendMail({
            from: 'Anurag Tiwari aka Goku', 
            to: "astanurag@gmail.com",
            subject: "Image upoaded",
            html: "<b>Your file has been uploaded successfully</b>",
        });       

        console.log(info)
    } catch (error) {
        console.error(error)
    }
})
module.exports = mongoose.model("File",fileSchema);