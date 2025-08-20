
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, CreditCard, Lock, Smartphone, User, Calendar } from 'lucide-react';

const Checkout = () => {
    const { items, getTotalPrice, clearCart } = useCart();
    const { toast } = useToast();
    const [selectedPayment, setSelectedPayment] = useState('card');
    const [isProcessing, setIsProcessing] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const otherPaymentMethods = [
        { id: 'paypal', name: 'PayPal', icon: 'https://i.imgur.com/2motiva.png' },
        { id: 'orange-money', name: 'Orange Money', icon: 'https://i.imgur.com/uI8Jd6s.png' },
        { id: 'mobile-money', name: 'Mobile Money (Telecel)', icon: 'https://i.imgur.com/n1pGz2Z.png' },
    ];
    
    const handleOtherPaymentSelect = (id) => {
        setSelectedPayment(id);
    }

    const handlePayment = () => {
        if (!selectedPayment) {
            toast({
                title: "Selecione um método de pagamento",
                description: "Por favor, escolha uma forma de pagamento para continuar.",
                variant: "destructive",
            });
            return;
        }

        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setOrderPlaced(true);
            clearCart();
            toast({
                title: "Pedido realizado com sucesso!",
                description: "Obrigado pela sua compra. Você receberá um email de confirmação.",
            });
        }, 2000);
    };

    if (orderPlaced) {
        return (
            <>
                <Helmet>
                    <title>Pedido Confirmado - Projeto Caminho Seguro</title>
                </Helmet>
                <div className="container mx-auto px-4 py-12 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <CheckCircle className="mx-auto h-24 w-24 text-green-500 mb-6" />
                        <h1 className="text-4xl font-bold mb-4">Obrigado pelo seu pedido!</h1>
                        <p className="text-gray-600 mb-8">
                            Seu pedido foi confirmado e será processado em breve. Um email com os detalhes foi enviado para você.
                        </p>
                        <Button asChild size="lg">
                            <Link to="/produtos">Continuar Comprando</Link>
                        </Button>
                    </motion.div>
                </div>
            </>
        );
    }

    return (
        <>
            <Helmet>
                <title>Checkout - Projeto Caminho Seguro</title>
                <meta name="description" content="Finalize sua compra de forma segura." />
            </Helmet>
            <div className="bg-gray-50 min-h-screen">
                <div className="container mx-auto px-4 py-12">
                    <h1 className="text-4xl font-bold text-center mb-8">Finalizar Compra</h1>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="lg:col-span-2"
                        >
                            <Card>
                                <CardHeader>
                                    <CardTitle>Pagamento</CardTitle>
                                    <CardDescription>Escolha seu método de pagamento preferido.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Tabs defaultValue="card" className="w-full" onValueChange={(value) => setSelectedPayment(value)}>
                                        <TabsList className="grid w-full grid-cols-2">
                                            <TabsTrigger value="card"><CreditCard className="mr-2 h-4 w-4"/> Cartão de Crédito</TabsTrigger>
                                            <TabsTrigger value="other"><Smartphone className="mr-2 h-4 w-4"/> Mobile Money & Outros</TabsTrigger>
                                        </TabsList>
                                        <TabsContent value="card" className="pt-4">
                                            <div className="space-y-4">
                                                <div className="flex items-center space-x-4 mb-4">
                                                    <img src="https://i.imgur.com/O61K3a9.png" alt="GIM-UEMOA" className="h-8" />
                                                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-8" />
                                                    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg" alt="Mastercard" className="h-8" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="cardNumber">Número do Cartão</Label>
                                                    <div className="relative">
                                                        <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                        <Input id="cardNumber" placeholder="0000 0000 0000 0000" className="pl-10" />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="expiryDate">MM/AA</Label>
                                                        <div className="relative">
                                                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                            <Input id="expiryDate" placeholder="MM/AA" className="pl-10" />
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="cvv">CVV/CVC</Label>
                                                        <div className="relative">
                                                             <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                            <Input id="cvv" placeholder="123" className="pl-10" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="cardName">Nome no Cartão</Label>
                                                    <div className="relative">
                                                         <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                        <Input id="cardName" placeholder="Nome completo" className="pl-10" />
                                                    </div>
                                                </div>
                                            </div>
                                        </TabsContent>
                                        <TabsContent value="other" className="pt-4">
                                            <div className="space-y-4">
                                                {otherPaymentMethods.map(method => (
                                                    <div
                                                        key={method.id}
                                                        onClick={() => handleOtherPaymentSelect(method.id)}
                                                        className={`p-4 border rounded-lg flex items-center cursor-pointer transition-all ${selectedPayment === method.id ? 'border-primary ring-2 ring-primary' : 'border-gray-200 hover:border-gray-400'}`}
                                                    >
                                                        <img src={method.icon} alt={method.name} className="h-8 max-w-[80px] object-contain mr-4" />
                                                        <span className="font-medium flex-grow">{method.name}</span>
                                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPayment === method.id ? 'border-primary bg-primary' : 'border-gray-300'}`}>
                                                            {selectedPayment === method.id && <CheckCircle className="h-3 w-3 text-white" />}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </TabsContent>
                                    </Tabs>
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
                                    <div className="space-y-2 mb-4">
                                        {items.map(item => (
                                            <div key={item.id} className="flex justify-between items-start text-sm">
                                                <span className="font-medium pr-2">{item.name} x {item.quantity}</span>
                                                <span className="font-semibold text-right whitespace-nowrap">{new Intl.NumberFormat('fr-FR').format(item.price * item.quantity)} XOF</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="border-t pt-4 space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span>Subtotal</span>
                                            <span>{new Intl.NumberFormat('fr-FR').format(getTotalPrice())} XOF</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span>Frete</span>
                                            <span className="text-green-600 font-medium">Grátis</span>
                                        </div>
                                        <div className="border-t pt-4 flex justify-between font-bold text-lg">
                                            <span>Total</span>
                                            <span>{new Intl.NumberFormat('fr-FR').format(getTotalPrice())} XOF</span>
                                        </div>
                                    </div>
                                    <Button
                                        onClick={handlePayment}
                                        size="lg"
                                        className="w-full mt-6"
                                        disabled={isProcessing}
                                    >
                                        {isProcessing ? 'Processando...' : `Pagar ${new Intl.NumberFormat('fr-FR').format(getTotalPrice())} XOF`}
                                    </Button>
                                    <div className="flex items-center justify-center mt-4 text-xs text-gray-500">
                                        <Lock className="h-3 w-3 mr-1.5" />
                                        Pagamento seguro e criptografado.
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

export default Checkout;
