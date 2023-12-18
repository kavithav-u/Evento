import Booking from "../models/bookingsSchema.js";

import crypto from "crypto";

function generateUuid(length) {
  return crypto.randomBytes(length).toString("hex");
}

const getBookings = async (req, res) => {
  try {
    const userId = req.params.userId;
    const bookings = await Booking.find({ user: userId })
    .sort({ createdAt: -1 })
      .populate({ path: "user" })
      .populate({
        path: "hall",
        select: "hallName location hallImage events",
        populate: {
          path: "events",
          select: "eventType",
        },
      })
      .exec();

    res.status(200).json({ bookings });
  } catch (error) {
    res.status(500).json({ message: "server issue" });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookingsWithoutOrderId = await Booking.find({
      orderId: { $exists: false },
    });

    // Generate and assign orderId for each booking without orderId
    for (const booking of bookingsWithoutOrderId) {
      const orderId = generateUuid(16);
      await Booking.findByIdAndUpdate(booking._id, { orderId });
    }

    const bookings = await Booking.find()
      .populate({ path: "user" })
      .populate({
        path: "hall",
        populate: {
          path: "events",
        },
      })
      .exec();
    res.status(200).json({ success: true, bookings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server issue" });
  }
};

const newBookings = async (req, res) => {
  try {
    console.log("entered new Booking")
    const { hall, totalAmount, startDate, endDate, totalDays, user } = req.body;
    console.log(hall,"hall");

    // const existingBooking = await Booking.findOne({
    //   hall,
    //   startDate: {$lte : endDate},
    //   endDate : {$gte : startDate}
    // });

    // if(existingBooking) {
    //   console.log(existingBooking,"existingBooking")
    //   return res.json({sucess:false, message:"Hall in already booked for the Dates"})
    // } else {
    const orderId = generateUuid(16);
    const newBooking = await Booking.create({
      orderId,
      hall,
      totalAmount,
      startDate,
      endDate,
      totalDays,
      user,
    });
    res
      .status(200)
      .json({
        bookings: newBooking,
        success: true,
        message: "Booking created successfully",
      });
    // }
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const cancelBookings = async (req, res) => {
  try {
    const bookingId = req.body._id;
    const bookings = await Booking.findById(bookingId);
    if (!bookings) {
      return res.status(404).json({ message: "Booking not found" });
    } else {
      bookings.status = "canceled";
    }
    const updateBooking = await bookings.save();
    res.status(200).json({ success: true, message: "booking Canceled" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal server error" });
  }
};

const adminActionBookings = async (req, res) => {
  try {
    const bookingId = req.body.bookingId;
    const action = req.body.action;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    if (booking.status === "pending") {
      booking.status = "confirmed";
    } else if (booking.status === "confirmed" && action === "cancel") {
      booking.status = "canceled";
    } else {
      return res
        .status(404)
        .json({
          success: true,
          error: "Invalid action for the current status",
        });
    }

    const statusUpdate = await booking.save();
    return res.json({ success: true, statusUpdate });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal server error" });
  }
};

export {
  getBookings,
  newBookings,
  cancelBookings,
  getAllBookings,
  adminActionBookings,
};
