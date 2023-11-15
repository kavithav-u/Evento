import Banner from "../models/bannerModel.js";
import Event from "../models/eventModels.js";
import  asyncHandler from 'express-async-handler';



const getAllEvent = async (req, res) => {
    try {
      const events = await Event.find();
      console.log(events,"EVENTS")
      const Banners = await Banner.findOne({page:'Services'});
      console.log(Banners,"DFDDV")
      res.status(200).json({ events, Banners });
    } catch (error) {
      res.status(500).json({ message: "server issue" });
    }
  };

  const getAllEvents = async (req, res) => {
    try {
      const events = await Event.find({ isActive: true });
      console.log(events,"EVENTS")
      const Banners = await Banner.findOne({page:'Services'});
      console.log(Banners,"DFDDV")
      res.status(200).json({ events, Banners });
    } catch (error) {
      res.status(500).json({ message: "server issue" });
    }
  };


  const newEvent = asyncHandler(async (req, res) => {
    try {
      const { eventType, description, eventImage } = req.body;

      let existingEvent = await Event.findOne({ eventType });
      if (existingEvent) {
        return res.status(409).json({ message: "Event already exists." });
      } else {
        const newEvents = await Event.create({
          eventType,
          description,
          eventImage,
        });
        res
          .status(201)
          .json({
            event: newEvents,
            message: "Event Added Successfully",
            success: true,
          });
      }
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  const editEvent = async (req,res) => {
    try {
      const { eventType, description, eventImage } = req.body;
      console.log(req.body,"req.body")
      const eventId = req.body._id;
      console.log(eventId,"eventId");


      const existingEvent = await Event.findById(eventId);

    if (!existingEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Update event properties
    existingEvent.eventType = eventType;
    existingEvent.description = description;
    existingEvent.eventImage = eventImage;

    const updatedEvent = await existingEvent.save();

    res.status(200).json({
      event: updatedEvent,
      message: "Event Updated Successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

  const adminActionEvent = asyncHandler(async (req, res) => {
    const { eventId, eventStatus } = req.body;
    try {
      const events = await Event.findById(eventId);
      if (events) {
        const updateActiveStatus = !events.isActive;
        events.isActive = updateActiveStatus;
        await events.save();

        res.status(200).json({
          success: true,
          isActive: updateActiveStatus,
        });
      } else {
        res.status(404).json({ message: "Catering not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Internal Server error" });
    }
  });




  export {
    getAllEvents,
    newEvent,
    adminActionEvent,
    editEvent,
    getAllEvent
  };