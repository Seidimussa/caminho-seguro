
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Users, Target, Globe, Heart, Lightbulb, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  const teamMembers = [
    {
      name: "MUSSA SEIDI",
      role: "CEO / Gestor de Projeto",
      bio: "Liderança, visão estratégica e gestão de parcerias. Apaixonado por tecnologia assistiva e inclusão social.",
      photo: "https://res.cloudinary.com/djjkgp7yl/image/upload/v1758113133/mussa01_wseqkp_b_rgb_C2C9D6_iqbcrs.png"
    },
    {
      name: "JOSÉ",
      role: "Designer",
      bio: "Responsável pelo design industrial do produto, ergonomia e experiência do utilizador (UX).",
      photo: "https://res.cloudinary.com/djjkgp7yl/image/upload/v1758112885/jose_wqjwfo.jpg"
    },
    {
      name: "GABRIELA",
      role: "Comunicação e Marketing",
      bio: "Gestão da marca, relações públicas e estratégia de entrada no mercado.",
      photo: "https://res.cloudinary.com/djjkgp7yl/image/upload/v1758112885/Gabriela_uveksn.jpg"
    },
    {
      name: "ESMAEL",
      role: "Equipa de Engenharia",
      bio: "Multidisciplinar responsável pelo desenvolvimento de hardware, software embarcado, plataforma na nuvem e aplicação móvel.",
      photo: "https://res.cloudinary.com/djjkgp7yl/image/upload/v1758112885/Esmael_k2hn1c.jpg"
    },
    {
      name: "VLADIMIR",
      role: "Equipa de Engenharia",
      bio: "Multidisciplinar responsável pelo desenvolvimento de hardware, software embarcado, plataforma na nuvem e aplicação móvel.",
      photo: "https://res.cloudinary.com/djjkgp7yl/image/upload/v1758112885/vladimir_jiew7x.jpg"
    },
    {
      name: "NAZARÉ",
      role: "Equipa de Engenharia / Comunicação",
      bio: "Multidisciplinar responsável pelo desenvolvimento de hardware, software embarcado, plataforma na nuvem e aplicação móvel.",
      photo: "https://res.cloudinary.com/djjkgp7yl/image/upload/v1758112885/Nazaree_h64tte.png"
    },
    {
      name: "ERBIO",
      role: "Equipa de Engenharia",
      bio: "Multidisciplinar responsável pelo desenvolvimento de hardware, software embarcado, plataforma na nuvem e aplicação móvel.",
      photo: "https://res.cloudinary.com/djjkgp7yl/image/upload/v1758112885/Erbio_lkc0iy.jpg"
    }
  ];

  const values = [
    { icon: Lightbulb, title: 'Inovação', description: 'Buscamos constantemente novas soluções para desafios de acessibilidade.' },
    { icon: Heart, title: 'Empatia', description: 'Colocamos as necessidades dos nossos usuários no centro de tudo o que fazemos.' },
    { icon: Shield, title: 'Confiança', description: 'Construímos produtos seguros e confiáveis que melhoram a vida das pessoas.' },
    { icon: Users, title: 'Inclusão', description: 'Acreditamos em um mundo onde todos têm as mesmas oportunidades.' }
  ];

  return (
    <>
      <Helmet>
        <title>Sobre Nós | Projeto Caminho Seguro</title>
        <meta name="description" content="Conheça a missão, visão e a equipe por trás do Projeto Caminho Seguro, dedicado a revolucionar a mobilidade para deficientes visuais." />
        <meta property="og:title" content="Sobre Nós | Projeto Caminho Seguro" />
        <meta property="og:description" content="Conheça a missão, visão e a equipe por trás do Projeto Caminho Seguro." />
      </Helmet>

      <div className="bg-background">
        <header className="py-24 sm:py-32 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-base font-semibold text-primary">Nossa História</p>
              <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Inovando para um Mundo Mais Acessível
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600 max-w-3xl mx-auto">
                O Projeto Caminho Seguro nasceu de um desejo profundo de usar a tecnologia para quebrar barreiras e promover a independência de pessoas com deficiência visual.
              </p>
            </motion.div>
          </div>
        </header>

        <div className="relative isolate overflow-hidden py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="max-w-xl lg:max-w-lg"
              >
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Nossa Missão</h2>
                <p className="mt-4 text-xl text-gray-600">
                  Capacitar pessoas com deficiência visual a navegar pelo mundo com confiança, segurança e independência, através do desenvolvimento e comercialização de tecnologia assistiva de ponta.
                </p>
                <div className="mt-6 flex max-w-md gap-x-4">
                  <img alt="Uma pessoa com deficiência visual usando a bengala inteligente para atravessar uma rua movimentada com segurança." class="w-full h-auto rounded-lg shadow-lg" src="https://images.unsplash.com/photo-1625708974337-fb8fe9af5711" />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2"
              >
                <div className="flex flex-col items-start">
                  <div className="rounded-md bg-white/5 p-2 ring-1 ring-primary/20">
                    <Target className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <div className="mt-4 font-semibold text-gray-900">Nossa Visão</div>
                  <div className="mt-2 leading-7 text-gray-600">
                    Ser a referência global em soluções de mobilidade para deficientes visuais, criando um futuro onde a deficiência não seja um obstáculo para a liberdade.
                  </div>
                </div>
                <div className="flex flex-col items-start">
                  <div className="rounded-md bg-white/5 p-2 ring-1 ring-primary/20">
                    <Globe className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <div className="mt-4 font-semibold text-gray-900">Nosso Alcance</div>
                  <div className="mt-2 leading-7 text-gray-600">
                    Estamos comprometidos em tornar nossa tecnologia acessível em todo o mundo, com foco especial em comunidades na África e em países em desenvolvimento.
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>


        <section className="py-20 sm:py-28 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Nossos Valores</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Os princípios que guiam cada passo que damos.</p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{value.title}</h3>
                  <p className="mt-2 text-gray-600">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-28 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Conheça a Nossa <span className="text-primary">Equipa</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                As mentes e os corações dedicados a tornar o Caminho Seguro uma realidade.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative p-8 text-center">
                    <div className="relative mb-6">
                      <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl scale-110 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                      <img 
                        className="relative mx-auto h-32 w-32 rounded-full object-cover border-4 border-white shadow-lg group-hover:border-primary/20 transition-all duration-300" 
                        src={member.photo} 
                        alt={member.name} 
                      />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300">
                      {member.name}
                    </h3>
                    
                    <div className="inline-block px-4 py-2 bg-primary/10 text-primary font-semibold text-sm rounded-full mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      {member.role}
                    </div>
                    
                    <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                      {member.bio}
                    </p>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary/60 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-primary">
          <div className="mx-auto max-w-7xl py-16 px-4 sm:py-20 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              <span className="block">Junte-se à nossa missão.</span>
            </h2>
            <p className="mt-4 text-lg leading-6 text-primary-foreground/80">
              Seja como cliente, parceiro ou apoiante, você pode fazer parte desta revolução.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-200">
                <Link to="/produtos">Nossos Produtos</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-blue hover:bg-white/10">
                <Link to="/parceiros">Seja um Parceiro</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
