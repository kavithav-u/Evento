import Banner from '../models/bannerModel.js';


const getAllBanner = async (req,res) => {
    try {
    const banner = await Banner.find();
    res.status(200).json({success:true,banner})
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
};

const newBanner = async (req,res) => {
    try {
        const {page,image,description} = req.body;
        console.log(req.body,"REQss>BODY");
        let existing = await Banner.findOne({page});
        console.log("RRRRr")
        if(existing) {
            res.status(409).json({message:"Banner already exists"});
        } else {
            console.log("RRRRR")
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
        console.log(banners,"BANENRs");
        res.status(201).json({message:" xcftgvhbjnkml", success:true, Banner:banners})
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"})
    }
};

const editBanner = async (req, res) => {
    try {
        console.log("req.body",req.body)
      const { page, description, image } = req.body;
      console.log(image,"image")
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
        console.log(req.body,"FFFf")
        const bannerId = req.body._id;
    console.log("bannerId",bannerId)

    // Find the banner by ID and remove it from the database
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