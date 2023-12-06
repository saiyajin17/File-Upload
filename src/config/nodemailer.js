require("dotenv").config();
const nodemailer = require('nodemailer');

exports.createTtransporter = async ()=>{
    return nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: 465,
        secure:true,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
    })  
}