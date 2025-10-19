import React from 'react';
import { motion } from 'framer-motion';
import { Fish, Copyright } from 'lucide-react';

const Footer = () => {
  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.8 } }
  };

  return (
    <motion.footer
      initial=\"hidden\"
      animate=\"visible\"
      variants={footerVariants}
      className=\"bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg shadow-inner mt-12 py-8 border-t border-gray-200 dark:border-gray-700\"
    >
      <div className=\"container mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600 dark:text-gray-400\">
        <div className=\"flex flex-col items-center space-y-4\">
          <div className=\"flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 font-bold text-xl\">
            <Fish className=\"w-6 h-6 text-cyan-500\" />
            <span>السفاري للأسماك الطازجة</span>
          </div>
          <p className=\"text-sm\">
            <Copyright className=\"inline-block w-4 h-4 mr-1\" />
            {new Date().getFullYear()} جميع الحقوق محفوظة.
          </p>
          <div className=\"flex space-x-4\">
            <a href=\"#\" className=\"text-gray-500 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-200\">
              سياسة الخصوصية
            </a>
            <a href=\"#\" className=\"text-gray-500 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-200\">
              شروط الاستخدام
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
