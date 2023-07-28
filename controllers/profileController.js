const profileModel = require("../models/profileModel");
const userModel= require("../models/userModel")
const Joi = require("joi");
const validateProfile = (profileData) => {
  const educationSchema = Joi.object({
    school: Joi.string().default(""),
    description: Joi.string().default("No information"),
  });

  const experienceSchema = Joi.object({
    company: Joi.string().default(""),
    description: Joi.string().default("No information"),
  });

  const certificationSchema = Joi.object({
    title: Joi.string().default(""),
    description: Joi.string().default("No information"),
  });

  const inventionSchema = Joi.object({
    title: Joi.string().default(""),
    description: Joi.string().default("No information"),
  });

  const patentSchema = Joi.object({
    title: Joi.string().default(""),
    description: Joi.string().default("No information"),
  });

 

  const availabilitySchema = Joi.object({
    day: Joi.number().default(""),
    range:Joi.string().default("")
  })

  const profileSchema = Joi.object({
    about: Joi.string(),
    userName:Joi.string(),
    title: Joi.string(),
    education: Joi.array().items(educationSchema),
    certification: Joi.array().items(certificationSchema),
    experience: Joi.array().items(experienceSchema),
    tutorSkills: Joi.string(),
    inventions: Joi.array().items(inventionSchema),
    patents: Joi.array().items(patentSchema),
        availability:Joi.array().items(availabilitySchema),
    hourlyRates: Joi.number().default(0),
    country: Joi.string(),
    phoneNumber: Joi.string().default("No phone number"),
    openToCollaborate: Joi.boolean().default(false),
  });

return profileSchema.validate(profileData)
};


module.exports.editProfile = [
  async (req, res) => {
    const { error } = validateProfile(req.body);
    if (error) {
      return res.status(404).json({ error: error.details[0].message });
    }

    const {
      about,
      education,
      certification,
      experience,
      tutorSkills,
      inventions,
      patents,
      title,
      hourlyRates,  
      country,
      phoneNumber,
        openToCollaborate,
        backgroundPicture,
      profilePicture,
      availability,
      userName
    } = req.body;
    try {
      const profile = await profileModel.findOneAndUpdate(
        { user: req.user._id },
        { about, education,title, certification, experience , profilePicture, backgroundPicture, availability,tutorSkills,inventions, patents, hourlyRates, country, phoneNumber, openToCollaborate},
        { new: true }
      );

      
    
    
  
      if (!profile) return res.status(404).send("No profile found to update")
      const nameToUpdate = await userModel.findById(req.user._id)
      nameToUpdate.name = userName
      await nameToUpdate.save()
    
      if(!nameToUpdate)return res.status(404).send("Faced an error when updating the name ")

    const profileToReturn = await profileModel.findOne({user:req.user._id}).populate("user")
      res.status(201).json({
        profile: profileToReturn,
        message: "Profile Updated Successfully",
      });
    } catch (err) {
      let error = err.message;      
      res.status(400).json({ error: error });
    }
  },
];

module.exports.getMyProfile = async (req, res) => {
    try {

        var profile = await profileModel.findOne({ user: req.user._id }).populate('user');

        res.status(201).json({
            profile: profile,
            message: 'Profile Fetched Successfully',
        });

    } catch (err) {
        let error = err.message;
        res.status(400).json({ error: error });
    }
};


module.exports.deleteProfile = async (req, res) => {
  try {
    const id = req.params.id;
    let profile = await profileModel
      .findOne({ user: req.user._id })
      .populate("user");

    // Check if the profile exists for the current user
    if (!profile) {
      return res.status(404).json({ message: "Profile not found for the current user" });
    }

    const ids = [
      ...profile.experience.map((item) => item._id.toString()),
      ...profile.education.map((item) => item._id.toString()),
      ...profile.inventions.map((item) => item._id.toString()),
      ...profile.certification.map((item) => item._id.toString()),
      ...profile.patents.map((item) => item._id.toString()),
    ];

    // Check if the given id exists in the ids array
    if (!ids.includes(id)) {
      return res.status(404).json({ message: "Record not found" });
    }

    // Find the correct item and remove it based on the id
    const findAndRemove = (arr) => arr.filter(item => item._id.toString() !== id);

    profile.experience = findAndRemove(profile.experience);
    profile.education = findAndRemove(profile.education);
    profile.inventions = findAndRemove(profile.inventions);
    profile.certification = findAndRemove(profile.certification);
    profile.patents = findAndRemove(profile.patents);

    await profile.save();

    return res.status(200).json({ message: "Record deleted successfully", profile });
  } catch (error) {
    return res.status(500).send("Server error");
  }
};



module.exports.updateProfile =[ async (req, res) => {
  try {
    const id = req.params.id;
    const { objectType, newData } = req.body;
    let profile = await profileModel
      .findOne({ user: req.user._id })
      .populate("user");

    let objectArray;
    switch (objectType) {
      case "experience":
        objectArray = profile.experience;
        break;
      case "education":
        objectArray = profile.education;
        break;
      case "patents":
        objectArray = profile.patents;
        break;
      case "inventions":
        objectArray = profile.inventions;
        break;
      case "certification":
        objectArray = profile.certification;
        break;
      default:
        return res.status(400).json({ message: "Invalid objectType provided" });
    }


    const objectToUpdate = objectArray.find(
      (item) => item._id.toString() === id
    );

    if (!objectToUpdate) {
      return res.status(404).json({ message: "Record not found" });
    }

   await Object.assign(objectToUpdate, newData);

    await profile.save();
    return res
      .status(200)
      .json({ message: "Record updated successfully", profile });
  } catch (error) {
    return res.status(500).send("Server error");
  }
}
]


module.exports.addSingleProfile= [
  async (req, res) => {
    try {
      const field = req.params.field;
      const newData=req.body
   let profile = await profileModel.findOne({ user: req.user._id });
      if (!profile) {
        return res.status(404).json({ message: "User profile not found" });
      }
      // Create a new record based on the provided field
      switch (field) {
        case "experience":
          profile.experience.push(newData);
          break;
        case "education":
          profile.education.push(newData);
          break;
        case "certification":
          profile.certification.push(newData);
          break;
        case "inventions":
          profile.inventions.push(newData);
          break;
        case "patents":
          profile.patents.push(newData);
          break;
        default:
          return res.status(400).json({ message: "Invalid field provided" });
      }
      await profile.save();
      return res
        .status(200)
        .json({ message: "Record created successfully", profile });
    } catch (error) {
      return res.status(500).send("Server error");
    }
  }
  ]