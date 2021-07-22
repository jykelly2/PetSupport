const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const animalSchema = new Schema({

    // generalInfo: [
    //     {
          name: { type: String, required: true },
          description: { type: String},
          animalType: { type: String, required: true },
          breed: { type: String, required: true },
          gender: { type: String, required: true },
          age: { type: Number, required: true },
          size: { type: String, required: true },
          pictures: {
            type: Array,
            trim: true,
          },
          personalities: {
            type: Array,
            trim: true,
          },
          shelter: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Shelter',
            required: true,
          },
       // },
      // ],
    // documents: [{
        isNeuteured: { type: Boolean, default: false, required: true,},
        isVaccinated: {type: Boolean, default: false, required: true,},
        isPottyTrained: {type: Boolean, default: false, required: true,},
        isLeashTrained: {type: Boolean,  default: false,required: true,},
        isAvailable: { type: Boolean, default: false,required: true,},
        isScheduled: { type: Boolean, default: false,required: true,},
        isAdopted: { type: Boolean, default: false,required: true,},
    // }]

}, {
  timestamps: true,
});

const Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal;