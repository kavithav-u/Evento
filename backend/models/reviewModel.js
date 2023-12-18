import mongoose from 'mongoose';
const schema= mongoose.Schema;

// Define the review schema
const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the user who wrote the review
      required: true,
    },
    // event: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Event', // Reference to the event being reviewed
    //   required: true,
    // },
    hall: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hall', // Reference to the event being reviewed
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
