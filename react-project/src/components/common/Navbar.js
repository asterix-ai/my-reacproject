import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Fish, Menu, X, Sun, Moon, LogIn, LogOut, User } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { currentUser, logout } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
    setIsDarkMode(!isDarkMode);
  };

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const linkVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } }
  };

  return (
    <motion.nav
      initial=\"hidden\"
      animate=\"visible\"
      variants={navVariants}
      className=\"bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg shadow-md dark:shadow-xl fixed w-full z-50 transition-all duration-300\"
    >
      <div className=\"container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center\">
        <Link to=\"/\" className=\"flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 font-bold text-xl md:text-2xl\">
          <Fish className=\"w-8 h-8 md:w-10 md:h-10 text-cyan-500\" />
          <span className=\"whitespace-nowrap\">السفاري للأسماك الطازجة</span>
        </Link>

        <div className=\"hidden md:flex items-center space-x-6\">
          <motion.div variants={linkVariants}>
            <Link to=\"/\" className=\"text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors duration-200\">الرئيسية</Link>
          </motion.div>
          <motion.div variants={linkVariants}>
            <Link to=\"/products\" className=\"text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors duration-200\">المنتجات</Link>
          </motion.div>
          {currentUser && (
            <motion.div variants={linkVariants}>
              <Link to=\"/dashboard\" className=\"text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors duration-200\">لوحة التحكم</Link>
            </motion.div>
          )}
        </div>

        <div className=\"flex items-center space-x-4\">
          <button
            onClick={toggleDarkMode}
            className=\"p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:scale-110 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500\"
            aria-label=\"Toggle dark mode\"
          >
            {isDarkMode ? <Sun className=\"w-5 h-5\" /> : <Moon className=\"w-5 h-5\" />}
          </button>

          {currentUser ? (
            <motion.button
              variants={linkVariants}
              onClick={logout}
              className=\"hidden md:flex items-center space-x-2 px-4 py-2 bg-rose-500 text-white rounded-full shadow-md hover:bg-rose-600 transition-all duration-300 hover:scale-105\"
            >
              <LogOut className=\"w-4 h-4\" />
              <span>تسجيل الخروج</span>
            </motion.button>
          ) : (
            <motion.div variants={linkVariants}>
              <Link
                to=\"/auth\"
                className=\"hidden md:flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 font-medium\"
              >
                <LogIn className=\"w-5 h-5\" />
                <span>تسجيل الدخول</span>
              </Link>
            </motion.div>
          )}

          <button onClick={toggleMenu} className=\"md:hidden p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500\">
            {isOpen ? <X className=\"w-6 h-6\" /> : <Menu className=\"w-6 h-6\" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className=\"md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4\"
        >
          <div className=\"flex flex-col items-center space-y-4\">
            <Link to=\"/\" onClick={toggleMenu} className=\"block text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors duration-200 w-full text-center py-2\">الرئيسية</Link>
            <Link to=\"/products\" onClick={toggleMenu} className=\"block text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors duration-200 w-full text-center py-2\">المنتجات</Link>
            {currentUser && (
              <Link to=\"/dashboard\" onClick={toggleMenu} className=\"block text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors duration-200 w-full text-center py-2\">لوحة التحكم</Link>
            )}
            {currentUser ? (
              <button
                onClick={() => { logout(); toggleMenu(); }}
                className=\"flex items-center justify-center space-x-2 px-4 py-2 bg-rose-500 text-white rounded-full shadow-md hover:bg-rose-600 transition-all duration-300 w-2/3\"
              >
                <LogOut className=\"w-4 h-4\" />
                <span>تسجيل الخروج</span>
              </button>
            ) : (
              <Link
                to=\"/auth\"
                onClick={toggleMenu}
                className=\"flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 font-medium w-2/3\"
              >
                <LogIn className=\"w-5 h-5\" />
                <span>تسجيل الدخول</span>
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
