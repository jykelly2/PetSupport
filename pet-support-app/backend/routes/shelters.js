const router = require('express').Router();
let Shelter = require('../models/shelter.model');
const {uploadFile , getMultilpleFiles, deleteFiles} = require('../s3')
const {isAuth, isAdmin} = require('../authentication/authorize')
const fs = require('fs')
const util = require('util')
const {upload, uploadShelterContents} = require('../middlewares/multer.js')
const bucketName = process.env.AWS_BUCKET_NAME
const shelterContentsBN = process.env.AWS_SHELTER_CONTENTS_BUCKET_NAME

// router.get('/', isAuth, isAdmin, (req,res)=>{
//   console.log(req.user.role)
//   const role = req.user.role
//   Shelter.find()
//       .then(shelter => res.json({
//           shelter, role
//       }))
//       .catch(err => res.status(400).json('Error: ' + err));
//   });

  router.get('/shelter', isAuth, isAdmin, (req,res)=>{
    console.log(req.user.role)
    const role = req.user.role
    const shelterId = req.user.shelter
    console.log(shelterId)
   // if (shelterId != null){
    Shelter.findById(shelterId)
        .then(shelter => res.json({
            shelter, role
        }))
        .catch(err => res.status(400).json('Error: ' + err));
    });


router.route('/add').post(isAuth, isAdmin, uploadShelterContents.array('profile/', 5), async (req, res) => {
  
  console.log(req.files)

  const files = req.files;
  var pics = [];
   if (files != null){
    for(let i = 0; i< files.length; i++){
      pics.push(files[i].key)
    }
   }
   console.log(pics)
   
   const {name, description,phoneNumber, email, 
    city, province, postalCode, streetAddress,
    available } = req.body;

    const newShelter = new Shelter({
        name, 
        description, 
        email, 
        phoneNumber, 
        streetAddress,
        city,
        province,
        postalCode,
        pictures: pics,
        available});

    newShelter.save()
        .then(() => res.json('Shelter added!'))
        .catch(err => res.status(500).json('Error: ' + err));
});

router.route('/edit/:id').get(isAuth, isAdmin, (req, res) => {
    Shelter.findById(req.params.id)
      .then(Shelter => res.json(Shelter))
      .catch(err => res.status(400).json('Error: ' + err));
});
  
  router.route('/:id').delete(isAuth, isAdmin, (req, res) => {
    if (req.body.pictures) deleteFiles(req.body.pictures, shelterContentsBN)
    
    Shelter.findByIdAndDelete(req.params.id)
      .then(() => res.json('Shelter deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

router.route('/update-shelter/:id').post(isAuth, isAdmin, uploadShelterContents.array('profile/', 5), async (req, res) => {
    console.log(req.files)
    const files = req.files;
    var pics = [];
    if (files != null){
      for(let i = 0; i< files.length; i++){
        pics.push(files[i].key)
      }
    }else{
      res.status(500).json('Error: Picture Upload fail');
    }  
 
     if (req.body.originalPictures) deleteFiles(req.body.originalPictures, shelterContentsBN)

    Shelter.findById(req.params.id)
      .then(shelter => {
        shelter.name = req.body.name;
        shelter.description = req.body.description;
        shelter.email = req.body.email;
        shelter.phoneNumber = req.body.phoneNumber;
        shelter.pictures = pics;
        shelter.streetAddress = req.body.streetAddress;
        shelter.city = req.body.city;
        shelter.province = req.body.province;
        shelter.postalCode = req.body.postalCode;
        shelter.available = req.body.available;

        shelter.save()
          .then(() => res.json('Shelter updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));

  });

module.exports = router;

  //SINGLE UPLOAD
  //   const file = req.file;
  //  var result = null;
  //   if (req.file != null){
  //     result = await (await uploadFile(file)).Key
  //     await unlinkFile(file.path)
  //   }else{
  //     result = req.body.picture;
  //   }  