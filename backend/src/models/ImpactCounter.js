const mongoose = require('mongoose');

const impactCounterSchema = new mongoose.Schema({
  totalSold: { type: Number, default: 0 },
  totalDonated: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: Date.now }
});

const storySchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  location: String,
  story: { type: String, required: true },
  image: String,
  deviceType: { type: String, enum: ['sold', 'donated'], required: true },
  consentGiven: { type: Boolean, default: false },
  isPublic: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = {
  ImpactCounter: mongoose.model('ImpactCounter', impactCounterSchema),
  Story: mongoose.model('Story', storySchema)
};