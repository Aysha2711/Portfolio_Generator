const mongoose = require("mongoose");

const userPortfolioSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },

  fullName: {
    type: String,
    required: true
  },

  title: {
    type: String
  },

  bio: {
    type: String
  },

  profileImage: {
    type: String
  },

  contact: {
    email: String,
    linkedin: String,
    github: String,
    website: String
  },

  skills: [
    {
      type: String
    }
  ],

  projects: [
    {
      name: String,
      description: String,
      techStack: [String],
      githubLink: String,
      liveDemo: String
    }
  ],

  experience: [
    {
      company: String,
      role: String,
      duration: String,
      description: String
    }
  ]
});

module.exports = mongoose.model("UserPortfolio", userPortfolioSchema);