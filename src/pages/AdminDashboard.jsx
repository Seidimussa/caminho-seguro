
    import React from 'react';
    import { Helmet } from 'react-helmet';
    import { useAuth } from '@/contexts/AuthContext';

    const AdminDashboard = () => {
        const { user } = useAuth();

        if (!user || user.role !== 'admin') {
            return (
                <div className="container mx-auto px-4 py-12 text-center">
                    <h1 className="text-2xl font-bold">Acesso Negado</h1>
                    <p>Você não tem permissão para visualizar esta página.</p>
                </div>
            );
        }

        return (
            <>
                <Helmet>
                    <title>Painel do Admin - Projeto Caminho Seguro</title>
                    <meta name="description" content="Gerencie a plataforma Caminho Seguro." />
                </Helmet>
                <div className="container mx-auto px-4 py-12">
                    <h1 className="text-4xl font-bold mb-8">Painel do Administrador</h1>
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold">Bem-vindo(a), {user.name}!</h2>
                        <p className="mt-2 text-gray-600">Esta é a área de gerenciamento da plataforma. Aqui você pode gerenciar usuários, produtos e parceiros.</p>
                    </div>
                </div>
            </>
        );
    };

    export default AdminDashboard;
  