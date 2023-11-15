import Catering from '../models/cateringModels.js';
import Event from "../models/eventModels.js";
import asyncHandler from 'express-async-handler';



const getAllCaterings = asyncHandler(async (req,res) => {
    try {
        const Caterings = await Catering. find();
        res.status(200).json({success:true, Caterings})
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"})
    }
});


const getEventsDetails = async(req,res) => {
    try{
        const events = await Event.find();
        res.status(200).json({events})
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
}

const addNewCatering = asyncHandler(async (req, res) => {
    try {
        const {itemName, description, itemImages, price, isVeg, events} =  req.body;
        let existingItem = await Catering.findOne ({itemName});
        if(existingItem) {
            return res.status(409).json({message:'Item already exists'})
        } else {
            const newCatering = await Catering.create ({
                itemName,
                description,
                itemImages,
                price, 
                isVeg,
                events
            });
            res.status(201).json({message:"New Item added succefuly", success:true, Catering:newCatering})
         }
        } catch (error) {
            res.status(500).json({message:"Internal Server Error"})
        }
});

const adminActionCatering = async (req, res) => {
  const { cateringId, isActive } = req.body;
  try {
    const catering = await Catering.findById(cateringId);
    if (catering) {
      const updatedActiveStatus = !catering.isActive;
      catering.isActive = updatedActiveStatus;
      await catering.save();

      const statusMessage = catering.isActive ? "activated" : "blocked";

      res.status(200).json({
        success: true,
        message: `Catering ${statusMessage} Successfully`,
        isActive: updatedActiveStatus,
      });
    } else {
      res.status(404).json({ message: "Catering not found" });
    }
  } catch (error) {
    console.error("Error updating catering:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
  


export {
    getAllCaterings,
    addNewCatering,
    adminActionCatering,
    getEventsDetails
}