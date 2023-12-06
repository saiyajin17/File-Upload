const cloudinary =  require('cloudinary');
const File =  require('../models/File')

async function uploadFileToCloudinary(file,folderName,quality){

    const options =  {
        folder:folderName,
        resource_type:'auto'
    }
    if(quality){
           options.quality = quality;
    }
    return await cloudinary.v2.uploader.upload(file.tempFilePath,options);
}

exports.localFileUpload = async (req,res)=>{
    try {
        //fetch file
        const file = req.files.file;

        // where created file path will be stored on server locally
        let path = __dirname+'/files/'+Date.now()+"."+file.name.split('/')[1];

        // now add path to move function: file will be uploaded in the given path
        file.mv(path,(err)=>{
            console.log(err)
        });

        return res.json({
            success:true,
            message:"Local file uploaded successfully"
        });

    } catch (error) {
        return res.json({
            success:false,
            message:"Something went wrong while reading file: "+error,
        })
    }
}

exports.imageUpload = async (req,res)=>{
    try {
        // data fetch from req body
        const {name, tags, email } = req.body;

        const file = req.files.image;

        // validation
        const supportedTypes = ["jpeg","jpg","png"];
        const fileType = file.name.split(".")[1].toLowerCase();
        const isFileTypeSupported = supportedTypes.includes(fileType);
        if(!isFileTypeSupported){
            return res.json({
                success:false,
                message:"File format not supported"
            })
        }

        // file format matched
        const response = await uploadFileToCloudinary(file,"NodeJS")
        const url =  response.url;

        // db me save entry
        const savedFile = await File.create({name,url:url,tags,email});
        return res.status(201).json({
            success:true,
            data:savedFile,
            message: "Image has been uploaded successfully to cloudinary."
        })
    } catch (error) {
        console.log(error)
        return res.json({
            success:false,
            message: "File cant be read properly"
        }).status(400);
    }
}

exports.videoUpload = async (req,res)=>{
    try {
        // data fetch from req body
        const {name, tags, email } = req.body;

        const file = req.files.video;

        // validation
        const supportedTypes = ["mp4","mov"];
        const fileType = file.name.split(".")[1].toLowerCase();
        const isFileTypeSupported = supportedTypes.includes(fileType);
        if(!isFileTypeSupported){
            return res.json({
                success:false,
                message:"File format not supported"
            })
        }

        // file format matched
        const response = await uploadFileToCloudinary(file,"NodeJS")
        const url =  response.url;

        // db me save entry
        const savedFile = await File.create({name,url:url,tags,email});
        return res.status(201).json({
            success:true,
            data:savedFile,
            message: "Video has been uploaded successfully to cloudinary."
        })
    } catch (error) {
        console.log(error)
        return res.json({
            success:false,
            message: "File cant be read properly"
        }).status(400);
    }
}

exports.compressedImgUpload = async (req,res)=>{
    try {
        // data fetch from req body
        const {name, tags, email } = req.body;

        const file = req.files.image;

        // validation
        const supportedTypes = ["jpeg","jpg","png"];
        const fileType = file.name.split(".")[1].toLowerCase();
        const isFileTypeSupported = supportedTypes.includes(fileType);
        if(!isFileTypeSupported){
            return res.json({
                success:false,
                message:"File format not supported"
            })
        }

        // file format matched
        const response = await uploadFileToCloudinary(file,"NodeJS",50);
        const url =  response.url;

        // db me save entry
        const savedFile = await File.create({name,url:url,tags,email});
        return res.status(201).json({
            success:true,
            data:savedFile,
            message: "Image has been uploaded successfully to cloudinary."
        })
    } catch (error) {
        console.log(error)
        return res.json({
            success:false,
            message: "File cant be read properly"
        }).status(400);
    }
}

