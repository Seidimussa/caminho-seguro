const { body, param, query, validationResult } = require('express-validator');

// Handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

// User validation rules
const userValidation = {
  create: [
    body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Nome deve ter entre 2-100 caracteres'),
    body('email').isEmail().normalizeEmail().withMessage('Email inválido'),
    body('password').isLength({ min: 6 }).withMessage('Senha deve ter pelo menos 6 caracteres'),
    body('role').isIn(['super-admin', 'admin', 'funcionario', 'cliente']).withMessage('Role inválido'),
    body('department').optional().isIn(['vendas', 'marketing', 'engenharia', 'financeiro', 'rh', 'geral']),
    handleValidationErrors
  ],
  update: [
    param('id').isMongoId().withMessage('ID inválido'),
    body('name').optional().trim().isLength({ min: 2, max: 100 }),
    body('email').optional().isEmail().normalizeEmail(),
    body('role').optional().isIn(['super-admin', 'admin', 'funcionario', 'cliente']),
    handleValidationErrors
  ]
};

// Sale validation rules
const saleValidation = {
  create: [
    body('customer').isMongoId().withMessage('Cliente inválido'),
    body('products').isArray({ min: 1 }).withMessage('Pelo menos um produto é obrigatório'),
    body('products.*.product').isMongoId().withMessage('Produto inválido'),
    body('products.*.quantity').isInt({ min: 1 }).withMessage('Quantidade deve ser maior que 0'),
    body('products.*.unitPrice').isFloat({ min: 0 }).withMessage('Preço unitário inválido'),
    body('subtotal').isFloat({ min: 0 }).withMessage('Subtotal inválido'),
    body('total').isFloat({ min: 0 }).withMessage('Total inválido'),
    handleValidationErrors
  ]
};

// Product validation rules
const productValidation = {
  create: [
    body('name').trim().isLength({ min: 2, max: 200 }).withMessage('Nome do produto inválido'),
    body('description').trim().isLength({ min: 10 }).withMessage('Descrição muito curta'),
    body('sku').trim().isLength({ min: 3, max: 50 }).withMessage('SKU inválido'),
    body('category').isIn(['bengala-inteligente', 'acessorios', 'software', 'servicos']).withMessage('Categoria inválida'),
    body('price').isFloat({ min: 0 }).withMessage('Preço inválido'),
    body('cost').isFloat({ min: 0 }).withMessage('Custo inválido'),
    body('stock').isInt({ min: 0 }).withMessage('Estoque inválido'),
    handleValidationErrors
  ]
};

// Query validation
const queryValidation = {
  pagination: [
    query('page').optional().isInt({ min: 1 }).withMessage('Página inválida'),
    query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limite inválido'),
    handleValidationErrors
  ],
  dateRange: [
    query('startDate').optional().isISO8601().withMessage('Data inicial inválida'),
    query('endDate').optional().isISO8601().withMessage('Data final inválida'),
    handleValidationErrors
  ]
};

module.exports = {
  handleValidationErrors,
  userValidation,
  saleValidation,
  productValidation,
  queryValidation
};