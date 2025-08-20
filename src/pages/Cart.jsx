import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';

const Cart = () => {
    const { items, removeItem, updateQuantity, getTotalPrice, getTotalItems } = useCart();

    if (items.length === 0) {
        return (
            <>
                <Helmet>
                    <title>Carrinho Vazio - Projeto Caminho Seguro</title>
                    <meta name="description" content="Seu carrinho de compras está vazio." />
                </Helmet>
                <div className="container mx-auto px-4 py-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-2xl mx-auto text-center"
                    >
                        <ShoppingBag className="mx-auto h-24 w-24 text-gray-300 mb-6" />
                        <h1 className="text-4xl font-bold mb-4">Seu carrinho está vazio</h1>
                        <p className="text-gray-600 mb-8">
                            Parece que você ainda não adicionou nenhum produto. Explore nossa loja e encontre a solução ideal para você.
                        </p>
                        <Button asChild size="lg">
                            <Link to="/produtos">Explorar Produtos</Link>
                        </Button>
                    </motion.div>
                </div>
            </>
        );
    }

    return (
        <>
            <Helmet>
                <title>Carrinho - Projeto Caminho Seguro</title>
                <meta name="description" content="Revise os itens no seu carrinho de compras e finalize seu pedido." />
            </Helmet>
            <div className="bg-gray-50 min-h-screen">
                <div className="container mx-auto px-4 py-12">
                    <h1 className="text-4xl font-bold text-center mb-8">Meu Carrinho</h1>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="lg:col-span-2"
                        >
                            <Card>
                                <CardHeader>
                                    <CardTitle>Itens no Carrinho ({getTotalItems()})</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="divide-y">
                                        {items.map(item => (
                                            <div key={item.id} className="flex items-center py-4">
                                                <img  className="w-24 h-24 object-cover rounded-lg mr-4" alt={item.name} src="https://images.unsplash.com/photo-1571302171879-0965db383dc4" />
                                                <div className="flex-grow">
                                                    <h3 className="font-semibold">{item.name}</h3>
                                                    <p className="text-sm text-gray-500">Preço: {new Intl.NumberFormat('fr-FR').format(item.price)} XOF</p>
                                                </div>
                                                <div className="flex items-center space-x-3">
                                                    <div className="flex items-center border rounded-md">
                                                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                                            <Minus className="h-4 w-4" />
                                                        </Button>
                                                        <span className="px-3 text-sm">{item.quantity}</span>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                                            <Plus className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                    <p className="font-semibold w-28 text-right">{new Intl.NumberFormat('fr-FR').format(item.price * item.quantity)} XOF</p>
                                                    <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                                                        <Trash2 className="h-5 w-5 text-red-500" />
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="lg:col-span-1"
                        >
                            <Card className="sticky top-24">
                                <CardHeader>
                                    <CardTitle>Resumo do Pedido</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex justify-between">
                                            <span>Subtotal</span>
                                            <span>{new Intl.NumberFormat('fr-FR').format(getTotalPrice())} XOF</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Frete</span>
                                            <span>Grátis</span>
                                        </div>
                                        <div className="border-t pt-4 flex justify-between font-bold text-lg">
                                            <span>Total</span>
                                            <span>{new Intl.NumberFormat('fr-FR').format(getTotalPrice())} XOF</span>
                                        </div>
                                        <Button asChild size="lg" className="w-full mt-4">
                                            <Link to="/checkout">Finalizar Compra</Link>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;