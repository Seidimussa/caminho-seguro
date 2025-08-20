
    import React from 'react';
    import { Helmet } from 'react-helmet';
    import { motion } from 'framer-motion';
    import { Leaf, Users, Shield, Recycle, Globe, Heart } from 'lucide-react';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

    const ESG = () => {
      const pillars = [
        {
          icon: Leaf,
          title: "Ambiental",
          description: "Compromisso com um planeta saudável, minimizando nossa pegada ecológica através de materiais sustentáveis e processos conscientes.",
          color: "green",
        },
        {
          icon: Users,
          title: "Social",
          description: "Foco em criar um impacto positivo na sociedade, promovendo a inclusão, a acessibilidade e o bem-estar de todos.",
          color: "blue",
        },
        {
          icon: Shield,
          title: "Governança",
          description: "Operamos com máxima integridade, transparência e ética, garantindo a confiança dos nossos stakeholders.",
          color: "purple",
        },
      ];

      const initiatives = [
        { icon: Recycle, title: "Materiais Reciclados", text: "Nossas bengalas são produzidas com até 70% de polímeros reciclados de alta durabilidade." },
        { icon: Globe, title: "Pegada de Carbono", text: "Compensamos 100% das emissões de carbono da nossa produção através de projetos de reflorestamento na África." },
        { icon: Heart, title: "Doação e Acessibilidade", text: "A cada 100 unidades vendidas, uma é doada para uma pessoa em situação de vulnerabilidade." },
      ];

      return (
        <>
          <Helmet>
            <title>ESG - Ambiental, Social e Governança | Projeto Caminho Seguro</title>
            <meta name="description" content="Nosso compromisso com a sustentabilidade, responsabilidade social e governança ética para um futuro mais inclusivo e verde." />
            <meta property="og:title" content="ESG | Projeto Caminho Seguro" />
            <meta property="og:description" content="Nosso compromisso com um futuro mais inclusivo e verde." />
          </Helmet>

          <div className="bg-background">
            <header className="py-24 sm:py-32 bg-gray-50 text-center">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                    Construindo um Futuro Responsável
                  </h1>
                  <p className="mt-6 text-lg leading-8 text-gray-600">
                    Nosso compromisso ESG (Ambiental, Social e Governança) é o pilar da nossa estratégia e reflete nossa dedicação em criar valor duradouro para o planeta e a sociedade.
                  </p>
                </motion.div>
              </div>
            </header>

            <section className="py-20 sm:py-28">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Nossos Três Pilares</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  {pillars.map((pillar, index) => (
                    <motion.div
                      key={pillar.title}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Card className="text-center h-full card-hover">
                        <CardHeader>
                          <div className={`mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-${pillar.color}-100`}>
                            <pillar.icon className={`h-8 w-8 text-${pillar.color}-600`} />
                          </div>
                          <CardTitle className={`text-2xl text-${pillar.color}-700`}>{pillar.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600">{pillar.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
            
            <section className="py-20 sm:py-28 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                  >
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Nossas Iniciativas em Ação</h2>
                    <p className="mt-4 text-lg text-gray-600">
                      Não ficamos apenas nas palavras. Estas são algumas das ações concretas que tomamos para cumprir nossos compromissos ESG.
                    </p>
                    <div className="mt-8 space-y-6">
                      {initiatives.map((item) => (
                        <div key={item.title} className="flex items-start gap-4">
                          <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
                            <item.icon className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">{item.title}</h3>
                            <p className="text-gray-600">{item.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="flex justify-center"
                  >
                    <img  class="rounded-lg shadow-2xl w-full h-auto max-w-lg object-cover" alt="Mãos segurando um pequeno broto de planta com um fundo de floresta verde." src="https://images.unsplash.com/photo-1699999233472-b1d77b4f71ba" />
                  </motion.div>
                </div>
              </div>
            </section>

            <section className="bg-primary text-white">
              <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Nosso Relatório de Sustentabilidade</h2>
                  <p className="mt-4 text-lg leading-8 text-primary-foreground/80">
                    Para total transparência, publicamos anualmente nosso relatório de impacto ESG.
                  </p>
                  <div className="mt-8">
                    <button onClick={() => alert("🚧 Funcionalidade ainda não implementada!")} className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white hover:bg-gray-100">
                      Baixar Relatório 2024
                    </button>
                  </div>
                </motion.div>
              </div>
            </section>
          </div>
        </>
      );
    };

    export default ESG;
  