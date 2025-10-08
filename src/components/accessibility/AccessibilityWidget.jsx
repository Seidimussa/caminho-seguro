import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Accessibility, Type, Contrast } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AccessibilityWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState({
    fontSize: 'normal',
    contrast: 'normal'
  });

  const toggleSetting = (setting, value) => {
    setSettings(prev => ({ ...prev, [setting]: value }));
    
    const root = document.documentElement;
    
    switch (setting) {
      case 'fontSize':
        root.style.fontSize = value === 'large' ? '1.2em' : '1em';
        break;
      case 'contrast':
        root.classList.toggle('high-contrast', value === 'high');
        break;
    }
  };

  return (
    <>
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full w-14 h-14 bg-blue-600 hover:bg-blue-700 shadow-lg"
          aria-label="Opções de acessibilidade"
        >
          <Accessibility className="h-6 w-6" />
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 right-6 bg-white rounded-lg shadow-xl border p-4 z-50 w-64"
          >
            <h3 className="font-semibold mb-4 flex items-center">
              <Accessibility className="h-5 w-5 mr-2" />
              Acessibilidade
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  <Type className="h-4 w-4 inline mr-1" />
                  Tamanho da Fonte
                </label>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={settings.fontSize === 'normal' ? 'default' : 'outline'}
                    onClick={() => toggleSetting('fontSize', 'normal')}
                  >
                    Normal
                  </Button>
                  <Button
                    size="sm"
                    variant={settings.fontSize === 'large' ? 'default' : 'outline'}
                    onClick={() => toggleSetting('fontSize', 'large')}
                  >
                    Grande
                  </Button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  <Contrast className="h-4 w-4 inline mr-1" />
                  Contraste
                </label>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={settings.contrast === 'normal' ? 'default' : 'outline'}
                    onClick={() => toggleSetting('contrast', 'normal')}
                  >
                    Normal
                  </Button>
                  <Button
                    size="sm"
                    variant={settings.contrast === 'high' ? 'default' : 'outline'}
                    onClick={() => toggleSetting('contrast', 'high')}
                  >
                    Alto
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AccessibilityWidget;