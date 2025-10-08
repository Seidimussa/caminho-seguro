import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Download, 
  Calendar,
  DollarSign,
  ShoppingCart,
  Package,
  Users
} from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Chart, ChartContainer } from '@/components/ui/chart';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardCard } from '@/components/ui/dashboard-card';

const Reports = () => {
  const [user, setUser] = useState(null);
  const [salesReport, setSalesReport] = useState(null);
  const [revenueReport, setRevenueReport] = useState(null);
  const [inventoryReport, setInventoryReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const [salesRes, revenueRes, inventoryRes, userRes] = await Promise.all([
        fetch('/api/reports/sales', { credentials: 'include' }),
        fetch('/api/reports/revenue', { credentials: 'include' }),
        fetch('/api/reports/inventory', { credentials: 'include' }),
        fetch('/api/dashboard/overview', { credentials: 'include' })
      ]);

      const [salesData, revenueData, inventoryData, userData] = await Promise.all([
        salesRes.json(),
        revenueRes.json(),
        inventoryRes.json(),
        userRes.json()
      ]);

      if (salesData.success) setSalesReport(salesData.data);
      if (revenueData.success) setRevenueReport(revenueData.data);
      if (inventoryData.success) setInventoryReport(inventoryData.data);
      if (userData.success) setUser(userData.data.userInfo);

    } catch (error) {
      console.error('Error fetching reports:', error);
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

  const prepareSalesChartData = () => {
    if (!salesReport?.salesTrend) return [];
    
    return salesReport.salesTrend.map(item => ({
      name: `${item._id.day || ''}/${item._id.month}`,
      value: item.totalSales,
      orders: item.totalOrders
    }));
  };

  const prepareRevenueChartData = () => {
    if (!revenueReport?.monthlyTrend) return [];
    
    return revenueReport.monthlyTrend.map(item => ({
      name: `${item._id.month}/${item._id.year}`,
      value: item.total
    }));
  };

  const prepareTopProductsData = () => {
    if (!salesReport?.topProducts) return [];
    
    return salesReport.topProducts.map(item => ({
      name: item.product,
      value: item.totalRevenue
    }));
  };

  const prepareRevenueByTypeData = () => {
    if (!revenueReport?.byType) return [];
    
    return revenueReport.byType.map(item => ({
      name: item._id,
      value: item.total
    }));
  };

  if (loading) {
    return (
      <DashboardLayout user={user}>
        <div className="space-y-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg p-6 h-80">
                  <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
                  <div className="h-64 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout user={user}>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Relatórios</h1>
            <p className="text-gray-600">Análise detalhada do desempenho do negócio</p>
          </div>
          
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Exportar Relatório
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <DashboardCard
            title="Vendas Totais"
            value={salesReport?.salesTrend?.reduce((acc, item) => acc + item.totalSales, 0) ? 
              formatCurrency(salesReport.salesTrend.reduce((acc, item) => acc + item.totalSales, 0)) : 
              formatCurrency(0)
            }
            icon={ShoppingCart}
            changeType="positive"
          />
          
          <DashboardCard
            title="Receita Total"
            value={revenueReport?.monthlyTrend?.reduce((acc, item) => acc + item.total, 0) ? 
              formatCurrency(revenueReport.monthlyTrend.reduce((acc, item) => acc + item.total, 0)) : 
              formatCurrency(0)
            }
            icon={DollarSign}
            changeType="positive"
          />
          
          <DashboardCard
            title="Produtos Ativos"
            value={inventoryReport?.stockLevels?.reduce((acc, item) => acc + item.totalProducts, 0) || 0}
            icon={Package}
            changeType="positive"
          />
          
          <DashboardCard
            title="Estoque Baixo"
            value={inventoryReport?.lowStockProducts?.length || 0}
            icon={Package}
            changeType={inventoryReport?.lowStockProducts?.length > 0 ? "negative" : "positive"}
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sales Trend */}
          <ChartContainer title="Tendência de Vendas">
            <Chart
              type="area"
              data={prepareSalesChartData()}
              height={300}
            />
          </ChartContainer>

          {/* Revenue Trend */}
          <ChartContainer title="Tendência de Receita">
            <Chart
              type="line"
              data={prepareRevenueChartData()}
              height={300}
            />
          </ChartContainer>

          {/* Top Products */}
          <ChartContainer title="Produtos Mais Vendidos">
            <Chart
              type="bar"
              data={prepareTopProductsData()}
              height={300}
            />
          </ChartContainer>

          {/* Revenue by Type */}
          <ChartContainer title="Receita por Tipo">
            <Chart
              type="pie"
              data={prepareRevenueByTypeData()}
              height={300}
            />
          </ChartContainer>
        </div>

        {/* Detailed Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Products Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Top 10 Produtos</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {salesReport?.topProducts?.slice(0, 10).map((product, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-primary">
                          {index + 1}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{product.product}</p>
                        <p className="text-sm text-gray-500">
                          {product.totalQuantity} unidades
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">
                        {formatCurrency(product.totalRevenue)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Stock Levels */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Package className="h-5 w-5" />
                <span>Níveis de Estoque</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {inventoryReport?.stockLevels?.map((category, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900 capitalize">
                        {category._id.replace('-', ' ')}
                      </h4>
                      <span className="text-sm text-gray-500">
                        {category.totalProducts} produtos
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Estoque Total</p>
                        <p className="font-semibold">{category.totalStock}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Valor Total</p>
                        <p className="font-semibold text-green-600">
                          {formatCurrency(category.totalValue)}
                        </p>
                      </div>
                    </div>
                    {category.lowStockCount > 0 && (
                      <div className="mt-2 text-sm text-orange-600">
                        ⚠️ {category.lowStockCount} produtos com estoque baixo
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Reports;