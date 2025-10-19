import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Fish, Sparkles, ShoppingBag, ArrowRight } from 'lucide-react';
import { useFirebase } from '../contexts/FirebaseContext';

const HomePage = () => {
  const { currentUser } = useFirebase();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: \"easeOut\" } }
  };

  return (
    <motion.div
      initial=\"hidden\"
      animate=\"visible\"
      variants={containerVariants}
      className=\"min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-8 pt-24\"
    >
      <motion.div variants={itemVariants} className=\"flex items-center space-x-4 mb-6\">
        <Fish className=\"w-16 h-16 text-cyan-500 drop-shadow-lg\" />
        <h1 className=\"text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white drop-shadow-md leading-tight\">
          <span className=\"bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600\">
            السفاري
          </span> للأسماك الطازجة
        </h1>
      </motion.div>

      <motion.p variants={itemVariants} className=\"text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl leading-relaxed\">
        اكتشف أشهى أنواع الأسماك والمأكولات البحرية الطازجة. جودة لا تُضاهى وتجربة تسوق فريدة.
      </motion.p>

      <motion.div variants={itemVariants} className=\"flex flex-col sm:flex-row gap-4 mb-10\">
        <Link
          to=\"/products\"
          className=\"px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 font-bold text-lg flex items-center justify-center space-x-3\"
        >
          <ShoppingBag className=\"w-6 h-6\" />
          <span>تصفح المنتجات</span>
        </Link>
        {!currentUser && (
          <Link
            to=\"/auth\"
            className=\"px-8 py-4 bg-white/20 dark:bg-gray-700/50 backdrop-blur-sm border border-white/30 dark:border-gray-600 text-indigo-700 dark:text-indigo-300 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 font-bold text-lg flex items-center justify-center space-x-3\"
          >
            <Sparkles className=\"w-6 h-6 text-pink-500\" />
            <span>ابدأ رحلتك الآن</span>
          </Link>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className=\"grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl mt-12\">
        <motion.div
          whileHover={{ y: -5 }}
          className=\"bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-3xl shadow-xl p-6 border border-gray-200/50 dark:border-gray-700/50 text-center flex flex-col items-center\"
        >
          <Fish className=\"w-12 h-12 text-indigo-500 mb-4\" />
          <h3 className=\"text-xl font-semibold mb-2\">أصناف متنوعة</h3>
          <p className=\"text-gray-700 dark:text-gray-300\">نقدم لك تشكيلة واسعة من الأسماك الطازجة يومياً.</p>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className=\"bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-3xl shadow-xl p-6 border border-gray-200/50 dark:border-gray-700/50 text-center flex flex-col items-center\"
        >
          <Sparkles className=\"w-12 h-12 text-purple-500 mb-4\" />
          <h3 className=\"text-xl font-semibold mb-2\">جودة لا مثيل لها</h3>
          <p className=\"text-gray-700 dark:text-gray-300\">نحرص على أعلى معايير الجودة لضمان رضاكم.</p>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className=\"bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-3xl shadow-xl p-6 border border-gray-200/50 dark:border-gray-700/50 text-center flex flex-col items-center\"
        >
          <ArrowRight className=\"w-12 h-12 text-cyan-500 mb-4\" />
          <h3 className=\"text-xl font-semibold mb-2\">توصيل سريع</h3>
          <p className=\"text-gray-700 dark:text-gray-300\">منتجاتنا تصلك طازجة أينما كنت في أسرع وقت.</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default HomePage;
