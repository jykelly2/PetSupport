const router = require('express').Router();
let Client = require('../models/client.model');
const {isAuth, isAdmin} = require('../authentication/authorize');

router.route('/').get(isAuth, (req, res) => {
    const role = req.user.role
    Client.find()
          .then(clients => res.json({clients, role}))
          .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/lastMonth').get(isAuth, (req, res) => {
    const role = req.user.role
    var date = new Date();
    date.setMonth(date.getMonth() - 1);
    Client.find({createdAt:{$gte:date}}).sort({createdAt:1})
          .then(clients => res.json({clients, role}))
          .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/recent').get(isAuth, async (req, res) => {
    console.log(req.user.role)
    const role = req.user.role
    var date = new Date();
    date.setMonth(date.getMonth() - 2);
    Client.find({createdAt:{$gte:date}}).sort({createdAt:1})
        .then(clients => res.json({clients, role}))
        .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;