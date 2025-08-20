
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
  const lastUpdatedDate = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <>
      <Helmet>
        <title>Política de Privacidade - Projeto Caminho Seguro</title>
        <meta name="description" content="Entenda como o Projeto Caminho Seguro recolhe, usa e protege os seus dados pessoais. A sua privacidade é a nossa prioridade." />
        <meta property="og:title" content="Política de Privacidade - Projeto Caminho Seguro" />
        <meta property="og:description" content="Entenda como o Projeto Caminho Seguro recolhe, usa e protege os seus dados pessoais." />
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
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">Política de Privacidade</h1>
              <p className="mt-4 text-gray-500">Última atualização: {lastUpdatedDate}</p>
            </div>

            <div className="prose prose-lg max-w-none text-gray-700">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Introdução e o Nosso Compromisso (Governança)</h2>
                <p>
                  Bem-vindo ao Caminho Seguro. A sua privacidade e a confiança que deposita em nós são a base da nossa operação. Esta Política de Privacidade explica de forma transparente e acessível como a Caminho Seguro ("nós", "nosso") recolhe, usa, partilha e protege os seus dados pessoais quando utiliza a nossa bengala inteligente e os serviços associados (coletivamente, o "Serviço").
                </p>
                <p>
                  Operamos com máxima integridade e ética, e esta política é um reflexo direto do nosso compromisso com a sua segurança e os seus direitos.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Que Dados Recolhemos e Porquê (Social)</h2>
                <p>
                  Recolhemos apenas os dados estritamente necessários para fornecer, melhorar e garantir a segurança do nosso Serviço, sempre com o objetivo de promover a sua inclusão, acessibilidade e bem-estar.
                </p>
                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Dados Fornecidos por Si:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Informações de Conta:</strong> Nome, endereço de e-mail, número de telefone.</li>
                  <li><strong>Contactos de Emergência:</strong> Nomes e números de telefone das pessoas que designar para serem contactadas através da função SOS. Usamos esta informação apenas para ativar o alerta de pânico a seu pedido.</li>
                </ul>
                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Dados Recolhidos Automaticamente pelo Dispositivo:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Dados de Localização (GPS/GNSS):</strong> Recolhemos a sua localização em tempo real apenas quando a função de navegação está ativa ou quando o botão de pânico é acionado. Isto é essencial para o guiar e para a sua segurança.</li>
                  <li><strong>Dados de Uso e Desempenho:</strong> Nível da bateria, estado da conexão de rede, relatórios de erros, frequência de uso de funcionalidades. Usamos estes dados anónimos para melhorar a fiabilidade e a autonomia do dispositivo.</li>
                  <li><strong>Dados dos Sensores (IMU, ToF):</strong> Recolhemos dados anónimos sobre obstáculos detetados e padrões de movimento (ex: deteção de uma queda). Isto ajuda-nos a refinar os nossos algoritmos para tornar o dispositivo mais seguro para todos.</li>
                </ul>
                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Dados da Câmara (Com Foco na Privacidade):</h3>
                <p>
                  O processamento de imagens para deteção de objetos ocorre localmente no dispositivo. Nós não armazenamos nem enviamos fotografias ou vídeos para os nossos servidores. Apenas metadados anónimos (ex: "objeto do tipo 'degrau' detetado na localização X") podem ser enviados para fins de melhoria do serviço.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Como Usamos os Seus Dados</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Para Fornecer o Serviço:</strong> Ativar a navegação, executar a função SOS, monitorizar a saúde do dispositivo.</li>
                  <li><strong>Para a Sua Segurança:</strong> Partilhar a sua localização com os seus contactos de emergência quando você aciona o alerta.</li>
                  <li><strong>Para Melhorar o Nosso Produto:</strong> Analisar dados de uso anónimos para corrigir bugs, melhorar a autonomia da bateria e desenvolver novas funcionalidades úteis.</li>
                  <li><strong>Para Promover o Bem Social (Social):</strong> Podemos partilhar dados de mobilidade totalmente agregados e anonimizados com municípios ou centros de investigação para os ajudar a construir cidades mais acessíveis e seguras. A sua identidade pessoal nunca é partilhada.</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Com Quem Partilhamos os Seus Dados (Governança)</h2>
                <p>
                  A sua confiança é o nosso ativo mais importante. Não vendemos os seus dados pessoais. A partilha é limitada a:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li><strong>Os Seus Contactos de Emergência:</strong> A seu pedido explícito, ao ativar a função SOS.</li>
                  <li><strong>Fornecedores de Serviços Essenciais:</strong> Parceiros tecnológicos que nos ajudam a operar (ex: serviços de cloud para armazenamento de dados, APIs de mapas). Exigimos que todos os parceiros cumpram rigorosos padrões de privacidade.</li>
                  <li><strong>Autoridades Legais:</strong> Se exigido por lei ou para proteger a segurança de outros.</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Os Seus Direitos e Controlo</h2>
                <p>
                  Você tem controlo sobre os seus dados. De acordo com a legislação aplicável, tem o direito de:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>Aceder, corrigir ou apagar os seus dados pessoais.</li>
                  <li>Limitar ou opor-se ao processamento dos seus dados.</li>
                  <li>Solicitar a portabilidade dos seus dados.</li>
                </ul>
                <p className="mt-4">
                  Pode exercer estes direitos contactando-nos através do e-mail: <a href="mailto:privacidade@caminhoseguro.com" className="text-primary hover:underline">privacidade@caminhoseguro.com</a>.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Segurança e Retenção de Dados</h2>
                <p>
                  Empregamos medidas de segurança técnicas e organizacionais de topo (como encriptação) para proteger os seus dados. Retemos os seus dados apenas durante o tempo necessário para fornecer o Serviço ou conforme exigido por lei.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Alterações a esta Política</h2>
                <p>
                  Podemos atualizar esta política. Notificá-lo-emos de quaisquer alterações significativas através do nosso website ou por e-mail.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Contacte-nos</h2>
                <p>
                  Se tiver alguma dúvida, por favor contacte o nosso Responsável pela Proteção de Dados em: <a href="mailto:privacidade@caminhoseguro.com" className="text-primary hover:underline">privacidade@caminhoseguro.com</a>.
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
