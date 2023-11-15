import mongoose from 'mongoose';
const schema= mongoose.Schema;

const hallSchema = new mongoose.Schema ({
    hallName : {
        type:String,
        required:true
    },
    description : {
        type: String,
    },
    hallImage : {
        type: Array,
    },
    isActive:{
        type:Boolean,
        default:true
     },
    location: {
        type :String
    },
    pricePerDay: {
        type: Number
    },
    capacity: {
        type: Number
    },
    events: { 
        type: schema.Types.ObjectId, 
        ref: 'Event' 
    },
    isActive:{
        type:Boolean,
        default:true
     }
})


const Hall = mongoose.model('Hall',hallSchema);



export default Hall;