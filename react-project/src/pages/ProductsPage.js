import React from 'react';
import { motion } from 'framer-motion';
import { useFirestore } from '../hooks/useFirestore';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { Fish, Sparkles } from 'lucide-react';

const ProductsPage = () => {
  const { data: products, loading, error } = useFirestore('products', [], 'name');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  if (loading) {
    return (
      <div className=\"flex items-center justify-center min-h-[calc(100vh-12rem)] pt-24\">
        <LoadingSpinner text=\"جارٍ تحميل المنتجات...\" />
      </div>
    );
  }

  if (error) {
    return (
      <div className=\"flex items-center justify-center min-h-[calc(100vh-12rem)] pt-24\">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className=\"text-rose-500 text-center text-xl font-semibold p-6 rounded-xl shadow-lg bg-red-100 dark:bg-red-900/50 border border-red-200 dark:border-red-800\">
          <Sparkles className=\"w-8 h-8 mx-auto mb-4 text-rose-600\" />
          <p>عذرًا، حدث خطأ أثناء جلب المنتجات:</p>
          <p className=\"mt-2 text-lg\">{error}</p>
          <p className=\"mt-4 text-base text-red-700 dark:text-red-300\">
            يرجى التحقق من اتصالك بالإنترنت أو إعادة المحاولة لاحقًا.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial=\"hidden\"
      animate=\"visible\"
      variants={containerVariants}
      className=\"container mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24\"
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className=\"text-5xl md:text-6xl font-extrabold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 drop-shadow-lg\"
      >
        منتجاتنا الطازجة
        <Fish className=\"inline-block w-10 h-10 md:w-12 md:h-12 text-cyan-500 mr-3 animate-bounce\" />
      </motion.h1>

      {products.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className=\"text-center text-gray-700 dark:text-gray-300 text-2xl mt-16 p-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 max-w-2xl mx-auto\"
        >
          <Sparkles className=\"w-12 h-12 mx-auto mb-4 text-indigo-500\" />
          <p>لا توجد منتجات متاحة حالياً.</p>
          <p className=\"mt-4 text-lg\">نعمل على إضافة المزيد من الأسماك الطازجة قريباً!</p>
        </motion.div>
      ) : (
        <div className=\"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8\">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default ProductsPage;
