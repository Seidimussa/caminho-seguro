import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Database, 
  HardDrive, 
  Cpu, 
  Wifi,
  AlertTriangle,
  CheckCircle,
  RefreshCw
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Button } from './button';
import { Badge } from './badge';

export const SystemMonitor = () => {
  const [systemHealth, setSystemHealth] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(null);

  useEffect(() => {
    fetchSystemData();
    const interval = setInterval(fetchSystemData, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchSystemData = async () => {
    try {
      const [healthRes, metricsRes] = await Promise.all([
        fetch('/api/system/health', { credentials: 'include' }),
        fetch('/api/system/metrics', { credentials: 'include' })
      ]);

      const [healthData, metricsData] = await Promise.all([
        healthRes.json(),
        metricsRes.json()
      ]);

      setSystemHealth(healthData);
      if (metricsData.success) {
        setMetrics(metricsData.data);
      }
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Error fetching system data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatUptime = (seconds) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${days}d ${hours}h ${minutes}m`;
  };

  const getStatusColor = (status) => {
    return status === 'healthy' ? 'text-green-600' : 'text-red-600';
  };

  const getStatusIcon = (status) => {
    return status === 'healthy' ? CheckCircle : AlertTriangle;
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Monitor do Sistema</h2>
          <p className="text-gray-600">
            Status em tempo real do sistema e performance
          </p>
        </div>
        <div className="flex items-center space-x-4">
          {lastUpdate && (
            <span className="text-sm text-gray-500">
              Última atualização: {lastUpdate.toLocaleTimeString('pt-BR')}
            </span>
          )}
          <Button variant="outline" size="sm" onClick={fetchSystemData}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Atualizar
          </Button>
        </div>
      </div>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5" />
            <span>Status Geral</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            {systemHealth && (
              <>
                <div className="flex items-center space-x-2">
                  {(() => {
                    const StatusIcon = getStatusIcon(systemHealth.status);
                    return <StatusIcon className={`h-6 w-6 ${getStatusColor(systemHealth.status)}`} />;
                  })()}
                  <span className={`font-semibold ${getStatusColor(systemHealth.status)}`}>
                    {systemHealth.status === 'healthy' ? 'Saudável' : 'Com Problemas'}
                  </span>
                </div>
                <Badge variant="outline">
                  Uptime: {formatUptime(systemHealth.uptime)}
                </Badge>
                <Badge variant={systemHealth.database.status === 'connected' ? 'success' : 'destructive'}>
                  Database: {systemHealth.database.status}
                </Badge>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Performance */}
        {metrics && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5" />
                  <span>Performance</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Requisições Totais</span>
                    <span className="font-semibold">{metrics.requests}</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Taxa de Erro</span>
                    <span className={`font-semibold ${metrics.errorRate > 5 ? 'text-red-600' : 'text-green-600'}`}>
                      {metrics.errorRate.toFixed(2)}%
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Tempo Médio de Resposta</span>
                    <span className="font-semibold">{metrics.responseTime.average.toFixed(0)}ms</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Memory */}
        {systemHealth && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <HardDrive className="h-5 w-5" />
                  <span>Memória</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Uso do Sistema</span>
                    <span className="font-semibold">
                      {systemHealth.system.memory.percentage.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${systemHealth.system.memory.percentage}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Heap Usado</span>
                    <span className="font-semibold">
                      {formatBytes(systemHealth.system.memory.heap.used)}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Total do Sistema</span>
                    <span className="font-semibold">
                      {formatBytes(systemHealth.system.memory.total)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* CPU */}
        {systemHealth && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Cpu className="h-5 w-5" />
                  <span>CPU</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Cores</span>
                    <span className="font-semibold">{systemHealth.system.cpu.cores}</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Load Average (1m)</span>
                    <span className="font-semibold">
                      {systemHealth.system.cpu.loadAverage[0].toFixed(2)}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Plataforma</span>
                    <span className="font-semibold capitalize">
                      {systemHealth.system.platform}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Database */}
        {systemHealth && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="h-5 w-5" />
                  <span>Database</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Status</span>
                    <Badge variant={systemHealth.database.status === 'connected' ? 'success' : 'destructive'}>
                      {systemHealth.database.status}
                    </Badge>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Conexões</span>
                    <span className="font-semibold">{systemHealth.database.connections}</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Tipo</span>
                    <span className="font-semibold">MongoDB Atlas</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Network */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Wifi className="h-5 w-5" />
                <span>Rede</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm">
                  <span>Status</span>
                  <Badge variant="success">Online</Badge>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span>Ambiente</span>
                  <span className="font-semibold capitalize">
                    {process.env.NODE_ENV || 'development'}
                  </span>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span>Node.js</span>
                  <span className="font-semibold">
                    {systemHealth?.system.nodeVersion}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};