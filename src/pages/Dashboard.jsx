
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { BarChart3, Users, Package, TrendingUp, Calendar, Bell, FileText, Settings } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: "Vendas do Mês",
      value: "€45,231",
      change: "+12.5%",
      icon: TrendingUp,
      color: "text-green-600"
    },
    {
      title: "Novos Clientes",
      value: "234",
      change: "+8.2%",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Produtos Vendidos",
      value: "1,429",
      change: "+15.3%",
      icon: Package,
      color: "text-purple-600"
    },
    {
      title: "Taxa de Conversão",
      value: "3.2%",
      change: "+2.1%",
      icon: BarChart3,
      color: "text-orange-600"
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: "sale",
      description: "Nova venda: Bengala Inteligente Pro",
      time: "2 horas atrás",
      amount: "€899.99"
    },
    {
      id: 2,
      type: "customer",
      description: "Novo cliente cadastrado: Maria Silva",
      time: "4 horas atrás",
      amount: null
    },
    {
      id: 3,
      type: "support",
      description: "Ticket de suporte resolvido #1234",
      time: "6 horas atrás",
      amount: null
    },
    {
      id: 4,
      type: "sale",
      description: "Nova venda: Kit Acessórios Premium",
      time: "8 horas atrás",
      amount: "€199.99"
    }
  ];

  const quickActions = [
    {
      title: "Gerenciar Produtos",
      description: "Adicionar, editar ou remover produtos",
      icon: Package,
      action: () => toast({
        title: "🚧 Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀"
      })
    },
    {
      title: "Relatórios",
      description: "Visualizar relatórios de vendas e performance",
      icon: FileText,
      action: () => toast({
        title: "🚧 Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀"
      })
    },
    {
      title: "Configurações",
      description: "Ajustar configurações da conta",
      icon: Settings,
      action: () => toast({
        title: "🚧 Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀"
      })
    },
    {
      title: "Suporte",
      description: "Acessar central de ajuda e suporte",
      icon: Bell,
      action: () => toast({
        title: "🚧 Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀"
      })
    }
  ];

  if (!user || (user.role !== 'funcionario' && user.role !== 'parceiro')) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Acesso Negado
          </h2>
          <p className="text-gray-600">
            Você não tem permissão para acessar esta página.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Dashboard - Projeto Caminho Seguro</title>
        <meta name="description" content="Dashboard para funcionários e parceiros do Projeto Caminho Seguro. Gerencie vendas, clientes e relatórios." />
        <meta property="og:title" content="Dashboard - Projeto Caminho Seguro" />
        <meta property="og:description" content="Dashboard para funcionários e parceiros do Projeto Caminho Seguro. Gerencie vendas, clientes e relatórios." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                  Dashboard
                </h1>
                <p className="text-gray-600 mt-2">
                  Bem-vindo de volta, {user.name}! Aqui está um resumo das suas atividades.
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-gray-400" />
                <span className="text-gray-600">
                  {new Date().toLocaleDateString('pt-BR', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <Card className="card-hover">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">
                            {stat.title}
                          </p>
                          <p className="text-2xl font-bold text-gray-900">
                            {stat.value}
                          </p>
                          <p className={`text-sm ${stat.color}`}>
                            {stat.change} vs mês anterior
                          </p>
                        </div>
                        <div className={`p-3 rounded-full bg-gray-100`}>
                          <stat.icon className={`h-6 w-6 ${stat.color}`} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Activities */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Atividades Recentes</CardTitle>
                    <CardDescription>
                      Últimas atividades da sua conta
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivities.map((activity) => (
                        <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              {activity.description}
                            </p>
                            <p className="text-xs text-gray-500">
                              {activity.time}
                            </p>
                          </div>
                          {activity.amount && (
                            <span className="text-sm font-semibold text-green-600">
                              {activity.amount}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Ações Rápidas</CardTitle>
                    <CardDescription>
                      Acesso rápido às funcionalidades principais
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {quickActions.map((action, index) => (
                        <Button
                          key={action.title}
                          variant="outline"
                          className="h-auto p-4 flex flex-col items-start space-y-2"
                          onClick={action.action}
                        >
                          <action.icon className="h-5 w-5 text-gray-600" />
                          <div className="text-left">
                            <p className="font-medium text-gray-900">
                              {action.title}
                            </p>
                            <p className="text-xs text-gray-500">
                              {action.description}
                            </p>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Performance Chart Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Performance de Vendas</CardTitle>
                  <CardDescription>
                    Gráfico de vendas dos últimos 6 meses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">
                        Gráfico de performance será implementado em breve
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
