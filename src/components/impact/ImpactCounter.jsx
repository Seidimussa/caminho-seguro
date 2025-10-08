import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Users } from 'lucide-react';

const ImpactCounter = () => {
  const [data, setData] = useState({ totalSold: 0, totalDonated: 0, totalImpact: 0 });

  useEffect(() => {
    fetchImpactData();
    const interval = setInterval(fetchImpactData, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchImpactData = async () => {
    try {
      const response = await fetch('/api/impact/counter');
      const result = await response.json();
      if (result.success) {
        setData(result.data);
      }
    } catch (error) {
      console.error('Error fetching impact data:', error);
    }
  };

  const CounterCard = ({ icon: Icon, value, label, color }) => (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`bg-white rounded-xl p-6 shadow-lg border-l-4 ${color}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <motion.div
            key={value}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            className="text-3xl font-bold text-gray-900"
          >
            {value.toLocaleString()}
          </motion.div>
          <p className="text-gray-600 mt-1">{label}</p>
        </div>
        <Icon className="h-12 w-12 text-gray-400" />
      </div>
    </motion.div>
  );

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Nosso Impacto em Tempo Real
          </h2>
          <p className="text-xl text-gray-600">
            Acompanhe como estamos transformando vidas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <CounterCard
            icon={ShoppingCart}
            value={data.totalSold}
            label="Bengalas Vendidas"
            color="border-blue-500"
          />
          <CounterCard
            icon={Heart}
            value={data.totalDonated}
            label="Bengalas Doadas"
            color="border-red-500"
          />
          <CounterCard
            icon={Users}
            value={data.totalImpact}
            label="Vidas Impactadas"
            color="border-green-500"
          />
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Atualizado em tempo real • Última atualização: {new Date().toLocaleTimeString('pt-BR')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ImpactCounter;