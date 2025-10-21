
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Users, Target, Globe, Heart, Lightbulb, Shield, Linkedin, Twitter, Instagram, Mail, Facebook, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { useImagePreloader } from '@/components/ui/image-preloader';
import { Link } from 'react-router-dom';

const TikTokIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const WhatsAppIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
  </svg>
);

const TelegramIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);

const About = () => {
  const teamMembers = [
    {
      name: "MUSSA SEIDI",
      role: "CEO / Gestor de Projeto",
      bio: "Liderança, visão estratégica e gestão de parcerias. Apaixonado por tecnologia assistiva e inclusão social.",
      photo: "https://res.cloudinary.com/djjkgp7yl/image/upload/v1758113133/mussa01_wseqkp_b_rgb_C2C9D6_iqbcrs.png",
      social: {
        linkedin: "https://www.linkedin.com/in/mussa-seidi-645876223",
        facebook: "https://facebook.com/mussa.seide",
        github: "https://github.com/seidimussa",
        whatsapp: "https://wa.me/245955785768",
        email: "mailto:sedja2015@gmail.com"
        
      }
    },
    {
      name: "JOSÉ",
      role: "Designer",
      bio: "Responsável pelo design industrial do produto, ergonomia e experiência do utilizador (UX).",
      photo: "https://res.cloudinary.com/djjkgp7yl/image/upload/v1758112885/jose_wqjwfo.jpg",
      social: {
        linkedin: "https://linkedin.com/in/jose-designer",
        instagram: "https://instagram.com/jose_design",
        facebook: "https://facebook.com/jose.designer",
        tiktok: "https://tiktok.com/@jose_design"
      }
    },
    {
      name: "GABRIELA",
      role: "Comunicação e Marketing",
      bio: "Gestão da marca, relações públicas e estratégia de entrada no mercado.",
      photo: "https://res.cloudinary.com/djjkgp7yl/image/upload/v1758112885/Gabriela_uveksn.jpg",
      social: {
        linkedin: "https://linkedin.com/in/gabriela-marketing",
        twitter: "https://twitter.com/gabriela_mkt",
        facebook: "https://facebook.com/gabriela.marketing",
        telegram: "https://t.me/gabriela_mkt"
      }
    },
    {
      name: "ESMAEL",
      role: "Equipa de Engenharia",
      bio: "Multidisciplinar responsável pelo desenvolvimento de hardware, software embarcado, plataforma na nuvem e aplicação móvel.",
      photo: "https://res.cloudinary.com/djjkgp7yl/image/upload/v1758112885/Esmael_k2hn1c.jpg",
      social: {
        linkedin: "https://linkedin.com/in/esmael-eng",
        github: "https://github.com/esmael-dev",
        email: "mailto:esmael@caminhoseguro.com"
      }
    },
    {
      name: "VLADIMIR",
      role: "Equipa de Engenharia",
      bio: "Multidisciplinar responsável pelo desenvolvimento de hardware, software embarcado, plataforma na nuvem e aplicação móvel.",
      photo: "https://res.cloudinary.com/djjkgp7yl/image/upload/v1758112885/vladimir_jiew7x.jpg",
      social: {
        linkedin: "https://linkedin.com/in/vladimir-eng",
        twitter: "https://twitter.com/vladimir_dev",
        github: "https://github.com/vladimir-dev"
      }
    },
    {
      name: "NAZARÉ",
      role: "Equipa de Engenharia / Comunicação",
      bio: "Multidisciplinar responsável pelo desenvolvimento de hardware, software embarcado, plataforma na nuvem e aplicação móvel.",
      photo: "https://res.cloudinary.com/djjkgp7yl/image/upload/v1758112885/Nazaree_h64tte.png",
      social: {
        linkedin: "https://linkedin.com/in/nazare-eng",
        instagram: "https://instagram.com/nazare_tech"
      }
    },
    {
      name: "ERBIO",
      role: "Equipa de Engenharia",
      bio: "Multidisciplinar responsável pelo desenvolvimento de hardware, software embarcado, plataforma na nuvem e aplicação móvel.",
      photo: "https://res.cloudinary.com/djjkgp7yl/image/upload/v1758112885/Erbio_lkc0iy.jpg",
      social: {
        linkedin: "https://linkedin.com/in/erbio-eng",
        email: "mailto:erbio@caminhoseguro.com"
      }
    }
  ];

  const values = [
    { icon: Lightbulb, title: 'Inovação', description: 'Buscamos constantemente novas soluções para desafios de acessibilidade.' },
    { icon: Heart, title: 'Empatia', description: 'Colocamos as necessidades dos nossos usuários no centro de tudo o que fazemos.' },
    { icon: Shield, title: 'Confiança', description: 'Construímos produtos seguros e confiáveis que melhoram a vida das pessoas.' },
    { icon: Users, title: 'Inclusão', description: 'Acreditamos em um mundo onde todos têm as mesmas oportunidades.' }
  ];

  // Preload team member images
  const teamImages = teamMembers.map(member => member.photo);
  useImagePreloader(teamImages, true);

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
                  <OptimizedImage 
                    src="https://images.unsplash.com/photo-1625708974337-fb8fe9af5711"
                    alt="Uma pessoa com deficiência visual usando a bengala inteligente para atravessar uma rua movimentada com segurança."
                    className="w-full rounded-lg shadow-lg"
                    quality="85"
                    placeholder="blur"
                  />
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
                      <OptimizedImage 
                        src={member.photo}
                        alt={member.name}
                        width={128}
                        height={128}
                        className="relative mx-auto rounded-full border-4 border-white shadow-lg group-hover:border-primary/20 transition-all duration-300"
                        quality="80"
                        placeholder="blur"
                      />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300">
                      {member.name}
                    </h3>
                    
                    <div className="inline-block px-4 py-2 bg-primary/10 text-primary font-semibold text-sm rounded-full mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      {member.role}
                    </div>
                    
                    <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300 mb-6">
                      {member.bio}
                    </p>
                    
                    <div className="flex justify-center space-x-3">
                      {member.social.linkedin && (
                        <a 
                          href={member.social.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-gray-100 hover:bg-blue-600 text-gray-600 hover:text-white transition-all duration-300 transform hover:scale-110"
                        >
                          <Linkedin className="h-4 w-4" />
                        </a>
                      )}
                      {member.social.twitter && (
                        <a 
                          href={member.social.twitter} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-gray-100 hover:bg-blue-400 text-gray-600 hover:text-white transition-all duration-300 transform hover:scale-110"
                        >
                          <Twitter className="h-4 w-4" />
                        </a>
                      )}
                      {member.social.instagram && (
                        <a 
                          href={member.social.instagram} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-gray-100 hover:bg-pink-500 text-gray-600 hover:text-white transition-all duration-300 transform hover:scale-110"
                        >
                          <Instagram className="h-4 w-4" />
                        </a>
                      )}
                      {member.social.facebook && (
                        <a 
                          href={member.social.facebook} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-gray-100 hover:bg-blue-700 text-gray-600 hover:text-white transition-all duration-300 transform hover:scale-110"
                        >
                          <Facebook className="h-4 w-4" />
                        </a>
                      )}
                      {member.social.github && (
                        <a 
                          href={member.social.github} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-gray-100 hover:bg-gray-800 text-gray-600 hover:text-white transition-all duration-300 transform hover:scale-110"
                        >
                          <Github className="h-4 w-4" />
                        </a>
                      )}
                      {member.social.tiktok && (
                        <a 
                          href={member.social.tiktok} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-gray-100 hover:bg-black text-gray-600 hover:text-white transition-all duration-300 transform hover:scale-110"
                        >
                          <TikTokIcon className="h-4 w-4" />
                        </a>
                      )}
                      {member.social.whatsapp && (
                        <a 
                          href={member.social.whatsapp} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-gray-100 hover:bg-green-600 text-gray-600 hover:text-white transition-all duration-300 transform hover:scale-110"
                        >
                          <WhatsAppIcon className="h-4 w-4" />
                        </a>
                      )}
                      {member.social.telegram && (
                        <a 
                          href={member.social.telegram} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-gray-100 hover:bg-blue-500 text-gray-600 hover:text-white transition-all duration-300 transform hover:scale-110"
                        >
                          <TelegramIcon className="h-4 w-4" />
                        </a>
                      )}
                      {member.social.email && (
                        <a 
                          href={member.social.email}
                          className="p-2 rounded-full bg-gray-100 hover:bg-green-500 text-gray-600 hover:text-white transition-all duration-300 transform hover:scale-110"
                        >
                          <Mail className="h-4 w-4" />
                        </a>
                      )}
                    </div>
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
