import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'; // Assuming you have an Accordion component

const FAQ = () => {
  const generalQuestions = [
    {
      question: "O que é o Caminho Seguro?",
      answer: "O Caminho Seguro é uma bengala inteligente de última geração, concebida especificamente para pessoas com deficiência visual. Integra tecnologias avançadas como deteção de obstáculos, navegação GPS e conectividade com smartphones, oferecendo uma solução de mobilidade mais segura, eficaz e intuitiva do que as bengalas tradicionais."
    },
    {
      question: "Para quem é o Caminho Seguro?",
      answer: "O Caminho Seguro foi desenvolvido para pessoas cegas ou com baixa visão que procuram maior independência e segurança nos seus deslocamentos. É também uma excelente ferramenta para idosos com dificuldades de locomoção ou visão reduzida que podem beneficiar das suas funcionalidades de alerta."
    },
    {
      question: "O que torna o Caminho Seguro diferente das bengalas tradicionais ou outras bengalas eletrónicas?",
      answer: "O Caminho Seguro destaca-se por ser uma solução 'tudo-em-um'. Ao contrário de outras opções que oferecem apenas uma funcionalidade (ex: só deteção ou só navegação), o Caminho Seguro integra deteção avançada de obstáculos, navegação GPS de alta precisão e conectividade inteligente num único dispositivo ergonómico e durável. O nosso foco na usabilidade e na experiência do utilizador, com feedback tátil e sonoro intuitivo, também é um diferencial chave."
    }
  ];

  const featuresAndTechQuestions = [
    {
      question: "Como funciona o sistema de deteção de obstáculos?",
      answer: "O Caminho Seguro utiliza sensores ultrassónicos ou LIDAR de baixa potência para mapear o ambiente à sua frente em diferentes alturas (solo, cintura, cabeça). Ao detetar um obstáculo, a bengala emite alertas através de vibrações de intensidade variável no punho e, opcionalmente, por sinais sonoros via altifalante integrado ou auscultadores Bluetooth."
    },
    {
      question: "Como funciona a navegação GPS? Preciso de um smartphone?",
      answer: "Sim, o Caminho Seguro integra um módulo GPS de alta precisão. Poderá definir o seu destino através da nossa aplicação móvel no seu smartphone (iOS ou Android). A bengala fornecerá instruções de navegação passo a passo através de vibrações direcionais (ex: vibração no lado direito para virar à direita) ou áudio. A aplicação também pode exibir mapas em braille ou com alto contraste e alertar sobre perigos no percurso."
    },
    {
      question: "Que tipo de conectividade inteligente o Caminho Seguro oferece?",
      answer: "O Caminho Seguro possui conectividade Bluetooth 5.0, permitindo a comunicação com a aplicação móvel dedicada. Através da aplicação, pode personalizar a sensibilidade dos sensores, selecionar tipos de alerta, configurar rotas, guardar locais frequentes e receber atualizações de firmware para melhorias contínuas."
    },
    {
      question: "O que é o botão de pânico e como ele funciona?",
      answer: "O Caminho Seguro possui um botão de pânico dedicado no punho. Ao ser pressionado, este botão envia a sua localização em tempo real para contactos de emergência pré-definidos na aplicação, proporcionando uma camada extra de segurança."
    }
  ];

  const designAndUsabilityQuestions = [
    {
      question: "O Caminho Seguro é durável e resistente?",
      answer: "Sim, a estrutura principal do Caminho Seguro é fabricada em fibra de carbono, um material conhecido pela sua leveza e extrema resistência, garantindo durabilidade para o uso diário."
    },
    {
      question: "O design é ergonómico e confortável?",
      answer: "Absolutamente. O punho é feito de material antiderrapante com um design ergonómico que se molda à mão, garantindo conforto mesmo após longos períodos de uso."
    },
    {
      question: "É fácil de transportar?",
      answer: "Sim, o Caminho Seguro possui um design dobrável em múltiplos segmentos, o que facilita o transporte e o armazenamento em malas ou mochilas."
    },
    {
      question: "Qual é a duração da bateria e como se carrega?",
      answer: "A bateria recarregável de iões de lítio do Caminho Seguro oferece uma autonomia mínima de 20 horas de uso contínuo. O carregamento é feito de forma prática e universal via USB-C, e a bengala possui um indicador de nível de bateria no punho."
    },
    {
      question: "É fácil de usar para quem não tem familiaridade com tecnologia?",
      answer: "O Caminho Seguro foi concebido para ser o mais intuitivo possível. Embora as funcionalidades avançadas possam ter uma pequena curva de aprendizagem inicial, fornecemos guias detalhados, tutoriais em vídeo acessíveis e uma equipa de suporte dedicada para ajudar em qualquer etapa."
    }
  ];

  const availabilityAndSupportQuestions = [
    {
      question: "Onde posso comprar o Caminho Seguro?",
      answer: "O Caminho Seguro estará disponível para compra através do nosso website oficial de e-commerce (caminhoseguro.com) e em parceiros selecionados, como lojas especializadas em tecnologia assistiva e centros de reabilitação."
    },
    {
      question: "Qual é o preço do Caminho Seguro?",
      answer: "O preço do Caminho Seguro varia de acordo com o modelo e as funcionalidades. Por favor, visite nossa página de Produtos para ver os preços atualizados e as opções disponíveis."
    },
    {
      question: "O Caminho Seguro recebe atualizações de software?",
      answer: "Sim, o Caminho Seguro recebe atualizações regulares de software (firmware) para melhorar o desempenho, adicionar novas funcionalidades e garantir a segurança. As atualizações são feitas através do aplicativo móvel."
    },
    {
      question: "Que tipo de suporte ao cliente é oferecido?",
      answer: "Oferecemos suporte ao cliente completo via e-mail, telefone e chat online. Nossa equipe está pronta para ajudar com qualquer dúvida técnica, de uso ou de garantia. Consulte nossa página de Contato para mais detalhes."
    },
    {
      question: "O Caminho Seguro tem garantia?",
      answer: "Sim, todos os produtos Caminho Seguro vêm com uma garantia padrão de 2 anos contra defeitos de fabricação. Detalhes completos sobre a garantia podem ser encontrados em nossos Termos de Uso."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Perguntas Frequentes (FAQ) - Projeto Caminho Seguro</title>
        <meta name="description" content="Encontre respostas para as perguntas mais frequentes sobre a bengala inteligente Caminho Seguro, suas funcionalidades, uso e suporte." />
        <meta property="og:title" content="Perguntas Frequentes (FAQ) - Projeto Caminho Seguro" />
        <meta property="og:description" content="Encontre respostas para as perguntas mais frequentes sobre a bengala inteligente Caminho Seguro." />
      </Helmet>

      <div className="bg-gray-50 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 sm:p-12 rounded-2xl shadow-lg"
          >
            <div className="text-center mb-10">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">Perguntas Frequentes (FAQ)</h1>
              <p className="mt-4 text-gray-500">
                Bem-vindo à secção de Perguntas Frequentes do Caminho Seguro! Aqui encontrará respostas para as suas principais questões sobre a nossa bengala inteligente inovadora. Se a sua dúvida não for respondida aqui, por favor, não hesite em contactar a nossa equipa de apoio ao cliente.
              </p>
            </div>

            <div className="space-y-10">
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Geral sobre o Caminho Seguro</h2>
                <Accordion type="single" collapsible className="w-full">
                  {generalQuestions.map((item, index) => (
                    <AccordionItem key={index} value={`general-${index}`}>
                      <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:no-underline">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-700 leading-relaxed">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Funcionalidades e Tecnologia</h2>
                <Accordion type="single" collapsible className="w-full">
                  {featuresAndTechQuestions.map((item, index) => (
                    <AccordionItem key={index} value={`features-${index}`}>
                      <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:no-underline">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-700 leading-relaxed">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Design e Usabilidade</h2>
                <Accordion type="single" collapsible className="w-full">
                  {designAndUsabilityQuestions.map((item, index) => (
                    <AccordionItem key={index} value={`design-${index}`}>
                      <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:no-underline">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-700 leading-relaxed">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Disponibilidade e Suporte</h2>
                <Accordion type="single" collapsible className="w-full">
                  {availabilityAndSupportQuestions.map((item, index) => (
                    <AccordionItem key={index} value={`support-${index}`}>
                      <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:no-underline">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-700 leading-relaxed">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default FAQ;