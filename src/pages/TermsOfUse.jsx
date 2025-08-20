import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';

const TermsOfUse = () => {
  const lastUpdatedDate = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <>
      <Helmet>
        <title>Termos de Uso - Projeto Caminho Seguro</title>
        <meta name="description" content="Leia os Termos de Uso do Projeto Caminho Seguro para entender seus direitos e responsabilidades ao utilizar nossos serviços." />
        <meta property="og:title" content="Termos de Uso - Projeto Caminho Seguro" />
        <meta property="og:description" content="Leia os Termos de Uso do Projeto Caminho Seguro para entender seus direitos e responsabilidades." />
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
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">Termos de Uso</h1>
              <p className="mt-4 text-gray-500">Última atualização: {lastUpdatedDate}</p>
            </div>

            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                Bem-vindo ao Caminho Seguro. Ao utilizar a nossa bengala inteligente e os serviços associados (o "Serviço"), você concorda com estes Termos de Uso. Por favor, leia-os com atenção.
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. O Nosso Compromisso ESG (Ambiental, Social, Governança)</h2>
                <p>
                  Estes Termos refletem os nossos valores fundamentais:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li><strong>Ambiental:</strong> Comprometemo-nos com um planeta saudável. A bengala "Caminho Seguro" foi projetada para ser durável e os seus componentes foram selecionados para minimizar a nossa pegada ecológica. Encorajamo-lo a reciclar o dispositivo de forma responsável no final da sua vida útil, de acordo com as normas locais para lixo eletrónico.</li>
                  <li><strong>Social:</strong> O nosso foco é criar um impacto positivo na sociedade. O nosso Serviço foi concebido para promover a inclusão, a acessibilidade e o seu bem-estar.</li>
                  <li><strong>Governança:</strong> Operamos com máxima integridade, transparência e ética. Estes Termos foram escritos para serem claros e justos, garantindo a sua confiança.</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Descrição do Serviço</h2>
                <p>
                  O "Caminho Seguro" é uma ferramenta de tecnologia assistiva concebida para aumentar a segurança e a independência de pessoas com deficiência visual. As suas funcionalidades incluem deteção de obstáculos, navegação GPS e um sistema de alerta de emergência. O Serviço é uma ajuda, não um substituto para a sua orientação, mobilidade e julgamento pessoal.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. As Suas Responsabilidades como Utilizador</h2>
                <p>
                  Para garantir a sua segurança e o bom funcionamento do dispositivo, você concorda em:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>Manter o dispositivo carregado. A autonomia da bateria depende do uso.</li>
                  <li>Manter o software do dispositivo atualizado para garantir o acesso às últimas melhorias de segurança e funcionalidades.</li>
                  <li>Usar o dispositivo de acordo com as nossas instruções e guias.</li>
                  <li>Compreender que as condições ambientais (ex: chuva muito forte, nevoeiro denso) podem afetar a precisão dos sensores.</li>
                  <li>Ser o único responsável pela sua segurança ao navegar no mundo. A bengala é uma ferramenta de apoio.</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Função de Emergência (SOS)</h2>
                <p>
                  A função SOS depende de uma conexão de rede 4G ativa e da disponibilidade dos seus contactos de emergência. Não garantimos que um alerta será sempre entregue ou respondido. Esta função é um auxiliar e não substitui os serviços de emergência locais (112, 190, etc.).
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Propriedade Intelectual</h2>
                <p>
                  Todo o software, design e tecnologia do Serviço são propriedade da Caminho Seguro. Concedemos-lhe uma licença limitada, não exclusiva e intransferível para usar o software integrado no seu dispositivo.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Limitação de Responsabilidade e Isenção de Garantia</h2>
                <p>
                  O Serviço é fornecido "tal como está". Embora nos esforcemos para oferecer um produto da mais alta qualidade, na máxima extensão permitida por lei, a Caminho Seguro não será responsável por quaisquer danos diretos ou indiretos, acidentes, lesões ou perdas resultantes do uso ou da incapacidade de usar o Serviço. A sua segurança continua a ser a sua responsabilidade.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Alterações aos Termos</h2>
                <p>
                  Podemos modificar estes Termos. A versão mais recente estará sempre disponível no nosso website. O uso contínuo do Serviço após uma alteração constitui a sua aceitação dos novos Termos.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Lei Aplicável</h2>
                <p>
                  Estes Termos serão regidos pelas leis de Guiné-Bissau.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Contacte-nos</h2>
                <p>
                  Para questões sobre estes Termos, por favor contacte-nos em: <a href="mailto:suporte@caminhoseguro.com" className="text-primary hover:underline">suporte@caminhoseguro.com</a>.
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default TermsOfUse;