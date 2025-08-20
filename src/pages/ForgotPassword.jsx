
    import React from 'react';
    import { Helmet } from 'react-helmet';
    import { Link } from 'react-router-dom';
    import { Button } from '@/components/ui/button';
    import { useToast } from '@/components/ui/use-toast';

    const ForgotPassword = () => {
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
                    <title>Recuperar Senha - Projeto Caminho Seguro</title>
                    <meta name="description" content="Recupere o acesso à sua conta." />
                </Helmet>
                <div className="container mx-auto px-4 py-12">
                    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
                        <h1 className="text-3xl font-bold text-center mb-6">Recuperar Senha</h1>
                        <p className="text-center text-gray-600 mb-6">Digite seu e-mail e enviaremos um link para redefinir sua senha.</p>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input type="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" required />
                            </div>
                            <Button type="submit" className="w-full">Enviar Link</Button>
                        </form>
                        <p className="mt-4 text-center text-sm text-gray-600">
                            Lembrou a senha? <Link to="/login" className="font-medium text-primary hover:underline">Faça login</Link>
                        </p>
                    </div>
                </div>
            </>
        );
    };

    export default ForgotPassword;
  