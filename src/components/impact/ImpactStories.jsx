import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Quote, MapPin, Calendar } from 'lucide-react';
import { OptimizedImage } from '@/components/ui/optimized-image';

const ImpactStories = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const response = await fetch('/api/impact/stories');
      const result = await response.json();
      if (result.success) {
        setStories(result.data);
      }
    } catch (error) {
      console.error('Error fetching stories:', error);
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Histórias de Transformação
          </h2>
          <p className="text-xl text-gray-600">
            Conheça as pessoas que tiveram suas vidas transformadas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <motion.div
              key={story._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden border"
            >
              {story.image && (
                <div className="h-48 overflow-hidden">
                  <OptimizedImage
                    src={story.image}
                    alt={story.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {story.name}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    story.deviceType === 'donated' 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {story.deviceType === 'donated' ? 'Doada' : 'Vendida'}
                  </span>
                </div>

                <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
                  {story.age && (
                    <span>{story.age} anos</span>
                  )}
                  {story.location && (
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {story.location}
                    </div>
                  )}
                </div>

                <div className="relative">
                  <Quote className="h-6 w-6 text-gray-300 absolute -top-2 -left-1" />
                  <p className="text-gray-700 italic pl-6">
                    {story.story}
                  </p>
                </div>

                <div className="flex items-center text-xs text-gray-400 mt-4">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(story.createdAt).toLocaleDateString('pt-BR')}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {stories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              Em breve, compartilharemos histórias inspiradoras de nossos usuários.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ImpactStories;