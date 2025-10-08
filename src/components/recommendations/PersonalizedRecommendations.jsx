import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Package, Zap, Users, Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const PersonalizedRecommendations = ({ user }) => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    // Mock recommendations based on user type
    const mockRecs = getMockRecommendations(user);
    setRecommendations(mockRecs);
  }, [user]);

  const getMockRecommendations = (user) => {
    if (!user) return [];

    switch (user.userType) {
      case 'institutional':
        return [
          {
            type: 'package',
            title: 'Pacote Institucional',
            description: 'Desconto em volume + suporte dedicado',
            priority: 'high'
          }
        ];
      case 'caregiver':
        return [
          {
            type: 'feature',
            title: 'App de Monitoramento',
            description: 'Acompanhe em tempo real',
            priority: 'high'
          }
        ];
      default:
        return [
          {
            type: 'product',
            title: 'Dispositivo Premium',
            description: 'Navegação avançada',
            priority: 'high'
          }
        ];
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'product': return Package;
      case 'feature': return Zap;
      case 'service': return Users;
      default: return Star;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Star className="h-5 w-5" />
          <span>Recomendações para Você</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((rec, index) => {
            const Icon = getIcon(rec.type);
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-lg border bg-blue-50"
              >
                <div className="flex items-start space-x-3">
                  <Icon className="h-5 w-5 mt-1" />
                  <div className="flex-1">
                    <h4 className="font-semibold">{rec.title}</h4>
                    <p className="text-sm text-gray-600">{rec.description}</p>
                  </div>
                  <Button size="sm" variant="outline">Ver mais</Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalizedRecommendations;