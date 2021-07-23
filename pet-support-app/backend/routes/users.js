const router = require('express').Router();
let User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const {isAuth, isAdmin} = require('../authentication/authorize');
const bcrypt = require('bcrypt');
const fs = require('fs')
const util = require('util')
const unlinkeFile = util.promisify(fs.unlink)
const {uploadFile , getSingleFile, getMultilpleFiles, deleteFiles, deleteSingleS3File} = require('../s3')
const {upload, uploadStaffContents} = require('../middlewares/multer.js')
const staffContentsBN = process.env.AWS_STAFF_CONTENTS_BUCKET_NAME
const {roles} = require('../utils');
router.route('/').get(isAuth, (req, res) => {
  console.log(req.user.role)
  const role = req.user.role
  console.log(req.user.id)
    User.find({ _id: { $ne: req.user.id }, shelter: req.user.shelter})
        .then(users => res.json({users, role}))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/authenticate').get(isAuth,(req, res) => {
  const role = req.user.role
  if (req.user == null) return res.json('Error: ' + req.err)
  console.log("authenticate")
  return res.json(req.user);
});

router.route('/create').post(isAuth, isAdmin, uploadStaffContents.single('picture'), async(req, res) => {
  const file = req.file;
  const pic = file != null ? file.key : ""
  const shelterId = req.user.shelter
  
  const {firstname, lastname, email, password, role} = req.body;

   User.findOne({email}).exec(async (err, user)=>{
      if(user){
        return res.status(400).json({ error: "User with this email already exist"})
      }
      else if (err){
        return res.status(400).json({ error: "Something went wrong"});
      }else{
        try {
          const hashedPassword = await bcrypt.hash(password, 10)
          const newUser = new User({firstname, lastname, email, password: hashedPassword, role, shelter:shelterId, picture: pic});
          newUser.save()
          .then(() => 
          {res.status(200).json('New User Successfully Created')})
      //   const{new_id, new_firstname,new_lastname, new_email} = newUser;
      // const userInfo = {new_id, new_firstname,new_lastname, new_email}
      //   const token = jwt.sign({_id: newUser._id}, process.env.JWT_ACCESS_TOKEN, {expiresIn: '3d'});
      // // const{_id} = newUser;
      // res.json({token, user: {new_id, firstname,lastname,email}})})
          .catch(err => res.status(400).json('Error: ' + err));
        }catch{
          res.status(500).json('Error: ' + err)
        }
      }
  });
});

router.route('/login').post((req, res) => {
  const {email, password} = req.body;
  User.findOne({email})
  .then(async user => {
    try {
      if (await bcrypt.compare(password, user.password)){
        const{_id, firstname,lastname, email, role, password, picture, shelter} = user;
        if(role != roles.Disabled){
          const userInfo = {id: _id, role:role, firstname: firstname, lastname:lastname,email:email, password:password, picture: picture, shelter:shelter}
          const token = jwt.sign(userInfo, process.env.JWT_ACCESS_TOKEN, {expiresIn: '3d'});
          res.json({token});
        }
        else{
          res.status(500).send({message:'Error: Your account is disabled'})
        }        
      }else{
        res.status(500).send({message:'Error: Password is incorrect'})
      }
    }catch{
      res.status(500).json({message:'Error: Email is incorrect'})
    }
  })
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/edit/:id').get(isAuth, (req, res) => {
    User.findById(req.params.id)
      .then(user => res.json(user))
      .catch(err => res.status(400).json('Error: ' + err));
});
  
  router.route('/:id').delete(isAuth, isAdmin, (req, res) => {
    User.findByIdAndDelete(req.params.id)
      .then(() => res.json('User successfully deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/update/:id').post(isAuth, uploadStaffContents.single('picture'), async (req, res) => {
    console.log(req.file)
    const file = req.file;
    const pic = file != null ? file.key : ""
    const shelterId = req.user.shelter

    if (req.body.originalPicture) deleteSingleS3File(req.body.originalPicture, staffContentsBN)

    User.findById(req.params.id)
      .then(async user => { 
        const {firstname, lastname, email, password, role, passwordChanged, profileUpdate} = req.body;
        user.firstname = firstname;
        user.lastname = lastname;
        user.email = email;
        if (passwordChanged === "true"){
          try {
            user.password = await bcrypt.hash(password, 10)
          }catch{
             res.status(400).json('Error: ' + err);
          }
        }else{
          user.password = password
        }

        user.role = role;
        user.shelter = shelterId;
        user.picture = pic;

        var token = ""
      if (profileUpdate === "true"){
          token = await setJwtUserInfo(user)
      }

      const successMsg = 'User successfully updated!'
        user.save()
          .then(() => res.json({successMsg: successMsg, token: token}))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

  const setJwtUserInfo = async (user) => {
    const{_id, firstname,lastname, email, role, password, picture, shelter} = user;
    const userInfo = {id: _id, role:role, firstname: firstname, lastname:lastname,email:email, password:password, picture: picture, shelter:shelter}
    return jwt.sign(userInfo, process.env.JWT_ACCESS_TOKEN, {expiresIn: '3d'});
  }

module.exports = router;