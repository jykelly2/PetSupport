const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookingSchema = new Schema({

    shelter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shelter',
        required: true,
      },
      client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true,
      },
      animal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Animal',
        required: true,
      },
      date :  { type: Date, required: true },
      startTime:  { type: Date, required: true},
      endTime:  { type: Date, required: true },
      status: { type: String, required: true },
      hours: { type: Number, required: true },
      totalAmount: { type: Number, required: true },
      approvedBy: { type: String, required: true },
      completedBy: { type: String, required: true },
      //notes array 
      //editedby array 
},
{
    timestamps: true,
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;