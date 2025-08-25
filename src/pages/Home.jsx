
    import React from 'react';
    import { Helmet } from 'react-helmet';
    import { Link } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { ArrowRight, Eye, Navigation, Smartphone, Shield, Award, Users } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

    const Home = () => {
      const features = [
        {
          icon: Eye,
          title: "Detecção Avançada",
          description: "Sensores ultrassônicos e LiDAR para mapeamento em tempo real do ambiente, garantindo segurança máxima."
        },
        {
          icon: Navigation,
          title: "GPS de Alta Precisão",
          description: "Navegação precisa com feedback tátil e sonoro para direções passo a passo, de forma intuitiva."
        },
        {
          icon: Smartphone,
          title: "Conectividade Inteligente",
          description: "Sincronização com app móvel para personalização, criação de rotas e um botão de pânico para emergências."
        }
      ];

      const stats = [
        { number: "10mil+", label: "Vidas Impactadas" },
        { number: "95%", label: "De Satisfação" },
        { number: "24/7", label: "Suporte Dedicado" },
        { number: "50+", label: "Países Atendidos" }
      ];

      const testimonials = [
        {
          quote: "A bengala inteligente mudou minha vida. Sinto-me mais seguro e independente para explorar a cidade como nunca antes.",
          name: "João Silva",
          role: "Usuário do Produto"
        },
        {
          quote: "É incrível ver a tecnologia a serviço da inclusão. O Caminho Seguro é um exemplo de inovação com propósito.",
          name: "Maria Oliveira",
          role: "Especialista em Acessibilidade"
        },
      ]

      return (
        <>
          <Helmet>
            <title>Projeto Caminho Seguro - Inovação em Mobilidade e Inclusão</title>
            <meta name="description" content="Revolucionando a mobilidade e independência de pessoas com deficiência visual com nossa bengala inteligente de última geração." />
            <meta property="og:title" content="Projeto Caminho Seguro - Inovação em Mobilidade e Inclusão" />
            <meta property="og:description" content="Revolucionando a mobilidade e independência de pessoas com deficiência visual com nossa bengala inteligente de última geração." />
          </Helmet>

          <div className="bg-background">
            <section className="relative hero-gradient text-white overflow-hidden">
              <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
                      Um Novo Rumo para a Independência
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-xl">
                      Nossa bengala inteligente combina design, tecnologia e segurança para revolucionar a mobilidade de pessoas com deficiência visual.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        <Link to="/produtos">
                          Conheça o Produto <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                      </Button>
                      <Button asChild size="lg" variant="outline" className="border-white text-blue-600 hover:bg-white hover:text-gray-900">
                        <Link to="/sobre">
                          Nossa Missão
                        </Link>
                      </Button>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative flex justify-center items-center"
                  >
                    <div className="animate-float">
                      <img  alt="Bengala inteligente Caminho Seguro flutuando com um brilho tecnológico" class="w-full max-w-sm md:max-w-md rounded-lg shadow-2xl" src="https://images.unsplash.com/photo-1689116915232-7d8c53431afe" />
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

            <section id="features" className="py-20 lg:py-28 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-center mb-16"
                >
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Tecnologia que Guia e Protege</h2>
                  <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                    Nossa bengala inteligente integra três funcionalidades essenciais em um dispositivo ergonômico e confiável.
                  </p>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.15 }}
                      viewport={{ once: true }}
                    >
                      <Card className="text-center h-full card-hover">
                        <CardHeader>
                          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
                            <feature.icon className="h-8 w-8 text-primary" />
                          </div>
                          <CardTitle className="text-xl">{feature.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600">{feature.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
            
            <section className="py-20 lg:py-28 bg-gray-900 text-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                  >
                    <h2 className="text-3xl lg:text-4xl font-bold">Inovação com Propósito</h2>
                    <p className="mt-4 text-lg text-gray-300">
                      O Caminho Seguro nasceu da necessidade de criar uma solução completa e integrada para a mobilidade. Em um mercado de tecnologia assistiva em expansão, nosso projeto é um roteiro para a inovação e inclusão.
                    </p>
                    <div className="mt-8 space-y-4">
                      <div className="flex items-center gap-4">
                        <Shield className="h-6 w-6 text-primary"/>
                        <p>Tecnologia segura e patenteada</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Award className="h-6 w-6 text-primary"/>
                        <p>Qualidade certificada internacionalmente</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Users className="h-6 w-6 text-primary"/>
                        <p>Suporte e comunidade ativa de usuários</p>
                      </div>
                    </div>
                     <Button asChild size="lg" className="mt-8 bg-primary hover:bg-primary/90">
                        <Link to="/sobre">
                            Saiba Mais Sobre Nós <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                  </motion.div>
                   <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="flex justify-center"
                   >
                     <img  alt="Equipe do projeto Caminho Seguro colaborando em uma sala de reunião moderna" class="rounded-lg shadow-2xl w-full h-auto max-w-lg object-cover" src="https://images.unsplash.com/photo-1630410154191-c19f988b0683" />
                   </motion.div>
                </div>
              </div>
            </section>

            <section className="py-20 lg:py-28 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-center mb-16"
                >
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Vozes da Nossa Comunidade</h2>
                  <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                    O que nossos usuários e parceiros dizem sobre o impacto do Caminho Seguro.
                  </p>
                </motion.div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {testimonials.map((testimonial, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.15 }}
                      viewport={{ once: true }}
                      className="bg-white p-8 rounded-lg shadow-lg"
                    >
                      <blockquote className="text-gray-600 italic text-lg">"{testimonial.quote}"</blockquote>
                      <div className="mt-6 flex items-center">
                        <div className="flex-shrink-0">
                          <img  class="h-12 w-12 rounded-full" alt={`Foto de ${testimonial.name}`} src="https://images.unsplash.com/photo-1550438655-400744b9fefc" />
                        </div>
                        <div className="ml-4">
                          <p className="font-semibold text-gray-900">{testimonial.name}</p>
                          <p className="text-gray-500">{testimonial.role}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                 <div className="text-center mt-12">
                     <Button asChild variant="link" className="text-primary text-lg">
                        <Link to="/depoimentos">Ver todos os depoimentos <ArrowRight className="ml-2 h-5 w-5"/></Link>
                    </Button>
                </div>
              </div>
            </section>

            <section className="py-20 lg:py-24 bg-primary text-primary-foreground">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Pronto para dar o próximo passo?</h2>
                    <p className="mt-4 text-lg leading-6 text-primary-foreground/80">
                      Junte-se a nós nesta jornada de inovação e inclusão.
                    </p>
                    <div className="mt-8 flex justify-center gap-4">
                         <Button asChild size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100">
                             <Link to="/produtos">Ver Produtos</Link>
                         </Button>
                         <Button asChild size="lg" variant="outline" className="border-white text-blue-600 hover:bg-white/10">
                             <Link to="/contato">Fale Conosco</Link>
                         </Button>
                    </div>
                </div>
              </div>
            </section>
          </div>
        </>
      );
    };

    export default Home;
  