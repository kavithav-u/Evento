import About from "../models/aboutSchema.js";
import Banner from "../models/bannerModel.js";

const getAbout = async (re, res) => {
  try {
    const about = await About.find().sort({ _id: -1 });
    res.status(200).json({ success: true, about });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const newAbout = async (req, res) => {
  try {
    const { image, description, title } = req.body;
    let existing = await About.findOne({ title });
    if (existing) {
      res.status(409).json({ message: "Already exists" });
    } else {
      const newAbout = await About.create({
        image,
        description,
        title,
      });
      res
        .status(200)
        .json({ success: true, message: "New About Added", About: newAbout });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateAbout = async (req, res) => {
  try {
    console.log(req.params,"params")
    console.log(req.body)
    const { title, description, image } = req.body;
    const aboutId = req.body._id;
    const existingAbout = await About.findById(aboutId);

    if (!existingAbout) {
      res.status(404).json({ message: "Already exists" });
    } else {
      existingAbout.title = title;
      existingAbout.description = description;
      existingAbout.image = image;

      const updatedAbout = await existingAbout.save();
      res
        .status(200)
        .json({
          succss: true,
          about: updatedAbout,
          message: "About updated successfully",
        });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteAbout = async (req, res) => {
  try {
    const aboutId = req.body._id;

    const deletedAbout = await About.findByIdAndDelete(aboutId);
    if (!deletedAbout) {
      return res.status(404).json({ error: "About not found" });
    }
    res.status(200).json({ sucess: true, message: "Deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { getAbout, newAbout, updateAbout, deleteAbout };
