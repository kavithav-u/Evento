import mongoose from 'mongoose';
const schema= mongoose.Schema;

// Define the review schema
const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: schema.Types.ObjectId,
      ref: 'User', 
      required: true,
    },

    hall: {
        type: schema.Types.ObjectId,
        ref: 'Hall', 
        required: true,
      },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    // Enable timestamps for createdAt and updatedAt fields
    timestamps: true,
  }
);

// Create the Review model
const Review = mongoose.model('Review', reviewSchema);

// Export the model
export default Review;
