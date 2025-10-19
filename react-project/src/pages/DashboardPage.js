import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useFirestore } from '../hooks/useFirestore';
import ProductCard from '../components/ProductCard';
import AddProductForm from '../components/AddProductForm';
import LoadingSpinner from '../components/LoadingSpinner';
import { deleteProduct } from '../services/productService';
import toast from 'react-hot-toast';
import { Plus, LayoutDashboard, Fish } from 'lucide-react';
import { useFirebase } from '../contexts/FirebaseContext'; // To ensure user is authenticated, though AuthRoute does this too.

const DashboardPage = () => {
  const { data: products, loading, error, refresh } = useFirestore('products', [], 'createdAt');
  const [editingProduct, setEditingProduct] = useState(null);
  const { currentUser } = useFirebase(); // Used for display only, AuthRoute protects access

  const handleDelete = async (productId) => {
    if (window.confirm('هل أنت متأكد أنك تريد حذف هذا المنتج؟')) {
      try {
        await deleteProduct(productId);
        toast.success('تم حذف المنتج بنجاح! 🗑️');
        refresh(); // Refresh products list
      } catch (err) {
        console.error(\"Error deleting product:\", err);
        toast.error(`فشل حذف المنتج: ${err.message}`);
      }
    }
  };

  const handleAddOrUpdateSuccess = () => {
    setEditingProduct(null); // Exit edit mode
    refresh(); // Refresh products list
  };

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
        <LoadingSpinner text=\"جارٍ تحميل المنتجات للإدارة...\" />
      </div>
    );
  }

  if (error) {
    return (
      <div className=\"flex items-center justify-center min-h-[calc(100vh-12rem)] pt-24\">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className=\"text-rose-500 text-center text-xl font-semibold p-6 rounded-xl shadow-lg bg-red-100 dark:bg-red-900/50 border border-red-200 dark:border-red-800\">
          <Fish className=\"w-8 h-8 mx-auto mb-4 text-rose-600\" />
          <p>عذرًا، حدث خطأ أثناء جلب منتجات لوحة التحكم:</p>
          <p className=\"mt-2 text-lg\">{error}</p>
          <p className=\"mt-4 text-base text-red-700 dark:text-red-300\">
            يرجى التأكد من صلاحياتك أو التحقق من اتصالك بالإنترنت.
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
        لوحة التحكم
        <LayoutDashboard className=\"inline-block w-10 h-10 md:w-12 md:h-12 text-cyan-500 mr-3\" />
      </motion.h1>

      <p className=\"text-center text-gray-700 dark:text-gray-300 text-lg mb-8\">
        مرحباً {currentUser?.email || 'بالمشرف'}! هنا يمكنك إدارة منتجات متجر الأسماك.
      </p>

      <div className=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8\">
        <div className=\"md:col-span-1 lg:col-span-1\">
          <AddProductForm
            onProductAdded={handleAddOrUpdateSuccess}
            onProductUpdated={handleAddOrUpdateSuccess}
            currentProduct={editingProduct}
          />
        </div>
        <div className=\"md:col-span-1 lg:col-span-2\">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className=\"bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-3xl shadow-xl p-6 border border-gray-200/50 dark:border-gray-700/50\"
          >
            <h2 className=\"text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center\">
              <Fish className=\"w-7 h-7 ml-2 text-cyan-500\" />
              المنتجات الحالية ({products.length})
            </h2>
            {products.length === 0 ? (
              <div className=\"text-center text-gray-600 dark:text-gray-300 p-8\">
                <Plus className=\"w-12 h-12 mx-auto mb-4 text-purple-500\" />
                <p className=\"text-xl\">لا توجد منتجات حالياً. ابدأ بإضافة منتج جديد!</p>
              </div>
            ) : (
              <div className=\"grid grid-cols-1 sm:grid-cols-2 gap-6\">
                {products.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isAdmin={true}
                    onEdit={() => setEditingProduct(product)}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardPage;
