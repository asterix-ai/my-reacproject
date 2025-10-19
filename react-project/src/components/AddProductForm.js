import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Plus, UploadCloud, Edit } from 'lucide-react';
import { addProduct, updateProduct } from '../services/productService';
import LoadingSpinner from './LoadingSpinner';

const AddProductForm = ({ onProductAdded, onProductUpdated, currentProduct = null }) => {
  const [name, setName] = useState(currentProduct?.name || '');
  const [description, setDescription] = useState(currentProduct?.description || '');
  const [price, setPrice] = useState(currentProduct?.price || '');
  const [image, setImage] = useState(null); // File object
  const [imageUrlPreview, setImageUrlPreview] = useState(currentProduct?.imageUrl || ''); // For display
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  React.useEffect(() => {
    if (currentProduct) {
      setName(currentProduct.name);
      setDescription(currentProduct.description);
      setPrice(currentProduct.price);
      setImageUrlPreview(currentProduct.imageUrl || '');
      setImage(null); // Reset file input
    } else {
      setName('');
      setDescription('');
      setPrice('');
      setImage(null);
      setImageUrlPreview('');
    }
  }, [currentProduct]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!name || !description || !price) {
      toast.error('الرجاء ملء جميع الحقول المطلوبة.');
      setLoading(false);
      return;
    }
    if (isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
        toast.error('الرجاء إدخال سعر صحيح وموجب.');
        setLoading(false);
        return;
    }

    try {
      const productData = {
        name,
        description,
        price: parseFloat(price),
      };

      if (currentProduct) {
        await updateProduct(currentProduct.id, productData, image, currentProduct.imageUrl);
        toast.success('تم تحديث المنتج بنجاح! ✨');
        onProductUpdated();
      } else {
        if (!image) {
            toast.error('الرجاء إضافة صورة للمنتج الجديد.');
            setLoading(false);
            return;
        }
        await addProduct(productData, image);
        toast.success('تم إضافة المنتج بنجاح! 🎉');
        onProductAdded();
        // Clear form after adding
        setName('');
        setDescription('');
        setPrice('');
        setImage(null);
        setImageUrlPreview('');
      }
    } catch (err) {
      console.error(\"Product operation error:\", err);
      setError(err.message);
      toast.error(`فشل العملية: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImageUrlPreview(URL.createObjectURL(file));
    } else {
      setImage(null);
      setImageUrlPreview(currentProduct?.imageUrl || '');
    }
  };

  if (loading) {
    return <LoadingSpinner text={currentProduct ? \"جارٍ تحديث المنتج...\" : \"جارٍ إضافة المنتج...\"} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className=\"bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-3xl shadow-xl p-6 border border-gray-200/50 dark:border-gray-700/50 max-w-lg mx-auto\"
    >
      <h2 className=\"text-3xl font-extrabold text-gray-900 dark:text-white mb-6 text-center\">
        {currentProduct ? 'تعديل المنتج' : 'إضافة منتج جديد'}
      </h2>
      <form onSubmit={handleSubmit} className=\"space-y-6\">
        <div>
          <label htmlFor=\"name\" className=\"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2\">اسم المنتج</label>
          <input
            type=\"text\"
            id=\"name\"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder=\"سمك السلمون الطازج\"
            required
            className=\"w-full px-4 py-3 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all outline-none\"
          />
        </div>
        <div>
          <label htmlFor=\"description\" className=\"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2\">الوصف</label>
          <textarea
            id=\"description\"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder=\"سمك فاخر عالي الجودة...\"
            rows=\"4\"
            required
            className=\"w-full px-4 py-3 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all outline-none\"
          ></textarea>
        </div>
        <div>
          <label htmlFor=\"price\" className=\"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2\">السعر (SAR)</label>
          <input
            type=\"number\"
            id=\"price\"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder=\"120.00\"
            step=\"0.01\"
            min=\"0\"
            required
            className=\"w-full px-4 py-3 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all outline-none\"
          />
        </div>
        <div>
          <label htmlFor=\"image\" className=\"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2\">صورة المنتج</label>
          <div className=\"flex items-center space-x-4\">
            <input
              type=\"file\"
              id=\"image\"
              accept=\"image/*\"
              onChange={handleImageChange}
              className=\"hidden\"
            />
            <label
              htmlFor=\"image\"
              className=\"flex items-center justify-center px-6 py-3 bg-cyan-500 text-white rounded-xl shadow-md hover:bg-cyan-600 transition-all duration-300 cursor-pointer text-sm font-medium\"
            >
              <UploadCloud className=\"w-5 h-5 ml-2\" />
              <span>{image ? 'تم اختيار صورة' : 'اختر صورة'}</span>
            </label>
            {imageUrlPreview && (
              <img src={imageUrlPreview} alt=\"معاينة\" className=\"w-20 h-20 object-cover rounded-md shadow-md\" />
            )}
          </div>
        </div>

        {error && <p className=\"text-rose-500 text-sm\">{error}</p>}

        <button
          type=\"submit\"
          className=\"w-full px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 font-medium flex items-center justify-center space-x-2\"
        >
          {currentProduct ? <Edit className=\"w-5 h-5\" /> : <Plus className=\"w-5 h-5\" />}
          <span>{currentProduct ? 'تعديل المنتج' : 'إضافة المنتج'}</span>
        </button>
      </form>
    </motion.div>
  );
};

export default AddProductForm;
