const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }

  async sendWelcomeEmail(user) {
    const mailOptions = {
      from: process.env.FROM_EMAIL || 'noreply@caminhoseguro.com',
      to: user.email,
      subject: 'Bem-vindo ao Caminho Seguro',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #3B82F6;">Bem-vindo ao Caminho Seguro!</h1>
          <p>Olá ${user.name},</p>
          <p>Sua conta foi criada com sucesso. Você agora pode acessar o sistema com as seguintes credenciais:</p>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Role:</strong> ${user.role}</p>
          </div>
          <a href="${process.env.FRONTEND_URL}/login" style="background: #3B82F6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Acessar Sistema
          </a>
        </div>
      `
    };

    return await this.transporter.sendMail(mailOptions);
  }

  async sendLowStockAlert(product, recipients) {
    const mailOptions = {
      from: process.env.FROM_EMAIL || 'noreply@caminhoseguro.com',
      to: recipients.join(','),
      subject: `Alerta: Estoque Baixo - ${product.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #F59E0B;">⚠️ Alerta de Estoque Baixo</h1>
          <p>O produto <strong>${product.name}</strong> está com estoque baixo.</p>
          <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Produto:</strong> ${product.name}</p>
            <p><strong>SKU:</strong> ${product.sku}</p>
            <p><strong>Estoque Atual:</strong> ${product.stock} unidades</p>
            <p><strong>Estoque Mínimo:</strong> ${product.minStock} unidades</p>
          </div>
          <p>Recomendamos reabastecer o estoque o quanto antes.</p>
        </div>
      `
    };

    return await this.transporter.sendMail(mailOptions);
  }

  async sendSaleNotification(sale, recipients) {
    const mailOptions = {
      from: process.env.FROM_EMAIL || 'noreply@caminhoseguro.com',
      to: recipients.join(','),
      subject: `Nova Venda Realizada - ${sale.saleNumber}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #10B981;">🎉 Nova Venda Realizada</h1>
          <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Número da Venda:</strong> ${sale.saleNumber}</p>
            <p><strong>Cliente:</strong> ${sale.customer?.name}</p>
            <p><strong>Total:</strong> ${sale.total} MZN</p>
            <p><strong>Status:</strong> ${sale.status}</p>
          </div>
        </div>
      `
    };

    return await this.transporter.sendMail(mailOptions);
  }
}

module.exports = new EmailService();