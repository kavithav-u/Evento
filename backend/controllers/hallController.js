import Hall from '../models/hallModels.js';
import Event from "../models/eventModels.js";
import asyncHandler from 'express-async-handler';



const getAllHalls = asyncHandler(async (req, res) => {
    try {
        const halls = await Hall.find();
        res.status(200).json({success:true,halls});
    } catch (error) {
        res.status(500).json({message:"Server issue"});
    }
});

const getHallDetails = async(req,res) => {
    try{
        const events = await Event.find();
        res.status(200).json({events})
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
}


const newHall = asyncHandler(async (req,res) => {
    try {
        const {hallName, description, location,pricePerDay,hallImage,capacity, events} = req.body;

        const existingHall = await Hall.findOne({hallName});

        if(existingHall) {
            return res.status(409).json({message:"Hall already exists"})
        } else {
            const newHalls = await Hall.create({
                hallName, 
                description, 
                location,
                pricePerDay,
                capacity,
                hallImage,
                events
            });
            res.status(201).json({success:true, halls:newHalls, message:"New Hall added successfully"})
        }

    } catch(error) {
        res.status(500).json({message:"Server Error"})
        console.log(error)
    }
});


const adminActionHall = async (req,res) => {
    const {hallId, hallStatus} = req.body;
    try {
        const halls = await Hall.findById(hallId);
        if(halls) {
            const updateActiveStatus = !halls.isActive;
            halls.isActive = updateActiveStatus;
            await halls.save();
            res.status(200).json({success:true, isActive:updateActiveStatus})
        }
    } catch (error) {
        res.status(500).json({success:false,message:"Internal server error"});
    }
}


export  {
    getAllHalls,
    newHall,
    adminActionHall,
    getHallDetails
};