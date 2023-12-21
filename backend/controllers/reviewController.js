import Booking from "../models/bookingsSchema.js";
import Review from "../models/reviewModel.js";


const newReview = async(req,res) => {
    try {
        const { comment,rating, hallId, _id } = req.body;
        const hallString = hallId.toString();

        const userString = _id.toString();
        const existingBooking = await Booking.findOne({
            user: userString,
            hall:hallString, 
          });
          if (!existingBooking) {
            return res.status(400).json({
              success: false,
              message: 'User must have a booking for the specified hall to add a review.',
            });
          } else {
          const newReviews = await Review.create({
            comment,
            rating,
            user: userString,
            hall:hallString,
          });
       
        res.status(200).json({success:true, message:"Review Added", newReviews})
    }
    } catch (error) {
      console.error(error,"error");
        res.status(500).json({message:":server Errors"})
    }
}


const getAllReview =  async(req,res) => {
  try {
    const reviews = await Review.find().populate({ path: "user" }).sort({ createdAt: -1 }).limit(2);

    console.log(reviews,"revies of other user");
    res.status(200).json({success:true,message:"success", reviews})

  } catch (error) {
    res.status(500).json({message:":server Error"})

}
}

export {
    newReview,
    getAllReview
}