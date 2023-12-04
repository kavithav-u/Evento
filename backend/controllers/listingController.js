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

// const getSearchListingsssss = async (req,res,next) => {
//     try{
//         const limit = parseInt(req.query.limit) || 9;
//         const startIndex = parseInt(req.query.startIndex) || 0;
//         // let offer = req.query.offer;
    
//         // if (offer === undefined || offer === 'false') {
//         //   offer = { $in: [false, true] };
//         // }
    
//         let location = req.query.location;
//         console.log(location,"fffff")
    
//         if (location === undefined || location === 'false') {
//             location = { $in: [false, true] };
//         }
    
//         let capacity = req.query.capacity;
    
//         if (capacity === undefined || capacity === 'false') {
//             capacity = { $in: [false, true] };
//         }
    
//         // let type = req.query.type;
    
//         // if (type === undefined || type === 'all') {
//         //   type = { $in: ['sale', 'rent'] };
//         // }
    
//         const searchTerm = req.query.searchTerm || '';
    
//         const sort = req.query.sort || 'createdAt';
    
//         const order = req.query.order || 'desc';
    
//         const listings = await Hall.find({
//           name: { $regex: searchTerm, $options: 'i' },
//           capacity,
//           location,

//         })
//           .sort({ [sort]: order })
//           .limit(limit)
//           .skip(startIndex);
//     console.log(listings,"GGGG")
//         return res.status(200).json(listings);
        
//       } catch (error) {
//         next(error);
//       }
//     };



const getSearchListing = async(req,res) =>{
    try {
        console.log("fffffff");
        const events = await Event.find();
        const halls = await Hall.find()
        console.log(halls,"halls");

        res.status(200).json({success:true,halls,events,message:"Success"})
    }  catch (error) {
        res.status(200).json({message:"Internal server error"});
            }
};

const filterSearch = async (req,res) => {
    try {
        console.log(req.body,"sdfasfasf");
        const {event, eventId} = req.body;
        const filterData = await Hall.find({ events: eventId });
        console.log("filterData",filterData)
        console.log(eventId,"eventId");
        res.status(200).json({sucess:true, filterData, message:"success"})
    }  catch (error) {
        res.status(200).json({message:"Internal server error"});
            }
}

export {
    fetchListing,
    getDetails,
    getCateringDetails,
    getAboutData,
    getSearchListing,
    filterSearch
}