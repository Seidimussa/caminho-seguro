import React, { useState } from 'react';
    import { Helmet } from 'react-helmet';
    import { Link, useNavigate } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
    import { useAuth } from '@/contexts/AuthContext';
    import { useToast } from '@/components/ui/use-toast';

    const Login = () => {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [showPassword, setShowPassword] = useState(false);
      const [loading, setLoading] = useState(false);
      const { login } = useAuth();
      const { toast } = useToast();
      const navigate = useNavigate();

      const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const result = await login(email, password);
        
        if (result.success) {
          toast({
            title: "Login bem-sucedido!",
            description: `Bem-vindo(a) de volta, ${result.user.name}.`,
          });
          const targetPath = result.user.role === 'admin' ? '/admin' : (result.user.role === 'funcionario' || result.user.role === 'parceiro' ? '/dashboard' : '/perfil');
          navigate(targetPath);
        } else {
          toast({
            title: "Erro no Login",
            description: result.error || "Credenciais inválidas. Por favor, tente novamente.",
            variant: "destructive",
          });
        }
        
        setLoading(false);
      };

      const handleDemoLogin = (demoEmail, demoPassword) => {
        setEmail(demoEmail);
        setPassword(demoPassword);
      }

      return (
        <>
          <Helmet>
            <title>Login - Projeto Caminho Seguro</title>
            <meta name="description" content="Acesse sua conta no Projeto Caminho Seguro para gerenciar seu perfil e produtos." />
            <meta property="og:title" content="Login - Projeto Caminho Seguro" />
            <meta property="og:description" content="Acesse sua conta no Projeto Caminho Seguro." />
          </Helmet>

          <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="shadow-2xl">
                  <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-bold text-gray-900">Acesse sua Conta</CardTitle>
                    <CardDescription>Bem-vindo(a) de volta ao Caminho Seguro.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="seu@email.com"
                            className="pl-10"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="password">Senha</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Sua senha"
                            className="pl-10 pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm">
                          <Link to="/recuperar-senha" className="font-medium text-primary hover:underline">
                            Esqueceu a senha?
                          </Link>
                        </div>
                      </div>

                      <div>
                        <Button type="submit" className="w-full" disabled={loading}>
                          {loading ? 'Entrando...' : 'Entrar'}
                        </Button>
                      </div>
                    </form>

                    <div className="mt-6">
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-2 bg-white text-gray-500">Ou continue com</span>
                        </div>
                      </div>

                      <div className="mt-6 grid grid-cols-2 gap-3">
                        <div>
                          <Button variant="outline" className="w-full" onClick={() => handleDemoLogin('cliente@caminhoseguro.com', 'cliente123')}>
                            Login Cliente
                          </Button>
                        </div>
                        <div>
                          <Button variant="outline" className="w-full" onClick={() => handleDemoLogin('admin@caminhoseguro.com', 'admin123')}>
                            Login Admin
                          </Button>
                        </div>
                      </div>
                    </div>

                    <p className="mt-6 text-center text-sm text-gray-600">
                      Não tem uma conta?{' '}
                      <Link to="/cadastro" className="font-medium text-primary hover:underline">
                        Cadastre-se
                      </Link>
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </>
      );
    };

    export default Login;