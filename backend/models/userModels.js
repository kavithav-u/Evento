import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
  {
    uniqueId: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    isActive:{
      type:Boolean,
      default:true
   },
   isChat: {
    type: Boolean,
    default: false, 
    },
    password: {
      type: String,
      required: true,
    },
    image: String,
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      next();
    }
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });

  userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  
const User = mongoose.model('User', userSchema);

export default User;