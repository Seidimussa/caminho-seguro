import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin, Shield } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: '#', name: 'Facebook' },
    { icon: Twitter, href: '#', name: 'Twitter' },
    { icon: Instagram, href: '#', name: 'Instagram' },
    { icon: Linkedin, href: '#', name: 'LinkedIn' },
    { icon: Youtube, href: '#', name: 'YouTube' },
  ];

  const quickLinks = [
    { name: 'Sobre Nós', path: '/sobre' },
    { name: 'Produtos', path: '/produtos' },
    { name: 'ESG', path: '/esg' },
    { name: 'Depoimentos', path: '/depoimentos' },
    { name: 'Parceiros', path: '/parceiros' },
  ];
  
  const supportLinks = [
    { name: 'Contato', path: '/contato' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Política de Privacidade', path: '/politica-de-privacidade' },
    { name: 'Termos de Uso', path: '/termos-de-uso' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-primary"/>
              <span className="text-2xl font-bold">Caminho Seguro</span>
            </Link>
            <p className="text-gray-400 text-sm">
              Revolucionando a mobilidade e independência para pessoas com deficiência visual.
            </p>
            <div className="flex space-x-4 pt-2">
              {socialLinks.map((social) => (
                <a key={social.name} href={social.href} className="text-gray-400 hover:text-primary transition-colors">
                  <social.icon className="h-5 w-5" />
                  <span className="sr-only">{social.name}</span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="font-semibold text-lg mb-4">Links Rápidos</p>
            <ul className="space-y-3">
              {quickLinks.map(link => (
                <li key={link.name}>
                  <Link to={link.path} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-semibold text-lg mb-4">Suporte</p>
            <ul className="space-y-3">
              {supportLinks.map(link => (
                 <li key={link.name}>
                   <Link to={link.path} className="text-gray-400 hover:text-white transition-colors">
                     {link.name}
                   </Link>
                 </li>
              ))}
            </ul>
          </div>
          
          <div>
            <p className="font-semibold text-lg mb-4">Contato</p>
            <div className="space-y-4">
               <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
                <a href="mailto:projetocaminhoseguro@gmail.com" className="text-gray-400 hover:text-white text-sm">projetocaminhoseguro@gmail.com</a>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
                <span className="text-gray-400 text-sm">+245 95 578 57 68  <br />  +245 95 699 89 15</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
                <span className="text-gray-400 text-sm"> ODC - Bissau, Guiné-Bissau</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Projeto Caminho Seguro. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;