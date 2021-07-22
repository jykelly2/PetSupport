const {roles} = require('../utils');
const jwt = require('jsonwebtoken');

function isAuth(req,res,next){
    const token = req.headers['authorization']
    //const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.JWT_ACCESS_TOKEN, (err, user) =>{
        if (err) return res.sendStatus(401)
        req.user = user
        next()
    })
}

exports.isAuth = isAuth

function isAdmin (req, res, next){
    if (req.user && req.user.role == roles.Administrator) {
      next();
    } else {
      res.status(401).send({ message: 'Invalid Admin Token' });
    }
  };

exports.isAdmin = isAdmin