import React from 'react';
import { motion } from 'framer-motion';
import { Fish, Zap, Edit, Trash2, Heart } from 'lucide-react';
import { formatPrice } from '../utils/helpers';

const ProductCard = ({ product, onEdit, onDelete, isAdmin = false }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { scale: 1.02, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial=\"hidden\"
      animate=\"visible\"
      whileHover=\"hover\"
      className=\"bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-3xl shadow-xl p-6 border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 flex flex-col items-center text-center relative\"
    >
      {isAdmin && (
        <div className=\"absolute top-4 right-4 flex space-x-2\">
          <button
            onClick={() => onEdit(product)}
            className=\"p-2 rounded-full bg-indigo-500 text-white shadow-md hover:bg-indigo-600 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-indigo-500\"
            aria-label=\"Edit product\"
          >
            <Edit className=\"w-4 h-4\" />
          </button>
          <button
            onClick={() => onDelete(product.id)}
            className=\"p-2 rounded-full bg-rose-500 text-white shadow-md hover:bg-rose-600 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-rose-500\"
            aria-label=\"Delete product\"
          >
            <Trash2 className=\"w-4 h-4\" />
          </button>
        </div>
      )}
      <div className=\"w-32 h-32 md:w-40 md:h-40 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center overflow-hidden mb-4 shadow-inner\">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className=\"w-full h-full object-cover\"
            onError={(e) => { e.target.onerror = null; e.target.src = '/logo512.png'; }} // Fallback image
          />
        ) : (
          <Fish className=\"w-20 h-20 text-indigo-500 dark:text-indigo-400\" />
        )}
      </div>
      <h3 className=\"text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2\">{product.name}</h3>
      <p className=\"text-gray-700 dark:text-gray-300 mb-3 text-base\">{product.description}</p>
      <div className=\"flex items-center justify-center space-x-2 mb-4\">
        <Zap className=\"w-5 h-5 text-cyan-500\" />
        <span className=\"font-semibold text-lg text-indigo-600 dark:text-indigo-400\">
          {formatPrice(product.price)}
        </span>
      </div>
      <button
        className=\"px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 font-medium flex items-center justify-center space-x-2\"
      >
        <Heart className=\"w-5 h-5\" />
        <span>إضافة للمفضلة</span>
      </button>
    </motion.div>
  );
};

export default ProductCard;
