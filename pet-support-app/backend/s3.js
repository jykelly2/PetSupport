require('dotenv').config()
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')

const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
})

function uploadFile(file, bucketName){
    const fileStream = fs.createReadStream(file.path)

    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename
    }

    return s3.upload(uploadParams).promise()
}

//GET SINGLE FILE
async function getSingleFile(filekey, bucketName){
    const contentType = filekey.split('.')[2]
    const file = await s3.getObject({
      Bucket: bucketName,
      Key: filekey
    }).promise()
    return "data:image/" + contentType + ";base64," + Buffer.from(file.Body).toString('base64')
}

//GET MULTIPLE FILES
async function getMultilpleFiles(filekeys, bucketName){
    return promisesOfS3Objects = await Promise.all(filekeys.map(async function(key) {
        const contentType = key.split('.')[2]
        const file = await s3.getObject({
        Bucket: bucketName,
        Key: key
      }).promise()
      return "data:image/" + contentType + ";base64," + Buffer.from(file.Body).toString('base64')
    }))
}

//DELETE MULTIPLE FILES
function deleteFiles(files, bucketName){
    var objects = [];
    if ((typeof files) === 'string'){
      objects.push({Key : files});
    }else{
        for(let i = 0; i< files.length; i++){
          objects.push({Key : files[i]});
        }
    }
    const options = {
      Bucket: bucketName,
      Delete: {
        Objects: objects
      }
    };
    return s3.deleteObjects(options, (err, data) => {
      console.error(err);
      console.log(data);
    });

}

//DELETE MULTIPLE FILES
function deleteSingleS3File(file, bucketName){
  console.log(file)
   var params = {  Bucket: bucketName, Key: file };
      s3.deleteObject(params, function(err, data) {
        if (err) console.log(err, err.stack);  // error
        else     console.log(data);                 // deleted
      });
}

module.exports = {
    s3,
    getSingleFile,
    getMultilpleFiles,
    uploadFile,
    deleteFiles,
    deleteSingleS3File,
}

//GET SINGLE FILE
// function getSingleFile(filekey, bucketName){
//   const downloadParams = {
//        Key: filekey,
//        Bucket: bucketName
//    }
//    return s3.getObject(downloadParams).createReadStream()
// }