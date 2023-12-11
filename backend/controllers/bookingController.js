
import Booking from '../models/bookingsSchema.js'

import crypto from 'crypto';

function generateUuid(length) {
   console.log("ASdadsd")
  return crypto.randomBytes(length).toString('hex');
}

const getBookings = async(req,res) => {
    try {
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
    const bookingsWithoutOrderId = await Booking.find({ orderId: { $exists: false } });

    // Generate and assign orderId for each booking without orderId
    for (const booking of bookingsWithoutOrderId) {
      const orderId = generateUuid(16);
      await Booking.findByIdAndUpdate(booking._id, { orderId });
    }

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
        const orderId = generateUuid(16);
        const newBooking = await Booking.create({
          orderId,
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
    const updateBooking = await bookings.save();
    console.log("updateBooking",updateBooking);
    res.status(200).json({success:true, message:'booking Canceled'})
  } catch(error) {
    console.error(error);
    res.status(500).json({message:"internal server error"})
  }
};

const adminActionBookings = async(req,res) => {
  try {
    console.log(req.body,"res.body")
    const bookingId = req.body.bookingId;
    console.log(bookingId,"bbookingId");
    const  action = req.body.action;
    console.log("action",action)

    const booking = await Booking.findById(bookingId);
    console.log("booking",booking);
    if(!booking) {
      return res.status(404).json({error:'Booking not found'});
    }


    if(booking.status=== 'pending') {
      booking.status = 'confirmed';
    }  else if (booking.status === 'confirmed' && action === 'cancel') {
      booking.status = 'canceled';
    } else {
      console.log("dfasdfasfdasf")
      // Handle other cases where status cannot be changed
      return res.status(404).json({ success: true, error: 'Invalid action for the current status' });
    }

    const statusUpdate = await booking.save();
    console.log("statusUpdate",statusUpdate)
    return res.json({ success: true, statusUpdate });
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