# Sistema de Permissões - Caminho Seguro

## 🔐 Níveis de Acesso

### **SUPER-ADMIN** 
- **Acesso Total** ao sistema
- Pode criar/editar/deletar qualquer usuário
- Único que pode criar outros super-admins
- Acesso a todas as funcionalidades

### **ADMIN**
- Gerenciamento completo exceto super-admins
- Pode criar admins, funcionários e clientes
- Acesso a relatórios e configurações (somente leitura)
- Não pode deletar usuários

### **FUNCIONÁRIO**
- Acesso ao dashboard básico
- Pode gerenciar vendas e clientes
- Vê apenas seus próprios dados de vendas
- Acesso limitado a produtos (somente leitura)

### **CLIENTE**
- Acesso apenas às suas informações
- Pode atualizar preferências
- Sem acesso ao dashboard administrativo

## 📊 Módulos e Permissões

### **Dashboard**
- `super-admin`: ✅ Todos os dados
- `admin`: ✅ Todos os dados
- `funcionario`: ✅ Dados próprios
- `cliente`: ❌ Sem acesso

### **Usuários**
- `super-admin`: ✅ CRUD completo
- `admin`: ✅ Criar/Editar (não deletar)
- `funcionario`: ❌ Sem acesso
- `cliente`: ❌ Sem acesso

### **Vendas**
- `super-admin`: ✅ CRUD completo
- `admin`: ✅ CRUD completo
- `funcionario`: ✅ Criar/Editar próprias
- `cliente`: ❌ Sem acesso

### **Receitas**
- `super-admin`: ✅ CRUD completo
- `admin`: ✅ Ver/Criar/Editar
- `funcionario`: ❌ Sem acesso
- `cliente`: ❌ Sem acesso

### **Funcionários**
- `super-admin`: ✅ CRUD completo
- `admin`: ✅ Criar/Editar/Ver
- `funcionario`: ❌ Sem acesso
- `cliente`: ❌ Sem acesso

### **Clientes**
- `super-admin`: ✅ CRUD completo
- `admin`: ✅ Criar/Editar/Ver
- `funcionario`: ✅ Criar/Editar/Ver
- `cliente`: ❌ Sem acesso

### **Produtos**
- `super-admin`: ✅ CRUD completo
- `admin`: ✅ CRUD completo
- `funcionario`: ✅ Somente leitura
- `cliente`: ❌ Sem acesso

### **Relatórios**
- `super-admin`: ✅ Ver/Exportar
- `admin`: ✅ Ver/Exportar
- `funcionario`: ❌ Sem acesso
- `cliente`: ❌ Sem acesso

### **Configurações**
- `super-admin`: ✅ Ver/Editar
- `admin`: ✅ Somente leitura
- `funcionario`: ❌ Sem acesso
- `cliente`: ❌ Sem acesso

## 🛡️ Middleware de Segurança

### **authenticate**
Verifica se o usuário está logado e ativo

### **authorize(module, action)**
Verifica permissão específica para módulo/ação

### **requireRole([roles])**
Verifica se o usuário tem um dos roles especificados

### **requireDashboard**
Verifica se o usuário pode acessar o dashboard

## 📝 Exemplos de Uso

```javascript
// Apenas super-admin pode deletar usuários
router.delete('/:id', 
  authenticate,
  requireRole(['super-admin']),
  authorize('users', 'delete'),
  deleteUser
);

// Funcionários podem criar vendas
router.post('/', 
  authenticate,
  authorize('sales', 'create'),
  createSale
);

// Dashboard requer permissão específica
router.get('/overview', 
  authenticate,
  requireDashboard,
  getDashboard
);
```

## 🔄 Fluxo de Autorização

1. **Autenticação**: Verifica token JWT
2. **Status**: Confirma usuário ativo
3. **Permissão**: Verifica permissão específica
4. **Contexto**: Filtra dados baseado no role
5. **Resposta**: Retorna dados permitidos

## 🎯 Casos de Uso

### **Funcionário de Vendas**
- Vê dashboard com suas vendas
- Pode criar/editar suas vendas
- Acessa lista de clientes
- Não vê dados financeiros gerais

### **Administrador**
- Vê todos os dados exceto configurações críticas
- Gerencia usuários (exceto super-admins)
- Acessa relatórios completos
- Não pode deletar dados críticos

### **Super Administrador**
- Controle total do sistema
- Pode modificar qualquer dado
- Acesso a configurações do sistema
- Único que pode criar outros super-admins