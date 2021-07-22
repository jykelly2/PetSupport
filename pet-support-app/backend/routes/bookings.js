const router = require('express').Router();
let Booking = require('../models/booking.model');
let Client = require('../models/client.model');
let Animal = require('../models/animal.model');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const {isAuth, isAdmin} = require('../authentication/authorize');
const {bookingStatus, convertUTCDateToLocalDate} = require('../utils')

router.route('/').get(isAuth, async (req, res) => {
    console.log(req.user.role)
    const role = req.user.role
   const bookings =  await Booking.find({ shelter: req.user.shelter })
   .populate('client', ['name'])
   .populate('animal', ['name'])

   if (bookings) {
       res.json({bookings, role})
   }else{
    res.status(400).json('Error: ' + err);
   }
});

router.route('/recent').get(isAuth, async (req, res) => {
  console.log(req.user.role)
  const role = req.user.role
  const shelterId = req.user.shelter
  var date = new Date();
  date.setMonth(date.getMonth() - 3);
  var bookings = [];
  switch (req.query.filter){
    case "withAnimals":
      console.log(req.user.shelter)
      bookings = await Booking.aggregate([
         { $match: { shelter:  ObjectId(shelterId), date:{$gte:date, $lte: new Date()} } },
        {
           $lookup:
              {
                from: "animals",
                let: { booking_animalId: "$animal", booking_shelter: "$shelter" },
                pipeline: [
                   { $match:
                      { $expr:
                         { $and:
                            [
                              {$eq: [ "$_id",  "$$booking_animalId" ]},
                              {$eq: ["$shelter", "$$booking_shelter"]},
                            ]
                         }
                      }
                   },
                ],
                as: "animal"
              }
         },  
         { $sort: { date: 1 } },
         {
          $lookup:
            {
              from: "clients",
              let: { booking_clientId: "$client"},
              pipeline: [
                { $match:
                   { $expr:
                      { $and:
                         [
                           {$eq: [ "$_id",  "$$booking_clientId" ]},
                         ]
                      }
                   }
                },
                { $project: { _id: 0, name: 1 } },
              ], 
              as: "client"
            },
         }
     ])
     break;
    default:
      bookings =  await Booking.find({ shelter: req.user.shelter, date:{$gte:date, $lte: new Date()}}).sort({date:1})
       .populate('client', ['name'])
       .populate('animal', ['name'])
    break;
  }
//  const bookings =  await Booking.find({ shelter: req.user.shelter, date:{$gte:date, $lte: new Date()}}).sort({date:1})
//  .populate('client', ['name'])
//  .populate('animal', ['name'])

 if (!(bookings.length === 0)) {
     res.json({bookings, role})
 }else{
  res.status(400).send('Error: Bookings not found');
 }
});

router.route('/filter').get(isAuth, async (req, res) => {
  const role = req.user.role
  const shelter = req.user.shelter

  var filter;
  switch (req.query.filter){
    case "today":
      filter = { shelter: shelter, date: convertUTCDateToLocalDate(new Date(new Date().setHours(0,0,0,0)))}
      break;
    case "inProgress":
      filter = { shelter: shelter, status: bookingStatus.InProgress, date: convertUTCDateToLocalDate(new Date(new Date().setHours(0,0,0,0)))}
      break;
    default:
      filter = { shelter: shelter}
      break;
  }
  const bookings =  await Booking.find(filter)
  .populate('client', ['name'])
  .populate('animal', ['name'])

  if (bookings) {
    res.json({bookings, role})
  }else{
  res.status(400).json('Error: ' + err);
  }
});

router.route('/edit/:id').get(isAuth, isAdmin, (req, res) => {
    Booking.findById(req.params.id)
    .populate('client', ['name'])
    .populate('animal', ['name'])
      .then(Booking => res.json(Booking))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post(isAuth, isAdmin, (req, res) => {
    Booking.findById(req.params.id)
      .then(async booking => {
        //console.log(new Date(startTime).toLocaleString('en-US', { timeZone: 'America/Toronto' }))
        const userName = req.user.firstname + req.user.lastname;
        const {date, startTime, endTime, status, hours, totalAmount} = req.body;
          booking.date = convertUTCDateToLocalDate(new Date(date))
          booking.startTime = convertUTCDateToLocalDate(new Date(startTime));
          booking.endTime = convertUTCDateToLocalDate(new Date(endTime));
          booking.status = status;
          booking.hours = hours;
          booking.totalAmount = totalAmount;
          booking.approvedBy = status === bookingStatus.Approved ? userName : "N/A";
          booking.completedBy  = status === bookingStatus.Completed ? userName : "N/A";
          await Animal.findById(booking.animal).then(async animal => {
            if (booking.status === bookingStatus.Cancelled)
                animal.isScheduled = false
            else
                animal.isScheduled = true
            await animal.save()
          })
        booking.save()
          .then(() => res.json('Booking successfully updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;