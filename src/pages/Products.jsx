import React, { useState } from 'react';
    import { Helmet } from 'react-helmet';
    import { Link } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { ShoppingCart, Star, Filter, ArrowRight } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
    import { Badge } from '@/components/ui/badge';
    import { useCart } from '@/contexts/CartContext';
    import { useToast } from '@/components/ui/use-toast';

    const Products = () => {
      const { addItem } = useCart();
      const { toast } = useToast();
      const [filter, setFilter] = useState('todos');

      const products = [
        {
          id: 1,
          name: "Bengala Inteligente Pro",
          price: 590000,
          originalPrice: 785000,
          category: "premium",
          rating: 4.9,
          reviews: 127,
          imageAlt: "Bengala inteligente premium com design moderno e tecnologia avançada",
          imageDesc: "Uma bengala preta elegante e futurista com detalhes em metal e sensores visíveis.",
          description: "O auge da tecnologia assistiva. Com detecção LiDAR 360°, GPS com realidade aumentada e materiais premium.",
          features: ["Detecção LiDAR", "GPS de Alta Precisão", "App Conectado", "Bateria de 48h", "À Prova d'Água"]
        },
        {
          id: 2,
          name: "Bengala Inteligente Standard",
          price: 395000,
          category: "standard",
          rating: 4.7,
          reviews: 89,
          imageAlt: "Bengala inteligente padrão com funcionalidades essenciais",
          imageDesc: "Uma bengala branca, minimalista e funcional, com um design limpo.",
          description: "O equilíbrio perfeito entre funcionalidade e preço. Ideal para o uso diário com total segurança.",
          features: ["Sensores Ultrassônicos", "GPS Básico", "Feedback Sonoro", "Bateria de 24h", "Design Ergonômico"]
        },
        {
          id: 3,
          name: "Bengala Inteligente Lite",
          price: 260000,
          originalPrice: 325000,
          category: "basico",
          rating: 4.5,
          reviews: 156,
          imageAlt: "Bengala inteligente básica e acessível",
          imageDesc: "Uma bengala simples e leve, de cor cinza, focada na funcionalidade principal.",
          description: "A porta de entrada para a independência. Simples, confiável e acessível para todos.",
          features: ["Detecção de Obstáculos", "Feedback Tátil", "Bateria de 12h", "Ultraleve"]
        },
        {
          id: 4,
          name: "Kit de Acessórios Premium",
          price: 98000,
          category: "acessorios",
          rating: 4.8,
          reviews: 73,
          imageAlt: "Kit completo de acessórios para bengala inteligente",
          imageDesc: "Um conjunto de acessórios: carregador portátil, capa protetora e fones de ouvido de condução óssea.",
          description: "Maximize a experiência da sua bengala com nosso kit de acessórios essenciais.",
          features: ["Carregador Portátil", "Capa de Proteção", "Suporte p/ Smartphone", "Fones Ósseos"]
        }
      ];

      const categories = [
        { id: 'todos', name: 'Todos' },
        { id: 'premium', name: 'Premium' },
        { id: 'standard', name: 'Standard' },
        { id: 'basico', name: 'Básico' },
        { id: 'acessorios', name: 'Acessórios' }
      ];

      const filteredProducts = filter === 'todos' 
        ? products 
        : products.filter(product => product.category === filter);

      const handleAddToCart = (product) => {
        addItem(product);
        toast({
          title: "Produto Adicionado!",
          description: `${product.name} foi adicionado ao seu carrinho.`,
          action: <Link to="/carrinho"><Button variant="outline" size="sm">Ver Carrinho</Button></Link>,
        });
      };

      return (
        <>
          <Helmet>
            <title>Produtos - Bengalas Inteligentes | Projeto Caminho Seguro</title>
            <meta name="description" content="Explore nossa linha de bengalas inteligentes com tecnologia assistiva avançada. Modelos Pro, Standard, Lite e acessórios." />
            <meta property="og:title" content="Produtos - Bengalas Inteligentes | Projeto Caminho Seguro" />
            <meta property="og:description" content="Explore nossa linha de bengalas inteligentes com tecnologia assistiva avançada." />
          </Helmet>

          <div className="bg-gray-50">
            <header className="bg-white py-16 sm:py-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">Nossos Produtos</h1>
                  <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                    Tecnologia de ponta para cada necessidade. Encontre a bengala inteligente ideal para você.
                  </p>
                </motion.div>
              </div>
            </header>

            <div className="sticky top-16 z-40 bg-white/70 backdrop-blur-lg border-b">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center justify-between">
                  <div className="hidden md:flex items-center space-x-2">
                    <Filter className="h-5 w-5 text-gray-500" />
                    <span className="text-gray-700 font-medium">Filtrar por:</span>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {categories.map((category) => (
                      <Button
                        key={category.id}
                        variant={filter === category.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFilter(category.id)}
                        className={`transition-all duration-200 ${filter === category.id ? 'bg-primary hover:bg-primary/90' : 'bg-white hover:bg-gray-100'}`}
                      >
                        {category.name}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <main className="py-16 sm:py-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="h-full"
                    >
                      <Card className="h-full flex flex-col card-hover overflow-hidden">
                        <div className="relative">
                          <img  className="w-full h-56 object-cover" alt={product.imageAlt} src="https://images.unsplash.com/photo-1635865165118-917ed9e20936" />
                          {product.originalPrice && (
                            <Badge variant="destructive" className="absolute top-3 right-3">
                              PROMOÇÃO
                            </Badge>
                          )}
                        </div>
                        
                        <CardHeader>
                          <CardTitle className="text-xl">{product.name}</CardTitle>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${product.rating > i ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                                />
                              ))}
                            </div>
                            <span>{product.rating} ({product.reviews} avaliações)</span>
                          </div>
                        </CardHeader>
                        
                        <CardContent className="flex-grow flex flex-col">
                          <CardDescription className="mb-4 flex-grow">{product.description}</CardDescription>
                          
                          <div className="mb-4 flex flex-wrap gap-2">
                            {product.features.slice(0, 4).map((feature) => (
                              <Badge key={feature} variant="secondary" className="font-normal">{feature}</Badge>
                            ))}
                          </div>
                        </CardContent>

                        <div className="p-6 pt-0 mt-auto">
                            <div className="flex items-baseline gap-2 mb-4">
                                <span className="text-3xl font-bold text-primary">{new Intl.NumberFormat('fr-FR').format(product.price)} XOF</span>
                                {product.originalPrice && (
                                    <span className="text-lg text-gray-500 line-through">{new Intl.NumberFormat('fr-FR').format(product.originalPrice)} XOF</span>
                                )}
                            </div>
                            <div className="flex gap-2">
                                <Button asChild className="w-full">
                                    <Link to={`/produto/${product.id}`}>
                                        Ver Detalhes
                                    </Link>
                                </Button>
                                <Button size="icon" variant="outline" onClick={() => handleAddToCart(product)} aria-label="Adicionar ao carrinho">
                                    <ShoppingCart className="h-5 w-5" />
                                </Button>
                            </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </main>

            <section className="bg-white py-16 sm:py-20">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-bold text-gray-900">Precisa de Ajuda para Escolher?</h2>
                <p className="mt-4 text-lg text-gray-600">
                  Nossa equipe de especialistas está pronta para ajudar você a encontrar a bengala inteligente perfeita para suas necessidades.
                </p>
                <div className="mt-8">
                  <Button asChild size="lg">
                    <Link to="/contato">
                      Fale Conosco <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </section>
          </div>
        </>
      );
    };

    export default Products;