
import Booking from '../models/bookingsSchema.js'
import User from '../models/userModels.js'
import Event from "../models/eventModels.js";


const getBookings = async(req,res) => {
    try {
      console.log("asdfghfdsa")
      const userId = req.params.userId;
      const bookings = await Booking.find({ user: userId })
      .populate({path:'user'})
    .populate({path:'hall',
  select:'hallName location hallImage events',
populate:{
  path:'events',
  select:'eventType'
}})
  .exec();
  console.log(bookings,"bookings")
    res.status(200).json({ bookings });
    } catch (error) {
      res.status(500).json({ message: "server issue" });
    }
}

const getAllBookings = async(req,res) => {
  try {
    console.log("ggggggggggggggggggggggggggggggg")
    const bookings = await Booking.find().populate({path:'user',})
    .populate({path:'hall',
populate:{
  path:'events',
}})
  .exec();;
    console.log("dfdfdfd,", bookings);
    res.status(200).json({success:true, bookings})
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server issue" });
  }
}


const newBookings = async(req,res) => {
    try {
        const { hall, totalAmount, startDate, endDate, totalDays, user } = req.body;

        const newBooking = await Booking.create({
          hall,
          totalAmount,
          startDate,
          endDate,
          totalDays,
          user
        });
    
        // Send a success response
        res.status(200).json({ bookings:newBooking,success: true, message: 'Booking created successfully' });
      } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
};


const cancelBookings = async(req,res)=> {
  try{
    const bookingId = req.body._id;
    const bookings = await Booking.findById(bookingId);
    if(!bookings) {
      return res.status(404).json({ message: "Booking not found" });
    } else {
      console.log("efrefef")
      bookings.status = "canceled";
    }
    const updateBooking = await Booking.save();
    console.log("updateBooking",updateBooking);
    res.status(200).json({success:true, message:'booking Canceled'})
  } catch(error) {
    console.error(error);
    res.status(500).json({message:"internal server error"})
  }
};

const adminActionBookings = async(req,res) => {
  try {
    console.log(req.body)
    const bookingId = req.body.bookingId;
    console.log(bookingId,"bbookingId");
    const { action } = req.body;
    console.log("action".action)

    const booking = await Booking.findById(bookingId);
    console.log("booking",booking);
    if(!booking) {
      return res.status(404).json({error:'Booking not found'});
    }


    if(booking.status=== 'pending') {
      booking.status = 'confirmed';
    } else if(booking.status=== 'confirmed') {
      booking.status = 'canceled'
    } 
    const statusUpdate = await booking.save();
    console.log("statusUpdate",statusUpdate)
    return res.json({ success: true, booking });
  }  catch(error) {
    console.error(error);
    res.status(500).json({message:"internal server error"})
  }
}

export {
    getBookings,
    newBookings,
    cancelBookings,
    getAllBookings,
    adminActionBookings
}