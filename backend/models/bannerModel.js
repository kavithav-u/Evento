// models/banner.js
import mongoose from 'mongoose';


const bannerSchema = new mongoose.Schema({
  image: { 
    type: String, 
    required: true 
},
  page: { 
    type: String, 
    required: true 
}, 
  description: {
     type: String },
});

const Banner = mongoose.model('Banner',bannerSchema);
export default Banner;