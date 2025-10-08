const mongoose = require('mongoose');

const revenueSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  type: {
    type: String,
    required: true,
    enum: ['venda', 'servico', 'licenca', 'outro']
  },
  source: {
    type: String,
    required: true,
    enum: ['online', 'loja-fisica', 'parceiro', 'direto']
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    default: 'MZN',
    enum: ['MZN', 'USD', 'EUR']
  },
  sale: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sale'
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  description: String,
  category: {
    type: String,
    enum: ['produto', 'servico', 'consultoria', 'treinamento', 'manutencao']
  },
  status: {
    type: String,
    enum: ['confirmada', 'pendente', 'cancelada'],
    default: 'confirmada'
  },
  paymentMethod: {
    type: String,
    enum: ['dinheiro', 'cartao', 'transferencia', 'mpesa', 'outro']
  },
  commission: {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    percentage: {
      type: Number,
      min: 0,
      max: 100
    },
    amount: {
      type: Number,
      min: 0
    }
  }
}, {
  timestamps: true
});

// Indexes for reporting and performance
revenueSchema.index({ date: -1 });
revenueSchema.index({ type: 1, date: -1 });
revenueSchema.index({ source: 1, date: -1 });
revenueSchema.index({ employee: 1, date: -1 });
revenueSchema.index({ customer: 1, date: -1 });
revenueSchema.index({ status: 1, date: -1 });

module.exports = mongoose.model('Revenue', revenueSchema);