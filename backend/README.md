# Caminho Seguro Backend

Backend API para o projeto Caminho Seguro com Node.js, Express, MongoDB Atlas e Cloudinary.

## 🚀 Funcionalidades

### ✅ **Implementado:**
- **Autenticação** com JWT e cookies seguros
- **Cache em múltiplas camadas**:
  - Cache no servidor (Node-Cache) para dados do MongoDB
  - Cache do navegador para arquivos estáticos
  - Cache CDN do Cloudinary para imagens otimizadas
- **Gestão de preferências** via cookies
- **Upload e otimização** de imagens via Cloudinary
- **APIs RESTful** para equipe e parceiros
- **Segurança** com Helmet, CORS e Rate Limiting

## 📦 Instalação

```bash
cd backend
npm install
```

## ⚙️ Configuração

1. Copie `.env` e configure:
```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/caminho-seguro
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
JWT_SECRET=your-jwt-secret
```

2. Inicie o servidor:
```bash
npm run dev
```

## 🔄 Cache Strategy

### **Servidor (Node-Cache)**
- Dados da equipe: 1 hora
- Dados de parceiros: 2 horas
- Limpeza automática quando dados mudam

### **Navegador**
- Arquivos estáticos: 1 ano
- Respostas API: 1 dia
- Headers ETag e Cache-Control

### **Cloudinary CDN**
- Imagens otimizadas automaticamente
- URLs com transformações (quality: auto, format: auto)
- Cache global do CDN

## 📡 Endpoints

### **Autenticação**
- `POST /api/auth/register` - Registro
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout

### **Equipe**
- `GET /api/team` - Lista equipe (cached)
- `GET /api/team/:id` - Membro específico (cached)
- `POST /api/team` - Criar membro

### **Parceiros**
- `GET /api/partners` - Lista parceiros agrupados (cached)
- `GET /api/partners/category/:category` - Por categoria (cached)
- `POST /api/partners` - Criar parceiro

### **Mídia**
- `POST /api/media/upload` - Upload para Cloudinary
- `GET /api/media/optimize/:publicId` - URL otimizada
- `DELETE /api/media/:publicId` - Deletar imagem

### **Preferências**
- `GET /api/preferences` - Obter preferências
- `PUT /api/preferences` - Atualizar preferências
- `DELETE /api/preferences` - Reset para padrão

## 🍪 Cookies

- **token**: JWT para autenticação (httpOnly, secure)
- **preferences**: Preferências do usuário (acessível via JS)

## 🔒 Segurança

- Helmet para headers de segurança
- CORS configurado
- Rate limiting (100 req/15min)
- Validação de entrada
- Senhas hasheadas com bcrypt

## 📊 Performance

- Compressão gzip
- Cache em múltiplas camadas
- Imagens otimizadas via Cloudinary
- Índices no MongoDB
- Queries lean() para melhor performance