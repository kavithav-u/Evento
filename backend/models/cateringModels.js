import mongoose from 'mongoose';
const schema= mongoose.Schema;


const cateringSchema = new mongoose.Schema ({
    itemName:{
        type: String,
        required:true
    },
    description : {
        type: String
    },
    price: {
        type: Number,
        required:true
    },
    isActive:{
        type:Boolean,
        default:true
     },
    itemImages: {
        type: Array,
        require: true
    },
    isVeg: {
        type: Boolean,
        
    },
    events: { 
        type: schema.Types.ObjectId, 
        ref: 'Event' 
    },
})


const Catering = mongoose.model('Catering',cateringSchema);
export default Catering;