const router = require('express').Router(); 

const {imageUpload,videoUpload,compressedImgUpload,localFileUpload} = require('../controllers/fileUpload');

router.post("/imageUpload",imageUpload);
router.post("/videoUpload",videoUpload);
router.post("/compressImgUpload",compressedImgUpload);
router.post("/locallyUpload",localFileUpload);

module.exports = router;
