import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ProfileOnboarding = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState({
    userType: '',
    visualImpairment: '',
    primaryConcerns: [],
    institutionType: '',
    relationshipType: ''
  });

  const userTypes = [
    {
      id: 'individual',
      title: 'Utilizador Individual',
      description: 'Pessoa com deficiência visual procurando autonomia',
      icon: '👤'
    },
    {
      id: 'institutional',
      title: 'Cliente Institucional',
      description: 'ONG, centro de reabilitação ou entidade governamental',
      icon: '🏢'
    },
    {
      id: 'caregiver',
      title: 'Familiar/Cuidador',
      description: 'Família ou cuidador comprando para outra pessoa',
      icon: '👥'
    }
  ];

  const concerns = [
    { id: 'fall-prevention', label: 'Prevenção de quedas' },
    { id: 'independence', label: 'Autonomia' },
    { id: 'confidence', label: 'Confiança' },
    { id: 'navigation', label: 'Navegação' },
    { id: 'safety', label: 'Segurança' }
  ];

  return (
    <div className="max-w-2xl mx-auto p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card>
          <CardHeader>
            <CardTitle>Qual é o seu perfil?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {userTypes.map((type) => (
              <Button
                key={type.id}
                variant="outline"
                className="w-full h-auto p-6 text-left"
                onClick={() => onComplete({ ...profile, userType: type.id })}
              >
                <div className="flex items-center space-x-4">
                  <span className="text-2xl">{type.icon}</span>
                  <div>
                    <div className="font-semibold">{type.title}</div>
                    <div className="text-sm text-gray-600">{type.description}</div>
                  </div>
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ProfileOnboarding;