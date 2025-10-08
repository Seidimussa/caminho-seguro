const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  saleNumber: {
    type: String,
    required: true,
    unique: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    unitPrice: {
      type: Number,
      required: true,
      min: 0
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0
    }
  }],
  subtotal: {
    type: Number,
    required: true,
    min: 0
  },
  tax: {
    type: Number,
    default: 0,
    min: 0
  },
  discount: {
    type: Number,
    default: 0,
    min: 0
  },
  total: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['pendente', 'confirmada', 'enviada', 'entregue', 'cancelada'],
    default: 'pendente'
  },
  paymentStatus: {
    type: String,
    enum: ['pendente', 'pago', 'parcial', 'reembolsado'],
    default: 'pendente'
  },
  paymentMethod: {
    type: String,
    enum: ['dinheiro', 'cartao', 'transferencia', 'mpesa', 'outro']
  },
  notes: String,
  deliveryAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: { type: String, default: 'Moçambique' }
  }
}, {
  timestamps: true
});

// Auto-generate sale number
saleSchema.pre('save', async function(next) {
  if (this.isNew) {
    const count = await mongoose.model('Sale').countDocuments();
    this.saleNumber = `VND-${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

// Indexes for performance
saleSchema.index({ saleNumber: 1 });
saleSchema.index({ customer: 1, createdAt: -1 });
saleSchema.index({ employee: 1, createdAt: -1 });
saleSchema.index({ status: 1, paymentStatus: 1 });
saleSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Sale', saleSchema);