const router = require('express').Router();
let User = require('../models/user.model');
const {OAuth2Client} = require('google-auth-library');
const clientID = "928739773656-qv0dd1v17cop0ckrhl0sqvjvnkujn16h.apps.googleusercontent.com"//process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(clientID);
const jwt = require('jsonwebtoken');

router.route('/googlelogin').post((req, res) => {
    const {tokenId} = req.body;
    client.verifyIdToken({idToken: tokenId, audience: clientID}).then(response => {
        const{email_verified, given_name, family_name, email, picture} = response.payload;
        console.log(response.payload);
        if (email_verified){
            User.findOne({email}).exec((err, user)=>{
                if(err){
                    return res.status(400).json({
                        error: "Something went wrong"
                    })
                }else{
                    if(user){
                        const token = jwt.sign({_id: user._id}, process.env.JWT_ACCESS_TOKEN, {expiresIn: '3d'});
                        const{_id, firstname,lastname,email} = user;
                        res.json({token, user: {_id, firstname,lastname,email}});
                    }else{
                        const password = email+process.env.GOOGLE_CLIENT_SECRET;
                        const firstname = given_name;
                        const lastname = family_name;
                        const role = "Administrator"
                        const newUser = new User({firstname, lastname, email, password, role, picture});
                        console.log(newUser);
                        // const token = jwt.sign({_id: user._id}, process.env.JWT_SIGNIN_KEY, {expiresIn: '3d'});
                        // const{_id} = newUser;
                        
                        newUser.save()
                        .then(() => 
                        {const token = jwt.sign({_id: newUser._id}, process.env.JWT_ACCESS_TOKEN, {expiresIn: '3d'});
                        const{_id} = newUser;
                        res.json({token, user: {_id, firstname,lastname,email}})})
                        .catch(err => res.status(400).json('Error: ' + err));
                    }
                }
            })
        }
    })
});

module.exports = router;

