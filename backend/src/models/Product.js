const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  sku: {
    type: String,
    required: true,
    unique: true
  },
  category: {
    type: String,
    required: true,
    enum: ['bengala-inteligente', 'acessorios', 'software', 'servicos']
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  cost: {
    type: Number,
    required: true,
    min: 0
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  minStock: {
    type: Number,
    default: 5
  },
  images: [{
    publicId: String,
    url: String,
    optimizedUrl: String
  }],
  specifications: {
    weight: String,
    dimensions: String,
    battery: String,
    connectivity: String,
    sensors: [String],
    warranty: String
  },
  status: {
    type: String,
    enum: ['ativo', 'inativo', 'descontinuado'],
    default: 'ativo'
  },
  featured: {
    type: Boolean,
    default: false
  },
  tags: [String]
}, {
  timestamps: true
});

// Virtual for profit margin
productSchema.virtual('profitMargin').get(function() {
  return ((this.price - this.cost) / this.price * 100).toFixed(2);
});

// Check if stock is low
productSchema.virtual('isLowStock').get(function() {
  return this.stock <= this.minStock;
});

// Indexes
productSchema.index({ sku: 1 });
productSchema.index({ category: 1, status: 1 });
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ featured: 1, status: 1 });

module.exports = mongoose.model('Product', productSchema);