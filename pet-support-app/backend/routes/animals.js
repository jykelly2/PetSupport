const router = require('express').Router();
let Animal = require('../models/animal.model');
let Booking = require('../models/booking.model');
const {isAuth, isAdmin} = require('../authentication/authorize');
const {deleteFiles} = require('../s3')
const {uploadAnimalContents } = require('../middlewares/multer.js')
const animalContentsBN = process.env.AWS_ANIMAL_CONTENTS_BUCKET_NAME

router.route('/').get(isAuth, (req, res) => {
  console.log(req.user.role)
  const role = req.user.role
    Animal.find({ shelter: req.user.shelter })
        .then(animals => res.json({animals, role}))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/available').get(isAuth, (req, res) => {
  console.log(req.user.role)
  const role = req.user.role
    Animal.find({ shelter: req.user.shelter, isAvailable: true})
        .then(animals => res.json({animals, role}))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/filter').get(isAuth, (req, res) => {
  const role = req.user.role
  const shelter = req.user.shelter

  var filter;
  switch (req.query.filter){
    case "available":
      filter = { shelter: shelter, isAvailable: true}
      break;
    case "scheduled":
      filter = { shelter: shelter, isScheduled: true}
      break;
    default:
      filter = { shelter: shelter}
      break;
  }
    Animal.find(filter)
        .then(animals => res.json({animals, role}))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post(isAuth, isAdmin, uploadAnimalContents.any(), async (req, res) => {
  console.log(req.files)

  const files = req.files;
  var pics = [];
   if (files != null){
    for(let i = 0; i< files.length; i++){
      pics.push(files[i].key)
    }
   } 
   
   console.log(pics)

   const shelterId = req.user.shelter
   const {name, description, animalType,breed,age,gender,size, 
    personalities, isNeuteured, isVaccinated, isLeashTrained,isPottyTrained} = req.body;
  
      const newAnimal = new Animal({
        name: name,
        description: description,
        animalType: animalType,
        breed: breed,
        age: age,
        gender: gender,
        size: size,
        pictures: pics,
        personalities: personalities,
        shelter: shelterId,
        isNeuteured: isNeuteured,
        isVaccinated: isVaccinated,
        isPottyTrained: isPottyTrained,
        isLeashTrained: isLeashTrained,
        isAvailable: (isNeuteured === 'true' && isVaccinated === 'true' && isPottyTrained === 'true' && isLeashTrained === 'true') ? true : false, 
        isScheduled: false,
        isAdopted: false
    });
  
      newAnimal.save()
          .then(() => res.json('New Animal successfully added!'))
          .catch(err => res.status(500).json('Error: ' + err));
  });


router.route('/edit/:id').get(isAuth, isAdmin, (req, res) => {
  const role = req.user.role
    Animal.findById(req.params.id)
      .then(animal => res.json({animal, role}))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post(isAuth, isAdmin, uploadAnimalContents.any(), async (req, res) => {
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

   if (req.body.originalPictures) deleteFiles(req.body.originalPictures, animalContentsBN)

  Animal.findById(req.params.id)
    .then(animal => {

      const shelterId = req.user.shelter;
      const {name, description, animalType,breed,age,gender,size, 
        personalities, isNeuteured, isVaccinated, isLeashTrained,isPottyTrained} = req.body;

        animal.name = name;
        animal.description = description;
        animal.animalType = animalType;
        animal.breed = breed;
        animal.age = age;
        animal.gender = gender;
        animal.size = size;
        animal.pictures = pics;
        animal.personalities = personalities;
        animal.shelter = shelterId;
        animal.isNeuteured = isNeuteured;
        animal.isVaccinated = isVaccinated;
        animal.isPottyTrained = isPottyTrained;
        animal.isLeashTrained = isLeashTrained;
        animal.isAvailable = (isNeuteured === 'true' && isVaccinated === 'true' && isPottyTrained === 'true' && isLeashTrained === 'true') ? true : false; 
        animal.isScheduled = false;
        animal.isAdopted = false;
   
      animal.save()
        .then(() => res.json('Animal successfully updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));

});

router.route('/:id').delete(isAuth, isAdmin, (req, res) => {
  if (req.body.pictures) deleteFiles(req.body.pictures, animalContentsBN)

  Animal.findByIdAndDelete(req.params.id)
    .then(() => res.json('Animal successfully deleted!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;

// router.route('/recent/booked').get(isAuth, async (req, res) => {
//   console.log(req.user.role)
//   const role = req.user.role
//   var date = new Date();
//   date.setMonth(date.getMonth() - 3);

//   const animals = await Animal.aggregate([
//     { $match: { shelter: req.user.shelter } },
//     {
//        $lookup:
//           {
//             from: "bookings",
//             pipeline: [
//                { $match:
//                   { $expr:
//                      { $and:
//                         [
//                           {$eq: [ "$animal",  "$$_id" ]},
//                           {$eq: ["$shelter", "$$shelter"]},
//                           {$gte: [ "$$date", date]},
//                           {$lte: ["$$date", new Date()]}
//                         ]
//                      }
//                   }
//                },
//             ],
//             as: "booking"
//           }
//      }
//  ])
// });