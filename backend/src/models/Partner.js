const mongoose = require('mongoose');

const partnerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['financiadores', 'tecnologicos', 'ongs']
  },
  logo: {
    publicId: String,
    url: String,
    optimizedUrl: String
  },
  website: {
    type: String,
    required: true
  },
  description: String,
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
partnerSchema.index({ category: 1, active: 1, order: 1 });

module.exports = mongoose.model('Partner', partnerSchema);