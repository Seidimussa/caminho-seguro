const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    required: true,
    trim: true
  },
  bio: {
    type: String,
    required: true
  },
  photo: {
    publicId: String,
    url: String,
    optimizedUrl: String
  },
  social: {
    linkedin: String,
    twitter: String,
    instagram: String,
    facebook: String,
    github: String,
    tiktok: String,
    whatsapp: String,
    telegram: String,
    email: String
  },
  order: {
    type: Number,
    default: 0
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for faster queries
teamMemberSchema.index({ active: 1, order: 1 });

module.exports = mongoose.model('TeamMember', teamMemberSchema);