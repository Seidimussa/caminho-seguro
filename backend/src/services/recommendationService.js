class RecommendationService {
  static getPersonalizedRecommendations(user) {
    const recommendations = [];

    // B2C Primary Users (Blind/Low Vision)
    if (user.userType === 'individual' && user.profile?.visualImpairment !== 'none') {
      recommendations.push({
        type: 'product',
        title: 'Dispositivo Caminho Seguro Premium',
        description: 'Navegação avançada com feedback tátil e sonoro',
        priority: 'high',
        reason: 'Baseado no seu perfil de deficiência visual'
      });

      if (user.profile.primaryConcerns?.includes('fall-prevention')) {
        recommendations.push({
          type: 'feature',
          title: 'Ativar Detecção de Obstáculos',
          description: 'Prevenção proativa de quedas',
          priority: 'high'
        });
      }
    }

    // B2C Secondary Users (Seniors)
    if (user.profile?.ageGroup === 'senior') {
      recommendations.push({
        type: 'product',
        title: 'Caminho Seguro Sênior',
        description: 'Interface simplificada com alertas de emergência',
        priority: 'medium',
        reason: 'Otimizado para usuários sêniores'
      });
    }

    // B2B/B2G Institutional
    if (user.userType === 'institutional') {
      recommendations.push({
        type: 'package',
        title: 'Pacote Institucional',
        description: 'Desconto em volume + suporte dedicado',
        priority: 'high',
        reason: 'Preços especiais para instituições'
      });

      recommendations.push({
        type: 'service',
        title: 'Treinamento para Equipe',
        description: 'Capacitação para uso e manutenção',
        priority: 'medium'
      });
    }

    // Caregivers/Family
    if (user.userType === 'caregiver') {
      recommendations.push({
        type: 'feature',
        title: 'App de Monitoramento Familiar',
        description: 'Acompanhe a localização e segurança em tempo real',
        priority: 'high',
        reason: 'Para familiares e cuidadores'
      });

      recommendations.push({
        type: 'support',
        title: 'Guia para Cuidadores',
        description: 'Manual completo de uso e melhores práticas',
        priority: 'medium'
      });
    }

    return recommendations;
  }

  static getTargetedContent(user) {
    const content = [];

    switch (user.userType) {
      case 'individual':
        content.push({
          title: 'Histórias de Sucesso',
          description: 'Veja como outros usuários conquistaram mais autonomia',
          type: 'testimonial'
        });
        break;

      case 'institutional':
        content.push({
          title: 'Relatório de Impacto',
          description: 'Dados sobre eficácia em outras instituições',
          type: 'case-study'
        });
        break;

      case 'caregiver':
        content.push({
          title: 'Dicas para Famílias',
          description: 'Como apoiar a independência com segurança',
          type: 'guide'
        });
        break;
    }

    return content;
  }
}

module.exports = RecommendationService;