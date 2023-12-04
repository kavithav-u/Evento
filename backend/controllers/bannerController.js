import Banner from '../models/bannerModel.js';


const getAllBanner = async (req,res) => {
    try {
    const banner = await Banner.find().sort({_id:-1});
    res.status(200).json({success:true,banner})
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
};

const newBanner = async (req,res) => {
    try {
        const {page,image,description} = req.body;
        let existing = await Banner.findOne({page});
        if(existing) {
            res.status(409).json({message:"Banner already exists"});
        } else {
            const newBanner = await Banner.create ({
                page,
                image,
                description
            });
            res.status(201).json({message:" New Banner Created", success:true, Banner:newBanner})
        }
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"})
    }
};

const getBannerPages = async(req,res) => {
    try {
        const banners = await Banner.findOne({page});
        res.status(201).json({message:" xcftgvhbjnkml", success:true, Banner:banners})
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"})
    }
};

const editBanner = async (req, res) => {
    try {
      const { page, description, image } = req.body;
        const bannerId = req.body._id;
      const existingBanner = await Banner.findById(bannerId);
      if (!existingBanner) {
        res.status(404).json({ message: "Banner not found" });
      } else {
        existingBanner.page = page;
        existingBanner.description = description;
        existingBanner.image = image;

        const updatedBanner = await existingBanner.save();
  
        res.status(200).json({
          message: "Banner updated successfully",
          success: true,
          banner: updatedBanner,
        });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  };


  const deleteBanner = async (req,res) => {
    try {
      
    const bannerId = req.body._id;
    const deletedBanner = await Banner.findByIdAndDelete(bannerId);

    if (!deletedBanner) {
      return res.status(404).json({ error: 'Banner not found' });
    }

    res.status(200).json({success:true, message:"deleted"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
  }

export {
    getAllBanner,
    newBanner,
    getBannerPages,
    editBanner,
    deleteBanner

}