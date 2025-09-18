
    import React from 'react';
    import { Helmet } from 'react-helmet';
    import { motion } from 'framer-motion';
    import { HeartHandshake as Handshake, ArrowRight } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { Card, CardContent } from '@/components/ui/card';
    import { Link } from 'react-router-dom';

    const Partners = () => {

        const partnerCategories = [
            {
                title: "Financiadores e Investidores",
                description: "Agradecemos aos visionários que acreditam no nosso potencial e investem no futuro da acessibilidade.",
                partners: [
                    { 
                        name: "Fundação Gates", 
                    logo: "https://res.cloudinary.com/djjkgp7yl/image/upload/v1758187032/orange-logo_b2fddi.png",
                        website: "https://www.gatesfoundation.org"
                    },
                    { 
                        name: "União Africana", 
                      logo: "https://res.cloudinary.com/djjkgp7yl/image/upload/v1758187032/orange-logo_b2fddi.png",
                        website: "https://au.int"
                    },
                    { 
                        name: "Banco Mundial", 
                      logo: "https://res.cloudinary.com/djjkgp7yl/image/upload/v1758187032/orange-logo_b2fddi.png",
                        website: "https://www.worldbank.org"
                    },
                    { 
                        name: "Impact Ventures", 
                      logo: "https://res.cloudinary.com/djjkgp7yl/image/upload/v1758187032/orange-logo_b2fddi.png",
                        website: "#"
                    }
                ]
            },
            {
                title: "Parceiros Tecnológicos",
                description: "Colaboramos com líderes da indústria para integrar a melhor tecnologia em nossos produtos.",
                partners: [
                    { 
                        name: "NVIDIA", 
                    logo: "https://res.cloudinary.com/djjkgp7yl/image/upload/v1758187032/orange-logo_b2fddi.png",
                        website: "https://www.nvidia.com"
                    },
                    { 
                        name: "Google Maps Platform", 
                      logo: "https://res.cloudinary.com/djjkgp7yl/image/upload/v1758187032/orange-logo_b2fddi.png",
                        website: "https://developers.google.com/maps"
                    },
                    { 
                        name: "Bosch", 
                      logo: "https://res.cloudinary.com/djjkgp7yl/image/upload/v1758187032/orange-logo_b2fddi.png",
                        website: "https://www.bosch.com"
                    },
                    { 
                        name: "OpenStreetMap", 
                      logo: "https://res.cloudinary.com/djjkgp7yl/image/upload/v1758187032/orange-logo_b2fddi.png",
                        website: "https://www.openstreetmap.org"
                    }
                ]
            },
            {
                title: "Organizações Não-Governamentais",
                description: "Trabalhamos com ONGs para garantir que nossos produtos cheguem a quem mais precisa.",
                partners: [
                    { 
                        name: "Organização Mundial da Saúde", 
                    logo: "https://res.cloudinary.com/djjkgp7yl/image/upload/v1758187032/orange-logo_b2fddi.png",
                        website: "https://www.who.int"
                    },
                    { 
                        name: "Visão Mundial", 
                      logo: "https://res.cloudinary.com/djjkgp7yl/image/upload/v1758187032/orange-logo_b2fddi.png",
                        website: "https://www.worldvision.org"
                    },
                    { 
                        name: "Handicap International", 
                      logo: "https://res.cloudinary.com/djjkgp7yl/image/upload/v1758187032/orange-logo_b2fddi.png",
                        website: "https://www.hi.org"
                    },
                    { 
                        name: "CBM", 
                      logo: "https://res.cloudinary.com/djjkgp7yl/image/upload/v1758187032/orange-logo_b2fddi.png",
                        website: "https://www.cbm.org"
                    }
                ]
            }
        ];

      return (
        <>
          <Helmet>
            <title>Parceiros | Projeto Caminho Seguro</title>
            <meta name="description" content="Conheça os parceiros, financiadores e colaboradores que tornam o Projeto Caminho Seguro uma realidade." />
            <meta property="og:title" content="Parceiros | Projeto Caminho Seguro" />
            <meta property="og:description" content="Conheça os parceiros, financiadores e colaboradores que tornam o Projeto Caminho Seguro uma realidade." />
          </Helmet>

          <div className="bg-background">
            <header className="py-24 sm:py-32 bg-gray-50 text-center">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <Handshake className="mx-auto h-12 w-12 text-primary" />
                  <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                    Juntos Somos Mais Fortes
                  </h1>
                  <p className="mt-6 text-lg leading-8 text-gray-600">
                    Nossa missão só é possível graças à colaboração de uma rede de parceiros dedicados que compartilham da nossa visão de um mundo mais acessível.
                  </p>
                </motion.div>
              </div>
            </header>

            <main className="py-20 sm:py-28">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
                    {partnerCategories.map((category, index) => (
                        <motion.section 
                            key={category.title}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold tracking-tight text-gray-900">{category.title}</h2>
                                <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">{category.description}</p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {category.partners.map((partner, partnerIndex) => (
                                    <motion.div 
                                        key={partner.name}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.4, delay: partnerIndex * 0.1 }}
                                        viewport={{ once: true }}
                                        className="group"
                                    >
                                        <Card className="h-32 hover:shadow-lg transition-all duration-300 border-gray-200 hover:border-primary/30">
                                            <CardContent className="flex items-center justify-center h-full p-6">
                                                <a 
                                                    href={partner.website} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="block w-full h-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300"
                                                >
                                                    <img 
                                                        className="max-h-16 max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300" 
                                                        src={partner.logo} 
                                                        alt={`Logo ${partner.name}`}
                                                        onError={(e) => {
                                                            e.target.src = '/images/placeholder-logo.png';
                                                        }}
                                                    />
                                                </a>
                                            </CardContent>
                                        </Card>
                                        <p className="text-center text-sm text-gray-600 mt-2 group-hover:text-primary transition-colors duration-300">
                                            {partner.name}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.section>
                    ))}
                </div>
            </main>

            <section className="bg-primary">
              <div className="mx-auto max-w-7xl py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-8">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                  >
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                      Torne-se um Parceiro
                    </h2>
                    <p className="mt-4 text-lg text-primary-foreground/80">
                      Tem interesse em colaborar connosco? Quer seja uma empresa, uma ONG ou um investidor, estamos sempre abertos a novas parcerias que possam ampliar nosso impacto.
                    </p>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mt-8 lg:mt-0 flex justify-end"
                  >
                     <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-200">
                        <Link to="/contato">
                          Entre em Contato <ArrowRight className="ml-2 h-5 w-5"/>
                        </Link>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </section>
          </div>
        </>
      );
    };

    export default Partners;
  