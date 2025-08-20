
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, Check, ArrowLeft, Heart, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/components/ui/use-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const products = [
    {
      id: 1,
      name: "Bengala Inteligente Pro",
      price: 590000,
      originalPrice: 785000,
      rating: 4.9,
      reviews: 127,
      inStock: true,
      description: "A Bengala Inteligente Pro representa o que há de mais avançado em tecnologia assistiva. Equipada com sensores LiDAR de última geração, GPS de alta precisão e conectividade inteligente, oferece uma experiência de navegação completamente nova para pessoas com deficiência visual.",
      features: [
        "Detecção LiDAR com alcance de 5 metros",
        "GPS de alta precisão com margem de erro de 1 metro",
        "Aplicativo móvel dedicado para personalização",
        "Bateria de longa duração (48 horas de uso contínuo)",
        "Resistente à água (IPX7)",
        "Feedback tátil e sonoro personalizável",
        "Botão de pânico para emergências",
        "Conectividade Bluetooth 5.0",
        "Design ergonômico e leve (800g)",
        "Garantia de 2 anos"
      ],
      specifications: {
        "Peso": "800g",
        "Altura": "Ajustável de 80cm a 140cm",
        "Bateria": "Li-ion 5000mAh",
        "Conectividade": "Bluetooth 5.0, GPS, 4G",
        "Sensores": "LiDAR, Ultrassônico, Acelerômetro",
        "Resistência": "IPX7 (resistente à água)",
        "Garantia": "2 anos"
      },
      images: [
        "Bengala inteligente premium vista frontal com design moderno",
        "Bengala inteligente sendo usada em ambiente urbano",
        "Detalhes dos sensores e tecnologia da bengala",
        "Aplicativo móvel conectado à bengala inteligente"
      ]
    },
    {
      id: 2,
      name: "Bengala Inteligente Standard",
      price: 395000,
      rating: 4.7,
      reviews: 89,
      inStock: true,
      description: "O equilíbrio perfeito entre funcionalidade e preço. Ideal para o uso diário com total segurança.",
      features: ["Sensores Ultrassônicos", "GPS Básico", "Feedback Sonoro", "Bateria de 24h", "Design Ergonômico"],
      images: ["Bengala inteligente padrão"]
    },
    {
      id: 4,
      name: "Kit Acessórios Premium",
      price: 98000,
      rating: 4.8,
      reviews: 73,
      inStock: true,
      description: "Maximize a experiência da sua bengala com nosso kit de acessórios essenciais.",
      features: ["Carregador Portátil", "Capa de Proteção", "Suporte p/ Smartphone", "Fones Ósseos"],
      images: ["Kit de acessórios para bengala"]
    }
  ];

  const product = products.find(p => p.id === parseInt(id)) || products[0];

  const relatedProducts = [
    {
      id: 2,
      name: "Bengala Inteligente Standard",
      price: 395000,
      image: "Bengala inteligente padrão"
    },
    {
      id: 4,
      name: "Kit Acessórios Premium",
      price: 98000,
      image: "Kit de acessórios para bengala"
    }
  ];

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast({
      title: "Produto adicionado!",
      description: `${quantity}x ${product.name} adicionado ao carrinho.`,
    });
  };

  const handleShare = () => {
    toast({
      title: "🚧 Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀"
    });
  };

  const handleWishlist = () => {
    toast({
      title: "🚧 Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀"
    });
  };

  return (
    <>
      <Helmet>
        <title>{product.name} - Projeto Caminho Seguro</title>
        <meta name="description" content={product.description} />
        <meta property="og:title" content={`${product.name} - Projeto Caminho Seguro`} />
        <meta property="og:description" content={product.description} />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="bg-white py-4 border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Link to="/" className="hover:text-green-600">Início</Link>
              <span>/</span>
              <Link to="/produtos" className="hover:text-green-600">Produtos</Link>
              <span>/</span>
              <span className="text-gray-900">{product.name}</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link to="/produtos" className="inline-flex items-center text-green-600 hover:text-green-700 mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar aos Produtos
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-4">
                <div className="aspect-square bg-white rounded-lg shadow-lg overflow-hidden">
                  <img  className="w-full h-full object-cover" alt={product.name} src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square bg-white rounded-lg overflow-hidden border-2 ${
                        selectedImage === index ? 'border-green-600' : 'border-gray-200'
                      }`}
                    >
                      <img  className="w-full h-full object-cover" alt={`${product.name} - Imagem ${index + 1}`} src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600">
                    {product.rating} ({product.reviews} avaliações)
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-green-600">
                  {new Intl.NumberFormat('fr-FR').format(product.price)} XOF
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-gray-500 line-through">
                      {new Intl.NumberFormat('fr-FR').format(product.originalPrice)} XOF
                    </span>
                    <Badge className="bg-red-500">
                      -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                    </Badge>
                  </>
                )}
              </div>

              <p className="text-gray-600 text-lg leading-relaxed">
                {product.description}
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700 font-medium">Quantidade:</span>
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 border-x">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button
                    onClick={handleAddToCart}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    size="lg"
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Adicionar ao Carrinho
                  </Button>
                  <Button
                    onClick={handleWishlist}
                    variant="outline"
                    size="lg"
                  >
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button
                    onClick={handleShare}
                    variant="outline"
                    size="lg"
                  >
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>

                {product.inStock ? (
                  <div className="flex items-center text-green-600">
                    <Check className="h-5 w-5 mr-2" />
                    <span>Em estoque - Envio em 24h</span>
                  </div>
                ) : (
                  <div className="text-red-600">
                    Produto temporariamente indisponível
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {product.features && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mt-16"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Características Principais</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {product.specifications && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mt-8"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Especificações Técnicas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-gray-200">
                        <span className="font-medium text-gray-700">{key}:</span>
                        <span className="text-gray-600">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Produtos Relacionados</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Card key={relatedProduct.id} className="card-hover">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <img  className="w-20 h-20 object-cover rounded-lg" alt={relatedProduct.name} src="https://images.unsplash.com/photo-1635865165118-917ed9e20936" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {relatedProduct.name}
                        </h3>
                        <p className="text-green-600 font-bold">
                          {new Intl.NumberFormat('fr-FR').format(relatedProduct.price)} XOF
                        </p>
                      </div>
                      <Link to={`/produto/${relatedProduct.id}`}>
                        <Button variant="outline" size="sm">
                          Ver Produto
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
