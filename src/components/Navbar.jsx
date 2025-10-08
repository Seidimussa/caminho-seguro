
    import React, { useState } from 'react';
    import { Link, NavLink, useNavigate } from 'react-router-dom';
    import { motion, AnimatePresence } from 'framer-motion';
    import { Menu, X, ShoppingCart, User, LogOut, Shield } from 'lucide-react';
    import { useAuth } from '@/contexts/AuthContext';
    import { useCart } from '@/contexts/CartContext';
    import { Button } from '@/components/ui/button';
    import { Badge } from '@/components/ui/badge';
    import { useToast } from '@/components/ui/use-toast';

    const Navbar = () => {
      const [isOpen, setIsOpen] = useState(false);
      const { user, logout } = useAuth();
      const { getTotalItems } = useCart();
      const { toast } = useToast();
      const navigate = useNavigate();

      const handleLogout = () => {
        logout();
        toast({
          title: "Logout Realizado",
          description: "Você foi desconectado com sucesso.",
        });
        navigate('/');
      };

      const menuItems = [
        { name: 'Início', path: '/' },
        { name: 'Sobre', path: '/sobre' },
        { name: 'Produtos', path: '/produtos' },
        { name: 'Inclusão', path: '/inclusao' },
        { name: 'ESG', path: '/esg' },
        { name: 'Parceiros', path: '/parceiros' },
        { name: 'Contato', path: '/contato' },
      ];

      const NavItem = ({ path, children }) => (
        <NavLink
          to={path}
          className={({ isActive }) =>
            `relative text-gray-700 hover:text-primary transition-colors duration-300 ${isActive ? 'font-semibold text-primary' : 'font-medium'}`
          }
        >
          {children}
          {({ isActive }) =>
            isActive && (
              <motion.div
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                layoutId="underline"
                initial={false}
              />
            )
          }
        </NavLink>
      );

      return (
        <nav className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                <Shield className="h-8 w-8 text-primary" />
                <span className="text-2xl font-bold text-gradient">Caminho Seguro</span>
              </Link>

              <div className="hidden md:flex items-center space-x-8">
                {menuItems.map((item) => (
                  <NavItem key={item.name} path={item.path}>
                    {item.name}
                  </NavItem>
                ))}
              </div>

              <div className="hidden md:flex items-center space-x-4">
                <Link to="/carrinho" className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <ShoppingCart className="h-6 w-6 text-gray-600" />
                  {getTotalItems() > 0 && (
                    <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-1 text-xs">
                      {getTotalItems()}
                    </Badge>
                  )}
                </Link>

                {user ? (
                  <div className="flex items-center space-x-2">
                    <Link to="/perfil">
                      <Button variant="ghost" size="icon">
                        <User className="h-5 w-5" />
                      </Button>
                    </Link>
                    {user.role === 'admin' && (
                      <Link to="/admin">
                        <Button variant="outline" size="sm">Admin</Button>
                      </Link>
                    )}
                    {(user.role === 'funcionario' || user.role === 'parceiro') && (
                      <Link to="/dashboard">
                        <Button variant="outline" size="sm">Dashboard</Button>
                      </Link>
                    )}
                    <Button variant="ghost" size="icon" onClick={handleLogout}>
                      <LogOut className="h-5 w-5" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Link to="/login">
                      <Button variant="outline">Entrar</Button>
                    </Link>
                    <Link to="/cadastro">
                      <Button>Cadastrar</Button>
                    </Link>
                  </div>
                )}
              </div>

              <div className="md:hidden flex items-center">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="text-gray-700 hover:text-primary focus:outline-none p-2"
                >
                  <AnimatePresence initial={false} mode="wait">
                    <motion.div
                      key={isOpen ? 'x' : 'menu'}
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </motion.div>
                  </AnimatePresence>
                </button>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden bg-white border-t"
              >
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  {menuItems.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        `block px-3 py-2 rounded-md text-base font-medium ${
                          isActive ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-50'
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>
                  ))}
                  <div className="border-t border-gray-200 mt-4 pt-4">
                    <div className="flex items-center justify-between px-3 py-2">
                      <Link to="/carrinho" onClick={() => setIsOpen(false)} className="relative p-2 rounded-full hover:bg-gray-100">
                        <ShoppingCart className="h-6 w-6 text-gray-600" />
                        {getTotalItems() > 0 && (
                          <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-1 text-xs">
                            {getTotalItems()}
                          </Badge>
                        )}
                        <span className="sr-only">Carrinho</span>
                      </Link>
                      {user ? (
                        <div className="flex items-center space-x-2">
                          <Link to="/perfil" onClick={() => setIsOpen(false)}>
                            <Button variant="ghost">Perfil</Button>
                          </Link>
                          <Button variant="ghost" size="icon" onClick={handleLogout}>
                            <LogOut className="h-5 w-5" />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <Link to="/login" onClick={() => setIsOpen(false)}>
                            <Button variant="outline">Entrar</Button>
                          </Link>
                          <Link to="/cadastro" onClick={() => setIsOpen(false)}>
                            <Button>Cadastrar</Button>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      );
    };

    export default Navbar;
  