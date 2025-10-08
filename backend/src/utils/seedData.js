const User = require('../models/User');
const Product = require('../models/Product');

const seedUsers = async () => {
  try {
    const superAdmin = await User.findOne({ role: 'super-admin' });
    
    if (!superAdmin) {
      await User.create({
        name: 'Super Administrador',
        email: 'superadmin@caminhoseguro.com',
        password: 'admin123456',
        role: 'super-admin',
        department: 'geral',
        status: 'ativo'
      });
      console.log('Super Admin created');
    }

    const admin = await User.findOne({ email: 'admin@caminhoseguro.com' });
    if (!admin) {
      await User.create({
        name: 'Administrador',
        email: 'admin@caminhoseguro.com',
        password: 'admin123',
        role: 'admin',
        department: 'geral',
        status: 'ativo'
      });
      console.log('Admin created');
    }

    const employee = await User.findOne({ email: 'funcionario@caminhoseguro.com' });
    if (!employee) {
      await User.create({
        name: 'João Funcionário',
        email: 'funcionario@caminhoseguro.com',
        password: 'func123',
        role: 'funcionario',
        department: 'vendas',
        status: 'ativo',
        employeeId: 'EMP001'
      });
      console.log('Employee created');
    }

  } catch (error) {
    console.error('Error seeding users:', error);
  }
};

const seedProducts = async () => {
  try {
    const productCount = await Product.countDocuments();
    
    if (productCount === 0) {
      const products = [
        {
          name: 'Bengala Inteligente Pro',
          description: 'Bengala inteligente com sensores avançados, GPS e conectividade Bluetooth',
          sku: 'BIP-001',
          category: 'bengala-inteligente',
          price: 15000,
          cost: 8000,
          stock: 50,
          minStock: 10,
          status: 'ativo',
          featured: true
        },
        {
          name: 'Aplicativo Mobile Premium',
          description: 'Licença premium do aplicativo com recursos avançados',
          sku: 'AMP-001',
          category: 'software',
          price: 500,
          cost: 50,
          stock: 1000,
          minStock: 100,
          status: 'ativo',
          featured: true
        }
      ];

      await Product.insertMany(products);
      console.log('Sample products created');
    }
  } catch (error) {
    console.error('Error seeding products:', error);
  }
};

const seedDatabase = async () => {
  console.log('Seeding database...');
  await seedUsers();
  await seedProducts();
  console.log('Database seeding completed');
};

module.exports = { seedDatabase };