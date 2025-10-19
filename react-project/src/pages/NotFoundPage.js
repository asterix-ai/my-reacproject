import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Frown, Home } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: \"spring\", damping: 10, stiffness: 100 }}
      className=\"min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-700 p-4 sm:p-8\"
    >
      <Frown className=\"w-24 h-24 text-rose-500 mb-6 drop-shadow-lg\" />
      <h1 className=\"text-7xl md:text-9xl font-extrabold text-gray-900 dark:text-white mb-4 drop-shadow-md\">
        404
      </h1>
      <h2 className=\"text-3xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-6 leading-tight\">
        عذراً، الصفحة غير موجودة!
      </h2>
      <p className=\"text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-10 max-w-2xl\">
        يبدو أنك وصلت إلى مكان غير موجود. لا تقلق، يمكنك العودة إلى بر الأمان.
      </p>
      <Link
        to=\"/\"
        className=\"px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 font-bold text-lg flex items-center justify-center space-x-3\"
      >
        <Home className=\"w-6 h-6\" />
        <span>العودة إلى الرئيسية</span>
      </Link>
    </motion.div>
  );
};

export default NotFoundPage;
