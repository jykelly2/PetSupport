const router = require('express').Router();
const {getSingleFile, getMultilpleFiles} = require('../s3')
const {bucketType} = require('../utils')
const animalContentsBN = process.env.AWS_ANIMAL_CONTENTS_BUCKET_NAME
const shelterContentsBN = process.env.AWS_SHELTER_CONTENTS_BUCKET_NAME
const staffContentsBN = process.env.AWS_STAFF_CONTENTS_BUCKET_NAME

//MULTIPLE IMAGES
router.route('/getImages').post(async (req, res) => {
    const pictures = req.body.pictures;
    const bucketName = getBucketName(req.body.bucket)
    const readStream = await getMultilpleFiles(pictures, bucketName)
    res.send(readStream)  
});

//SINGLE IMAGES
router.route('/getImage').post(async(req, res) => {
    const key = req.body.picture
    const bucketName = getBucketName(req.body.bucket)
    const readStream = await getSingleFile(key, bucketName)
    res.send(readStream)
});

function getBucketName(name){
    switch (name) {
        case bucketType.Shelter: 
            return shelterContentsBN
        case bucketType.Animal: 
            return animalContentsBN
        default:
           return staffContentsBN
    }
}
module.exports = router;

//SINGLE IMAGES
// router.route('/getImage/:key').get((req, res) => {
//     console.log("req.body.bucket")
//     console.log(req.params.key)
//     console.log(req.body.bucket)
//     const key = req.params.key
//     const bucketName = getBucketName(req.body.bucket)
//     const readStream = getSingleFile(key, bucketName)
//     readStream.pipe(res)
// });