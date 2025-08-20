
    import React from 'react';
    import { Helmet } from 'react-helmet';
    import { Link } from 'react-router-dom';
    import { Button } from '@/components/ui/button';
    import { useToast } from '@/components/ui/use-toast';

    const Register = () => {
      const { toast } = useToast();
      const handleSubmit = (e) => {
        e.preventDefault();
        toast({
          title: "🚧 Funcionalidade em desenvolvimento!",
          description: "Não se preocupe! Você pode solicitar a implementação no seu próximo pedido! 🚀",
        });
      };

      return (
        <>
          <Helmet>
            <title>Cadastro - Projeto Caminho Seguro</title>
            <meta name="description" content="Crie sua conta para fazer parte do Projeto Caminho Seguro." />
          </Helmet>
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
              <h1 className="text-3xl font-bold text-center mb-6">Criar Conta</h1>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nome</label>
                  <input type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Senha</label>
                  <input type="password" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" required />
                </div>
                <Button type="submit" className="w-full">Cadastrar</Button>
              </form>
              <p className="mt-4 text-center text-sm text-gray-600">
                Já tem uma conta? <Link to="/login" className="font-medium text-primary hover:underline">Faça login</Link>
              </p>
            </div>
          </div>
        </>
      );
    };

    export default Register;
  