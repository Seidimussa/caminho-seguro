import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Heart, Users, Globe, Lightbulb, Target, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Inclusao = () => {
  const principles = [
    {
      icon: Heart,
      title: "Dignidade e Respeito",
      description: "Cada pessoa merece ser tratada com dignidade, independentemente de suas limitações físicas."
    },
    {
      icon: Users,
      title: "Igualdade de Oportunidades",
      description: "Trabalhamos para eliminar barreiras e criar oportunidades iguais para todos."
    },
    {
      icon: Globe,
      title: "Acessibilidade Universal",
      description: "Nossos produtos são projetados para serem acessíveis a pessoas de todas as habilidades."
    },
    {
      icon: Lightbulb,
      title: "Inovação Inclusiva",
      description: "Desenvolvemos tecnologia que considera as necessidades de pessoas com deficiência desde o início."
    }
  ];

  const initiatives = [
    {
      title: "Programa de Doações",
      description: "Para cada 100 bengalas vendidas, doamos 1 para instituições de apoio.",
      impact: "500+ bengalas doadas"
    },
    {
      title: "Treinamento Gratuito",
      description: "Oferecemos workshops sobre mobilidade e tecnologia assistiva.",
      impact: "2000+ pessoas treinadas"
    },
    {
      title: "Parcerias Institucionais",
      description: "Colaboramos com ONGs e centros de reabilitação.",
      impact: "50+ parcerias ativas"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Inclusão e Acessibilidade - Caminho Seguro</title>
        <meta name="description" content="Nosso compromisso com a inclusão e acessibilidade para pessoas com deficiência visual." />
      </Helmet>

      <div className="bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-5xl font-bold mb-6">
                Inclusão é Nossa Missão
              </h1>
              <p className="text-xl mb-8">
                Acreditamos que a tecnologia deve servir a todos, criando um mundo mais inclusivo e acessível para pessoas com deficiência visual.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Principles */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Nossos Princípios
              </h2>
              <p className="text-xl text-gray-600">
                Os valores que guiam cada decisão e inovação
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {principles.map((principle, index) => (
                <motion.div
                  key={principle.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="text-center h-full">
                    <CardHeader>
                      <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4">
                        <principle.icon className="h-8 w-8 text-blue-600" />
                      </div>
                      <CardTitle className="text-xl">{principle.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{principle.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Initiatives */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Nossas Iniciativas
              </h2>
              <p className="text-xl text-gray-600">
                Ações concretas para promover a inclusão
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {initiatives.map((initiative, index) => (
                <motion.div
                  key={initiative.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-xl"
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {initiative.title}
                  </h3>
                  <p className="text-gray-700 mb-6">
                    {initiative.description}
                  </p>
                  <div className="flex items-center text-blue-600 font-semibold">
                    <Award className="h-5 w-5 mr-2" />
                    {initiative.impact}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Commitment */}
        <section className="py-16 bg-gray-900 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-bold mb-6">
                  Nosso Compromisso
                </h2>
                <p className="text-xl mb-8 text-gray-300">
                  "A inclusão não é apenas sobre criar produtos acessíveis, é sobre construir uma sociedade onde cada pessoa pode participar plenamente, contribuir com seus talentos únicos e viver com dignidade e independência."
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-2">100%</div>
                    <p className="text-gray-300">Produtos Acessíveis</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-2">24/7</div>
                    <p className="text-gray-300">Suporte Inclusivo</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-2">∞</div>
                    <p className="text-gray-300">Compromisso Contínuo</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Inclusao;