import React from 'react';
import { ClipLoader } from 'react-spinners';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ size = 30, color = \"#6366f1\", text = \"جارٍ التحميل...\", className = \"\" }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`flex flex-col items-center justify-center p-4 rounded-lg ${className}`}
    >
      <ClipLoader color={color} size={size} />
      {text && <p className=\"mt-3 text-gray-600 dark:text-gray-300 font-medium\">{text}</p>}
    </motion.div>
  );
};

export default LoadingSpinner;
