const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  preferences: {
    theme: {
      type: String,
      enum: ['light', 'dark'],
      default: 'light'
    },
    language: {
      type: String,
      enum: ['pt', 'en'],
      default: 'pt'
    },
    notifications: {
      type: Boolean,
      default: true
    }
  },
  role: {
    type: String,
    enum: ['super-admin', 'admin', 'funcionario', 'cliente'],
    default: 'cliente'
  },
  permissions: {
    dashboard: { type: Boolean, default: false },
    users: {
      view: { type: Boolean, default: false },
      create: { type: Boolean, default: false },
      edit: { type: Boolean, default: false },
      delete: { type: Boolean, default: false }
    },
    sales: {
      view: { type: Boolean, default: false },
      create: { type: Boolean, default: false },
      edit: { type: Boolean, default: false },
      delete: { type: Boolean, default: false }
    },
    revenue: {
      view: { type: Boolean, default: false },
      create: { type: Boolean, default: false },
      edit: { type: Boolean, default: false },
      delete: { type: Boolean, default: false }
    },
    employees: {
      view: { type: Boolean, default: false },
      create: { type: Boolean, default: false },
      edit: { type: Boolean, default: false },
      delete: { type: Boolean, default: false }
    },
    customers: {
      view: { type: Boolean, default: false },
      create: { type: Boolean, default: false },
      edit: { type: Boolean, default: false },
      delete: { type: Boolean, default: false }
    },
    products: {
      view: { type: Boolean, default: false },
      create: { type: Boolean, default: false },
      edit: { type: Boolean, default: false },
      delete: { type: Boolean, default: false }
    },
    reports: {
      view: { type: Boolean, default: false },
      export: { type: Boolean, default: false }
    },
    settings: {
      view: { type: Boolean, default: false },
      edit: { type: Boolean, default: false }
    }
  },
  department: {
    type: String,
    enum: ['vendas', 'marketing', 'engenharia', 'financeiro', 'rh', 'geral'],
    default: 'geral'
  },
  status: {
    type: String,
    enum: ['ativo', 'inativo', 'suspenso'],
    default: 'ativo'
  },
  lastLogin: Date,
  employeeId: String
}, {
  timestamps: true
});

// Index for better performance
userSchema.index({ email: 1 });
userSchema.index({ role: 1, status: 1 });
userSchema.index({ employeeId: 1 });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Set default permissions based on role
userSchema.pre('save', function(next) {
  if (this.isNew || this.isModified('role')) {
    this.permissions = getDefaultPermissions(this.role);
  }
  next();
});

// Get default permissions by role
function getDefaultPermissions(role) {
  const permissions = {
    dashboard: false,
    users: { view: false, create: false, edit: false, delete: false },
    sales: { view: false, create: false, edit: false, delete: false },
    revenue: { view: false, create: false, edit: false, delete: false },
    employees: { view: false, create: false, edit: false, delete: false },
    customers: { view: false, create: false, edit: false, delete: false },
    products: { view: false, create: false, edit: false, delete: false },
    reports: { view: false, export: false },
    settings: { view: false, edit: false }
  };

  switch (role) {
    case 'super-admin':
      return {
        dashboard: true,
        users: { view: true, create: true, edit: true, delete: true },
        sales: { view: true, create: true, edit: true, delete: true },
        revenue: { view: true, create: true, edit: true, delete: true },
        employees: { view: true, create: true, edit: true, delete: true },
        customers: { view: true, create: true, edit: true, delete: true },
        products: { view: true, create: true, edit: true, delete: true },
        reports: { view: true, export: true },
        settings: { view: true, edit: true }
      };
    case 'admin':
      return {
        dashboard: true,
        users: { view: true, create: true, edit: true, delete: false },
        sales: { view: true, create: true, edit: true, delete: true },
        revenue: { view: true, create: true, edit: true, delete: false },
        employees: { view: true, create: true, edit: true, delete: false },
        customers: { view: true, create: true, edit: true, delete: false },
        products: { view: true, create: true, edit: true, delete: true },
        reports: { view: true, export: true },
        settings: { view: true, edit: false }
      };
    case 'funcionario':
      return {
        dashboard: true,
        users: { view: false, create: false, edit: false, delete: false },
        sales: { view: true, create: true, edit: true, delete: false },
        revenue: { view: false, create: false, edit: false, delete: false },
        employees: { view: false, create: false, edit: false, delete: false },
        customers: { view: true, create: true, edit: true, delete: false },
        products: { view: true, create: false, edit: false, delete: false },
        reports: { view: false, export: false },
        settings: { view: false, edit: false }
      };
    case 'cliente':
    default:
      return permissions;
  }
}

module.exports = mongoose.model('User', userSchema);