const mongoose = require("mongoose");

const EducationSchema = new mongoose.Schema(
  {
    school: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "No information",
    },
  },
  { timestamps: true }
);

const ExperienceSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "No information",
    },
  },
  { timestamps: true }
);

const CertificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: " ",
    },
    description: {
      type: String,
      default: "No information",
    },
  },
  { timestamps: true }
);

const InventionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: " ",
    },
    description: {
      type: String,
      default: "No information",
    },
  },
  { timestamps: true }
);

const PatentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "No information",
    },
  },
  { timestamps: true }
);

const AvailabilitySchema = new mongoose.Schema({
  day: {
    type: Number,
  },
  range: {
    type: String,
  },
});

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      unique: true,
    },
    title: {
      type: String,
    },
    profilePicture: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    backgroundPicture: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    about: {
      type: String,
    },
    education: [EducationSchema],
    certification: [CertificationSchema],
    experience: [ExperienceSchema],
    tutorSkills: {
      type: String,
    },
    inventions: [InventionSchema],
    patents: [PatentSchema],
    hourlyRates: {
      type: Number,
      default: 0,
    },
    country: {
      type: String,
    },
    phoneNumber: {
      type: String,
      default: "No phone number",
    },
    openToCollaborate: {
      type: Boolean,
      default: false,
    },
    availability: [AvailabilitySchema],
  },
  { timestamps: true }
);

const profileModel = mongoose.model("profile", profileSchema);

module.exports = profileModel;
