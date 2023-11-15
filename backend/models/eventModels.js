import mongoose from 'mongoose';


const eventSchema = new mongoose.Schema({
  eventType: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  eventImage: {
    type : String
  },
  isActive:{
    type:Boolean,
    default:true
 }
});


const Event = mongoose.model('Event', eventSchema);

export default Event;