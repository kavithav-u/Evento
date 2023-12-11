import Hall from '../models/hallModels.js';
import Event from "../models/eventModels.js";
import Catering from '../models/cateringModels.js';
import About from '../models/aboutSchema.js';
import asyncHandler from 'express-async-handler';
import Banner from '../models/bannerModel.js';
import Booking from '../models/bookingsSchema.js';


const fetchListing = asyncHandler(async(req,res) => {
    try {
        const event = await Event.find();
        const eventId = req.params.eventId;
        const halls = await Hall.find({ events: eventId }).populate('events');
        const caterings = await Catering.find({events:eventId}).populate('events');
        res.status(200).json({ success: true, halls,caterings });
      } catch (error) {
        res.status(500).json({ message: 'Server error' });
      }
});

const getDetails = async(req,res) => {
    try {
        const hallId = req.params.hallId;
        const Halls = await Hall.find({_id:hallId});
        const bookings = await Booking.find();
        res.status(200).json({ success: true, Halls,bookings });
    } catch (error) {
        res.status(500).json({message:"Internal server error"});
    }
}

const getCateringDetails = async(req,res) => {
    try {

        const cateringId = req.params.cateringId;
        const Catering = await Catering.find({_id:cateringId})
        res.status(200).json({ success: true, Catering });
    } catch (error) {
        res.status(500).json({message:"Internal server error"});
    }
};


const getAboutData = async(req,res) => {
    try {
        const abouts = await About.find();
        const Banners = await Banner.findOne({page:'About'});
        res.status(200).json({success:true,Banners, abouts,message:"Success"})
    } catch (error) {
        res.status(200).json({message:"Internal server error"});
    }
};

const elasticSearch = async (req,res) => {
    try {
        console.log("Sdfasdfasdfasddfasfaf")
        console.log(req.body,"req.bodyssss")
        const halls = await Hall. find();
        console.log(halls,"halls")
        res.status(200).json ({success:true, halls})
    } catch (error) {
        res.status(200).json({message:"Internal server error"});
            }
}


const getSearchListing = async(req,res) =>{
    try {
        const events = await Event.find();
        const halls = await Hall.find()

        res.status(200).json({success:true,halls,events,message:"Success"})
    }  catch (error) {
        res.status(200).json({message:"Internal server error"});
            }
};



const filterSearch = async (req, res) => {
    try {
      console.log(req.body, "sdfasfasf");
      const { sortOrder, eventId, location } = req.body;
  
      let filterData;
  
      if (location === '' || location === 'All Locations') {
        filterData = await Hall.find({ events: eventId });
      } else {
        console.log("entered else");
        filterData = await Hall.find({ events: eventId, location: location });
        console.log(filterData, "filterData before sort");
      }

      if (sortOrder === 'regularPrice_asc') {

        filterData.sort((a, b) => a.pricePerDay - b.pricePerDay);
      } else if (sortOrder === 'regularPrice_desc') {
        console.log("dfasdfadf")
        filterData.sort((a, b) => b.pricePerDay - a.pricePerDay);
        console.log("completed Desc sort")
      }

      console.log(filterData,"filterData")
  
      if (res.success === 'false') {
        res.status(200).json({ success: false, message: "No hall found" });
        
      } else {
        res
          .status(200)
          .json({ success: true, filterData, message: "success" });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };
  

export {
    fetchListing,
    getDetails,
    getCateringDetails,
    getAboutData,
    getSearchListing,
    filterSearch,
    elasticSearch,
}