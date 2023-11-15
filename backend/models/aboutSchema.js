
import mongoose from 'mongoose';


const aboutSchema = new mongoose.Schema({
  image: { 
    type: String, 
    required: true 
}, 
  description: {
     type: String, 
     required: true 
    }, 
    title: { 
      type: String, 
      required: true 
  }, 
});


const About = mongoose.model('About', aboutSchema);
export default About;