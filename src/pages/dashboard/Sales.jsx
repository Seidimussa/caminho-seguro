import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Eye, Edit, Trash2, DollarSign, Calendar, User } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Sales = () => {
  const [user, setUser] = useState(null);
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async (page = 1, search = '') => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20'
      });
      
      if (search) params.append('search', search);

      const response = await fetch(`/api/sales?${params}`, {
        credentials: 'include'
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSales(data.data);
        setPagination(data.pagination);
        
        if (!user) {
          const userResponse = await fetch('/api/dashboard/overview', {
            credentials: 'include'
          });
          const userData = await userResponse.json();
          if (userData.success) {
            setUser(userData.data.userInfo);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching sales:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pendente: { variant: 'secondary', label: 'Pendente' },
      confirmada: { variant: 'default', label: 'Confirmada' },
      enviada: { variant: 'outline', label: 'Enviada' },
      entregue: { variant: 'success', label: 'Entregue' },
      cancelada: { variant: 'destructive', label: 'Cancelada' }
    };
    
    const config = statusConfig[status] || statusConfig.pendente;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-MZ', {
      style: 'currency',
      currency: 'MZN'
    }).format(value || 0);
  };

  const columns = [
    {
      key: 'saleNumber',
      label: 'Número',
      render: (value) => (
        <span className="font-mono text-sm font-medium">{value}</span>
      )
    },
    {
      key: 'customer',
      label: 'Cliente',
      render: (value) => (
        <div className="flex items-center space-x-2">
          <User className="h-4 w-4 text-gray-400" />
          <span>{value?.name || 'N/A'}</span>
        </div>
      )
    },
    {
      key: 'total',
      label: 'Total',
      render: (value) => (
        <span className="font-semibold text-green-600">
          {formatCurrency(value)}
        </span>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => getStatusBadge(value)
    },
    {
      key: 'createdAt',
      label: 'Data',
      render: (value) => (
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-gray-400" />
          <span>{new Date(value).toLocaleDateString('pt-BR')}</span>
        </div>
      )
    }
  ];

  const actions = [
    {
      key: 'view',
      label: 'Visualizar',
      icon: Eye,
      onClick: (sale) => {
        window.location.href = `/dashboard/sales/${sale._id}`;
      }
    }
  ];

  return (
    <DashboardLayout user={user}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Vendas</h1>
            <p className="text-gray-600">Gerencie todas as vendas do sistema</p>
          </div>
          
          {user?.permissions?.sales?.create && (
            <Button onClick={() => window.location.href = '/dashboard/sales/new'}>
              <Plus className="h-4 w-4 mr-2" />
              Nova Venda
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total de Vendas</p>
                <p className="text-2xl font-bold text-gray-900">{pagination.total || 0}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Vendas Hoje</p>
                <p className="text-2xl font-bold text-gray-900">
                  {sales.filter(sale => 
                    new Date(sale.createdAt).toDateString() === new Date().toDateString()
                  ).length}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pendentes</p>
                <p className="text-2xl font-bold text-orange-600">
                  {sales.filter(sale => sale.status === 'pendente').length}
                </p>
              </div>
              <Eye className="h-8 w-8 text-orange-600" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Entregues</p>
                <p className="text-2xl font-bold text-green-600">
                  {sales.filter(sale => sale.status === 'entregue').length}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </motion.div>
        </div>

        <DataTable
          data={sales}
          columns={columns}
          loading={loading}
          pagination={pagination}
          onPageChange={(page) => fetchSales(page)}
          onSearch={(search) => fetchSales(1, search)}
          actions={actions}
          searchPlaceholder="Pesquisar por número, cliente..."
        />
      </div>
    </DashboardLayout>
  );
};

export default Sales;