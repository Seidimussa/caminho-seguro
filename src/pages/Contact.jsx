
    import React from 'react';
    import { Helmet } from 'react-helmet';
    import { motion } from 'framer-motion';
    import { Mail, Phone, MapPin, Send } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { useToast } from '@/components/ui/use-toast';

    const Contact = () => {
      const { toast } = useToast();

      const handleSubmit = (e) => {
        e.preventDefault();
        toast({
          title: "Mensagem Enviada!",
          description: "Obrigado por entrar em contato. Responderemos em breve.",
        });
        e.target.reset();
      };

      return (
        <>
          <Helmet>
            <title>Contato | Projeto Caminho Seguro</title>
            <meta name="description" content="Entre em contato com a equipe do Projeto Caminho Seguro. Estamos aqui para ajudar com dúvidas, suporte e parcerias." />
            <meta property="og:title" content="Contato | Projeto Caminho Seguro" />
            <meta property="og:description" content="Estamos aqui para ajudar com dúvidas, suporte e parcerias." />
          </Helmet>

          <div className="bg-background">
            <header className="py-24 sm:py-32 bg-gray-50 text-center">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Fale Conosco</h1>
                  <p className="mt-6 text-lg leading-8 text-gray-600">
                    Tem alguma dúvida, sugestão ou interesse em parceria? Nossa equipe está pronta para ouvir você.
                  </p>
                </motion.div>
              </div>
            </header>

            <main className="py-20 sm:py-28">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                  >
                    <h2 className="text-3xl font-bold text-gray-900">Informações de Contato</h2>
                    <p className="mt-4 text-lg text-gray-600">
                      Você pode nos encontrar nos seguintes canais ou nos enviar uma mensagem diretamente pelo formulário.
                    </p>
                    <div className="mt-10 space-y-8">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
                          <Mail className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">Email</h3>
                          <p className="text-gray-600">Para dúvidas gerais e suporte.</p>
                          <a href="mailto:projetocaminhoseguro@gmail.com" className="text-primary hover:underline">projetocaminhoseguro@gmail.com</a>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
                          <Phone className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">Telefone</h3>
                          <p className="text-gray-600">Disponível de Seg. a Sex. das 9h às 18h.</p>
                          <p className="text-primary">+245 578 578 68</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
                          <MapPin className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">Nosso Escritório</h3>
                          <p className="text-gray-600">Agende uma visita para conhecer nossa equipe.</p>
                          <p className="text-primary">Avenida da Liberdade, Bissau, Guiné-Bissau</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="bg-gray-50 p-8 rounded-lg shadow-lg"
                  >
                    <h2 className="text-3xl font-bold text-gray-900">Envie-nos uma Mensagem</h2>
                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                      <div>
                        <Label htmlFor="name">Nome Completo</Label>
                        <Input id="name" name="name" type="text" required placeholder="Seu nome" />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" required placeholder="seu@email.com" />
                      </div>
                      <div>
                        <Label htmlFor="subject">Assunto</Label>
                        <Input id="subject" name="subject" type="text" required placeholder="Ex: Dúvida sobre produto" />
                      </div>
                      <div>
                        <Label htmlFor="message">Sua Mensagem</Label>
                        <textarea
                          id="message"
                          name="message"
                          rows="4"
                          required
                          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Digite sua mensagem aqui..."
                        ></textarea>
                      </div>
                      <Button type="submit" className="w-full" size="lg">
                        Enviar Mensagem <Send className="ml-2 h-4 w-4" />
                      </Button>
                    </form>
                  </motion.div>
                </div>
              </div>
            </main>
          </div>
        </>
      );
    };

    export default Contact;
  