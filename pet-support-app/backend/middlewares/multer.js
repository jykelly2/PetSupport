const multer = require('multer');
const multerS3 = require('multer-s3');
const {s3} = require('../s3')
require('dotenv').config()
const bucketName = process.env.AWS_BUCKET_NAME
const animalContentsBN = process.env.AWS_ANIMAL_CONTENTS_BUCKET_NAME
const shelterContentsBN = process.env.AWS_SHELTER_CONTENTS_BUCKET_NAME
const staffContentsBN = process.env.AWS_STAFF_CONTENTS_BUCKET_NAME
const { nanoid } = require('nanoid');


const upload = multer({
    storage:multerS3({
      s3:s3,
      bucket: bucketName,
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, nanoid(6) + "||" + file.originalname)
    }
  })
    // limits:{
    //   fieldSize:2048*2048*3,
    // }
  });

  const uploadAnimalContents = multer({
    storage:multerS3({
      s3:s3,
      bucket: animalContentsBN,
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, file.fieldname + nanoid(6) + "||" + file.originalname)
    }
  })
  });

  const uploadStaffContents = multer({
    storage:multerS3({
      s3:s3,
      bucket: staffContentsBN,
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, nanoid(6) + "||" + file.originalname)
    }
  })
  });

  const uploadShelterContents = multer({
    storage:multerS3({
      s3:s3,
      bucket: shelterContentsBN,
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      console.log(file)
      cb(null, file.fieldname + nanoid(6) + "||" + file.originalname)
    }
  })
  });

//new Date().toISOString()
module.exports = {
    upload,
   uploadAnimalContents,
   uploadStaffContents,
   uploadShelterContents
  }

  // const upload = multer({
//   storage:storage,
//   // limits:{
//   //   fieldSize:2048*2048*3,
//   // }
// });
// const storage = multer.diskStorage({
//   destination:function(request, file, callback){
//     callback(null, './uploads/images');
//   },

//   filename:function(request, file, callback){
//     callback(null, new Date().toISOString()+ file.originalname);
//   },
// });