
    import React, { createContext, useContext, useState, useEffect } from 'react';

    const AuthContext = createContext();

    export const useAuth = () => {
      return useContext(AuthContext);
    };

    export const AuthProvider = ({ children }) => {
      const [user, setUser] = useState(null);
      const [loading, setLoading] = useState(true);

      const setupDemoUsers = () => {
        const users = [
          { id: 'admin-01', name: 'Admin', email: 'admin@caminhoseguro.com', password: 'admin123', role: 'admin' },
          { id: 'func-01', name: 'Funcionário Exemplo', email: 'funcionario@caminhoseguro.com', password: 'func123', role: 'funcionario' },
          { id: 'parc-01', name: 'Parceiro Exemplo', email: 'parceiro@caminhoseguro.com', password: 'parc123', role: 'parceiro' },
          { id: 'cli-01', name: 'Cliente Exemplo', email: 'cliente@caminhoseguro.com', password: 'cliente123', role: 'cliente' },
        ];
        localStorage.setItem('caminhoSeguroUsers', JSON.stringify(users));
      };


      useEffect(() => {
        try {
          if (!localStorage.getItem('caminhoSeguroUsers')) {
            setupDemoUsers();
          }

          const savedUser = localStorage.getItem('caminhoSeguroUser');
          if (savedUser) {
            setUser(JSON.parse(savedUser));
          }
        } catch (error) {
          console.error("Failed to access localStorage:", error);
        } finally {
          setLoading(false);
        }
      }, []);

      const login = async (email, password) => {
        const users = JSON.parse(localStorage.getItem('caminhoSeguroUsers') || '[]');
        const foundUser = users.find(u => u.email === email && u.password === password);
        
        if (foundUser) {
          const userToStore = { ...foundUser };
          delete userToStore.password;
          setUser(userToStore);
          localStorage.setItem('caminhoSeguroUser', JSON.stringify(userToStore));
          return { success: true, user: userToStore };
        }
        
        return { success: false, error: 'Credenciais inválidas' };
      };

      const register = async (userData) => {
        const users = JSON.parse(localStorage.getItem('caminhoSeguroUsers') || '[]');
        
        if (users.find(u => u.email === userData.email)) {
          return { success: false, error: 'Email já cadastrado' };
        }

        const newUser = {
          id: `user-${Date.now()}`,
          ...userData,
          role: userData.role || 'cliente',
          createdAt: new Date().toISOString()
        };

        users.push(newUser);
        localStorage.setItem('caminhoSeguroUsers', JSON.stringify(users));

        const userToStore = { ...newUser };
        delete userToStore.password;
        setUser(userToStore);
        localStorage.setItem('caminhoSeguroUser', JSON.stringify(userToStore));

        return { success: true, user: userToStore };
      };

      const logout = () => {
        setUser(null);
        localStorage.removeItem('caminhoSeguroUser');
      };

      const updateProfile = (updatedData) => {
        if (!user) return;
        const users = JSON.parse(localStorage.getItem('caminhoSeguroUsers') || '[]');
        let currentUserWithPassword = users.find(u => u.id === user.id) || {};

        const updatedUserForStorage = { ...currentUserWithPassword, ...updatedData };
        const updatedUserForState = { ...user, ...updatedData };
        
        if (updatedData.password) {
            currentUserWithPassword.password = updatedData.password;
        } else {
            delete updatedUserForStorage.password;
        }
        
        setUser(updatedUserForState);
        localStorage.setItem('caminhoSeguroUser', JSON.stringify(updatedUserForState));

        const userIndex = users.findIndex(u => u.id === user.id);
        if (userIndex !== -1) {
          users[userIndex] = { ...users[userIndex], ...updatedData };
          localStorage.setItem('caminhoSeguroUsers', JSON.stringify(users));
        }
        return { success: true, user: updatedUserForState };
      };

      const value = {
        user,
        loading,
        login,
        register,
        logout,
        updateProfile,
      };

      return (
        <AuthContext.Provider value={value}>
          {!loading && children}
        </AuthContext.Provider>
      );
    };
  