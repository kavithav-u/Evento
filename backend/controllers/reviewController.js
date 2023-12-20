import Booking from "../models/bookingsSchema.js";
import Review from "../models/reviewModel.js";


const newReview = async(req,res) => {
    try {
        console.log(req.body,"req.bodyssss")
        const { comment,rating, hallId, _id } = req.body;
        const hallString = hallId.toString();

        const userString = _id.toString();
        console.log("hallString",hallString,userString)
        const existingBooking = await Booking.findOne({
            user: userString,
            hall:hallString, 
          });
          console.log("existingBooking",existingBooking)
          if (!existingBooking) {
            return res.status(400).json({
              success: false,
              message: 'User must have a booking for the specified hall to add a review.',
            });
          } else {
            console.log("SDfasdfasf")
          const newReviews = await Review.create({
            comment,
            rating,
            user: userString,
            hall:hallString,
          });
       
        // console.log(newReviews,"newRwviews")
        res.status(200).json({success:true, message:"Review Added", newReviews})
    }
    } catch (error) {
      console.error(error,"error");
        res.status(500).json({message:":server Errors"})
    }
}


const getAllReview =  async(req,res) => {
  // console.log("userId",userId);
  try {
    const reviews = await Review.find();

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