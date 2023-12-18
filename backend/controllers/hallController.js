import Hall from "../models/hallModels.js";
import Event from "../models/eventModels.js";
import asyncHandler from "express-async-handler";

const getAllHalls = asyncHandler(async (req, res) => {
  try {
    const halls = await Hall.find().sort({ _id: -1 });

    res.status(200).json({ success: true, halls });
  } catch (error) {
    res.status(500).json({ message: "Server issue" });
  }
});

const getHallDetails = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json({ events });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const newHall = asyncHandler(async (req, res) => {
  try {
    const {
      hallName,
      description,
      location,
      pricePerDay,
      hallImage,
      capacity,
      events,
      catering,
    } = req.body;

    const existingHall = await Hall.findOne({ hallName });

    if (existingHall) {
      return res.status(409).json({ message: "Hall already exists" });
    } else {
      const newHalls = await Hall.create({
        hallName,
        description,
        location,
        pricePerDay,
        capacity,
        catering,
        hallImage,
        events,
      });
      res
        .status(201)
        .json({
          success: true,
          halls: newHalls,
          message: "New Hall added successfully",
        });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
    console.log(error);
  }
});

const adminActionHall = async (req, res) => {
  const { hallId, hallStatus } = req.body;
  try {
    const halls = await Hall.findById(hallId);
    if (halls) {
      const updateActiveStatus = !halls.isActive;
      halls.isActive = updateActiveStatus;
      await halls.save();
      res.status(200).json({ success: true, isActive: updateActiveStatus });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const editHall = async (req, res) => {
  try {
    const { location, hallName, capacity, description, hallImage } = req.body;
    const HallId = req.body._id;
    const existingHall = await Hall.findById(HallId);
    if (!existingHall) {
      res.status(404).json({ message: "Hall not found" });
    } else {
      existingHall.hallName = hallName;
      existingHall.location = location;
      existingHall.description = description;
      existingHall.capacity = capacity;
      existingHall.hallImage = hallImage;
      const updatedHall = await existingHall.save();
      res.status(200).json({
        message: "Hall updated successfully",
        success: true,
        Hall: updatedHall,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { getAllHalls, newHall, adminActionHall, getHallDetails, editHall };
