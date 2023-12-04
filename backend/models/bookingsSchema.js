import mongoose from 'mongoose';
const schema= mongoose.Schema;

const bookingSchema = new mongoose.Schema({
  hall: {
    type: schema.Types.ObjectId,
    ref:'Hall', 
    required: true,
  },
  user: {
    type: schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  totalAmount: {
    type:String,
    required: true
  },
  totalDays: {
    type: Number,
    require:true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: [ 'confirmed', 'canceled','expired','pending'],
    default: 'pending',
  },
  cancelledAt: {
    type: Date,
  },
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;