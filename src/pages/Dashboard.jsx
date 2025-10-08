import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign, 
  ShoppingCart, 
  Users, 
  Package,
  TrendingUp,
  AlertTriangle,
  Eye
} from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { DashboardCard } from '@/components/ui/dashboard-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PersonalizedRecommendations from '@/components/recommendations/PersonalizedRecommendations';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getWelcomeMessage = (user) => {
    if (!user) return 'Bem-vindo!';
    
    switch (user.userType) {
      case 'institutional':
        return `Bem-vinda, ${user.name}!`;
      case 'caregiver':
        return `Olá, ${user.name}!`;
      default:
        return `Bem-vindo, ${user.name}!`;
    }
  };

  const getPersonalizedMessage = (user) => {
    if (!user) return 'Aqui está um resumo das suas atividades hoje.';
    
    switch (user.userType) {
      case 'institutional':
        return 'Gerencie seus dispositivos e acompanhe o impacto na comunidade.';
      case 'caregiver':
        return 'Monitore o progresso e garanta a segurança dos seus entes queridos.';
      default:
        return 'Acompanhe seu progresso rumo à maior autonomia e segurança.';
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/dashboard/overview', {
        credentials: 'include'
      });
      const data = await response.json();
      
      if (data.success) {
        setDashboardData(data.data);
        setUser(data.data.userInfo);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-MZ', {
      style: 'currency',
      currency: 'MZN'
    }).format(value || 0);
  };

  if (loading) {
    return (
      <DashboardLayout user={user}>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout user={user}>
      <div className="space-y-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-primary to-primary/80 rounded-xl p-8 text-white"
        >
          <h1 className="text-3xl font-bold mb-2">
            {getWelcomeMessage(user)}
          </h1>
          <p className="text-primary-foreground/80">
            {getPersonalizedMessage(user)}
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dashboardData?.sales && (
            <DashboardCard
              title="Vendas do Mês"
              value={formatCurrency(dashboardData.sales.monthly.total)}
              change={`${dashboardData.sales.monthly.count} vendas`}
              icon={ShoppingCart}
              changeType="positive"
            />
          )}

          {dashboardData?.revenue && (
            <DashboardCard
              title="Receita Mensal"
              value={formatCurrency(dashboardData.revenue.monthly)}
              change="vs mês anterior"
              icon={DollarSign}
              changeType="positive"
            />
          )}

          {dashboardData?.users && (
            <DashboardCard
              title="Usuários Ativos"
              value={dashboardData.users.active}
              change={`+${dashboardData.users.newThisMonth} este mês`}
              icon={Users}
              changeType="positive"
            />
          )}

          {dashboardData?.products && (
            <DashboardCard
              title="Produtos Ativos"
              value={dashboardData.products.active}
              change={dashboardData.products.lowStock > 0 ? `${dashboardData.products.lowStock} com estoque baixo` : 'Estoque OK'}
              icon={Package}
              changeType={dashboardData.products.lowStock > 0 ? "negative" : "positive"}
            />
          )}
        </div>

        {/* Personalized Recommendations */}
        <PersonalizedRecommendations user={user} />

        {/* Recent Activities & Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="h-5 w-5" />
                <span>Atividades Recentes</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData?.recentActivities?.length > 0 ? (
                  dashboardData.recentActivities.slice(0, 5).map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex-shrink-0">
                        {activity.type === 'sale' && (
                          <ShoppingCart className="h-5 w-5 text-green-600" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.description}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatCurrency(activity.amount)} • {activity.status}
                        </p>
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(activity.date).toLocaleDateString('pt-BR')}
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Eye className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>Nenhuma atividade recente</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Ações Rápidas</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {user?.permissions?.sales?.create && (
                  <Button 
                    className="h-20 flex flex-col items-center justify-center space-y-2"
                    onClick={() => window.location.href = '/dashboard/sales/new'}
                  >
                    <ShoppingCart className="h-6 w-6" />
                    <span className="text-sm">Nova Venda</span>
                  </Button>
                )}

                {user?.permissions?.products?.view && (
                  <Button 
                    variant="outline"
                    className="h-20 flex flex-col items-center justify-center space-y-2"
                    onClick={() => window.location.href = '/dashboard/products'}
                  >
                    <Package className="h-6 w-6" />
                    <span className="text-sm">Produtos</span>
                  </Button>
                )}

                {user?.permissions?.users?.view && (
                  <Button 
                    variant="outline"
                    className="h-20 flex flex-col items-center justify-center space-y-2"
                    onClick={() => window.location.href = '/dashboard/users'}
                  >
                    <Users className="h-6 w-6" />
                    <span className="text-sm">Usuários</span>
                  </Button>
                )}

                {user?.permissions?.reports?.view && (
                  <Button 
                    variant="outline"
                    className="h-20 flex flex-col items-center justify-center space-y-2"
                    onClick={() => window.location.href = '/dashboard/reports'}
                  >
                    <TrendingUp className="h-6 w-6" />
                    <span className="text-sm">Relatórios</span>
                  </Button>
                )}
              </div>

              {/* Alerts */}
              {dashboardData?.products?.lowStock > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-lg"
                >
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                    <span className="text-sm font-medium text-orange-800">
                      {dashboardData.products.lowStock} produtos com estoque baixo
                    </span>
                  </div>
                  <Button 
                    variant="link" 
                    size="sm" 
                    className="text-orange-600 p-0 h-auto mt-2"
                    onClick={() => window.location.href = '/dashboard/products?filter=lowStock'}
                  >
                    Ver produtos →
                  </Button>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;