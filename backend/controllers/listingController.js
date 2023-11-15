import Hall from '../models/hallModels.js';
import Event from "../models/eventModels.js";
import Catering from '../models/cateringModels.js';
import About from '../models/aboutSchema.js';
import asyncHandler from 'express-async-handler';
import Banner from '../models/bannerModel.js';


const fetchListing = asyncHandler(async(req,res) => {
    try {
        const event = await Event.find();
        const eventId = req.params.eventId;
        const halls = await Hall.find({ events: eventId }).populate('events');
        const caterings = await Catering.find({events:eventId}).populate('events');
        res.status(200).json({ success: true, halls, caterings });
      } catch (error) {
        res.status(500).json({ message: 'Server error' });
      }
});

const getDetails = async(req,res) => {
    try {
        const hallId = req.params.hallId;
        const Halls = await Hall.find({_id:hallId})
        res.status(200).json({ success: true, Halls });
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
        console.log(Banners,"ASDFGH")
        console.log(abouts,"DFGDFG");
        res.status(200).json({success:true,Banners, abouts,message:"Success"})
    } catch (error) {
        res.status(200).json({message:"Internal server error"});
    }
}

export {
    fetchListing,
    getDetails,
    getCateringDetails,
    getAboutData
}