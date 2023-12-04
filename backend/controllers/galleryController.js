import Gallery from '../models/galleryModel.js';


const getGallery = async (req,res) => {
    try {
        console.log("adsfdgvdcz")
    const gallery = await Gallery.find().sort({_id:-1});
    console.log(gallery,"ghfghf")
    res.status(200).json({success:true,gallery})
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
};

const fectchImages = async (req,res) => {
  try {
      console.log("ggggggg")
  const gallery = await Gallery.find();
  console.log(gallery,"ghfghf")
  res.status(200).json({success:true,gallery})
  } catch (error) {
      res.status(500).json({message:"Internal server error"})
  }
};



const newGallery = async (req,res) => {
    try {
        const {image,description} = req.body;
        console.log("erere",req.body)
        let existing = await Gallery.findOne({description});
        console.log("exis",existing)
        if(existing) {
            res.status(409).json({message:"Image already exists"});
        } else {
            console.log("fffffffffff")
            const newGallery = await Gallery.create ({
                image,
                description
            });
            res.status(201).json({message:" New Gallery Created", success:true, gallery:newGallery})
        }
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"})
    }
};

const editGallery = async (req, res) => {
    try {
      const { description, image } = req.body;
      console.log("req.body",req.body)
        const galleryId = req.body._id;
        console.log("galleryId",galleryId)
      const existingGallery = await Gallery.findById(galleryId);
      if (!existingGallery) {
        console.log("fffffff")
        res.status(404).json({ message: "Gallery not found" });
      } else {
        console.log("fffffffff")
        existingGallery.description = description;
        existingGallery.image = image;

        const updatedGallery = await existingGallery.save();
  
        res.status(200).json({
          message: "Gallery updated successfully",
          success: true,
          gallery: updatedGallery,
        });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  };


  const deleteGallery = async (req,res) => {
    try {
        const galleryId = req.body._id;

    // Find the banner by ID and remove it from the database
    const deletedGallery = await Gallery.findByIdAndDelete(galleryId);

    if (!deletedGallery) {
      return res.status(404).json({ error: 'Gallery not found' });
    }

    res.status(200).json({success:true, message:"deleted"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
  }


export {
    getGallery,
    newGallery,
    editGallery,
    deleteGallery,
    fectchImages
}