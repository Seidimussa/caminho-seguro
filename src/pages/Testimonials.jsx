
    import React from 'react';
    import { Helmet } from 'react-helmet';
    import { motion } from 'framer-motion';
    import { Star, MessageCircle } from 'lucide-react';
    import { Card, CardContent } from '@/components/ui/card';
    import { Button } from '@/components/ui/button';
    import { Link } from 'react-router-dom';

    const Testimonials = () => {
      const testimonials = [
        {
          quote: "A bengala inteligente mudou minha vida. Sinto-me mais seguro e independente para explorar a cidade como nunca antes. A detecção de obstáculos é incrivelmente precisa.",
          name: "João Silva",
          role: "Usuário, Lisboa",
          rating: 5,
          imageDesc: "Retrato de João Silva, um homem de 40 anos sorrindo."
        },
        {
          quote: "Como especialista em acessibilidade, fico impressionada com a tecnologia do Caminho Seguro. É um salto quântico para a autonomia de pessoas com deficiência visual.",
          name: "Maria Oliveira",
          role: "Especialista em Acessibilidade, São Paulo",
          rating: 5,
          imageDesc: "Retrato de Maria Oliveira, uma mulher de 50 anos com óculos."
        },
        {
          quote: "O suporte ao cliente é fantástico. Tive uma dúvida sobre o GPS e a equipe me ajudou de forma rápida e atenciosa. Recomendo a todos!",
          name: "Carlos Pereira",
          role: "Usuário, Luanda",
          rating: 5,
          imageDesc: "Retrato de Carlos Pereira, um jovem de 30 anos."
        },
        {
          quote: "Adquiri a bengala para o meu pai e a diferença na sua confiança é notável. O botão de pânico nos dá uma tranquilidade imensa.",
          name: "Ana Costa",
          role: "Familiar de Usuário, Bissau",
          rating: 5,
          imageDesc: "Retrato de Ana Costa, uma mulher de 45 anos."
        },
        {
          quote: "A integração com o aplicativo móvel é muito intuitiva. Consigo personalizar as rotas e ajustar as configurações facilmente. Um produto realmente bem pensado.",
          name: "Paulo Martins",
          role: "Usuário, Maputo",
          rating: 4,
          imageDesc: "Retrato de Paulo Martins, um homem de 35 anos, em um ambiente externo."
        },
        {
          quote: "Investir no Caminho Seguro foi uma das melhores decisões. Ver o impacto real na vida das pessoas é a maior recompensa.",
          name: "Sofia Fernandes",
          role: "Investidora de Impacto, Praia",
          rating: 5,
          imageDesc: "Retrato de Sofia Fernandes, uma mulher de negócios."
        },
      ];

      return (
        <>
          <Helmet>
            <title>Depoimentos | Projeto Caminho Seguro</title>
            <meta name="description" content="Leia as histórias e opiniões de nossos usuários, parceiros e especialistas sobre o impacto da bengala inteligente Caminho Seguro." />
            <meta property="og:title" content="Depoimentos | Projeto Caminho Seguro" />
            <meta property="og:description" content="Leia as histórias e opiniões de nossos usuários e parceiros." />
          </Helmet>

          <div className="bg-gray-50">
            <header className="py-24 sm:py-32 text-center">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <MessageCircle className="mx-auto h-12 w-12 text-primary" />
                  <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                    Vozes da Nossa Comunidade
                  </h1>
                  <p className="mt-6 text-lg leading-8 text-gray-600">
                    Histórias reais de pessoas cuja independência foi transformada pela nossa tecnologia.
                  </p>
                </motion.div>
              </div>
            </header>

            <main className="py-20 sm:py-28 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {testimonials.map((testimonial, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Card className="h-full flex flex-col card-hover">
                        <CardContent className="p-8 flex-grow flex flex-col">
                          <div className="flex mb-4">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`h-5 w-5 ${testimonial.rating > i ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                            ))}
                          </div>
                          <blockquote className="text-gray-600 italic flex-grow">"{testimonial.quote}"</blockquote>
                          <div className="mt-8 flex items-center">
                            <img  class="h-12 w-12 rounded-full object-cover" alt={`Foto de ${testimonial.name}`} src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                            <div className="ml-4">
                              <p className="font-semibold text-gray-900">{testimonial.name}</p>
                              <p className="text-gray-500 text-sm">{testimonial.role}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </main>

            <section className="py-20 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900">Compartilhe a Sua História</h2>
                    <p className="mt-4 text-lg text-gray-600">
                        A sua experiência pode inspirar outras pessoas a darem o primeiro passo rumo à independência. Adoraríamos ouvir a sua história.
                    </p>
                    <div className="mt-8">
                        <Button asChild size="lg">
                            <Link to="/contato">
                                Envie seu Depoimento
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
          </div>
        </>
      );
    };

    export default Testimonials;
  