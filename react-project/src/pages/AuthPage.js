import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LogIn, UserPlus, Mail, Lock, Sparkles } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { isValidEmail, isValidPassword } from '../utils/validation';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login, signup, loading, currentUser } = useAuth();

  React.useEffect(() => {
    if (currentUser) {
      navigate('/dashboard', { replace: true });
    }
  }, [currentUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      toast.error('الرجاء إدخال بريد إلكتروني صالح! ✉️');
      return;
    }
    if (!isValidPassword(password)) {
      toast.error('كلمة المرور يجب أن تتكون من 6 أحرف على الأقل! 🔑');
      return;
    }

    let user;
    if (isLogin) {
      user = await login(email, password);
    } else {
      user = await signup(email, password);
    }

    if (user) {
      // Navigating is handled by useEffect if currentUser updates
      // For immediate feedback or if useEffect is slow, can also navigate here.
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: \"easeOut\" } }
  };

  if (loading) {
    return (
      <div className=\"flex items-center justify-center min-h-[calc(100vh-12rem)]\">
        <LoadingSpinner text=\"جارٍ المعالجة...\" />
      </div>
    );
  }

  return (
    <motion.div
      initial=\"hidden\"
      animate=\"visible\"
      variants={cardVariants}
      className=\"flex items-center justify-center min-h-[calc(100vh-12rem)] p-4 sm:p-6 lg:p-8 pt-24\"
    >
      <div className=\"bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-3xl shadow-xl p-8 sm:p-10 lg:p-12 border border-gray-200/50 dark:border-gray-700/50 w-full max-w-md mx-auto\">
        <h2 className=\"text-4xl font-extrabold text-gray-900 dark:text-white mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600\">
          {isLogin ? 'تسجيل الدخول' : 'إنشاء حساب'}
        </h2>
        <p className=\"text-center text-gray-600 dark:text-gray-300 mb-8\">
          {isLogin ? 'مرحبًا بك مرة أخرى! يرجى تسجيل الدخول للمتابعة.' : 'انضم إلينا الآن واستمتع بأفضل الأسماك الطازجة.'}
        </p>

        <form onSubmit={handleSubmit} className=\"space-y-6\">
          <div>
            <label htmlFor=\"email\" className=\"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center\">
              <Mail className=\"w-4 h-4 mr-2 text-indigo-500\" /> البريد الإلكتروني
            </label>
            <input
              type=\"email\"
              id=\"email\"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=\"name@example.com\"
              required
              className=\"w-full px-4 py-3 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all outline-none\"
            />
          </div>
          <div>
            <label htmlFor=\"password\" className=\"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center\">
              <Lock className=\"w-4 h-4 mr-2 text-purple-500\" /> كلمة المرور
            </label>
            <input
              type=\"password\"
              id=\"password\"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=\"********\"
              required
              className=\"w-full px-4 py-3 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all outline-none\"
            />
          </div>

          <button
            type=\"submit\"
            className=\"w-full px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 font-medium flex items-center justify-center space-x-2\"
          >
            {isLogin ? <LogIn className=\"w-5 h-5\" /> : <UserPlus className=\"w-5 h-5\" />}
            <span>{isLogin ? 'تسجيل الدخول' : 'إنشاء حساب'}</span>
          </button>
        </form>

        <p className=\"mt-8 text-center text-gray-600 dark:text-gray-300\">
          {isLogin ? 'ليس لديك حساب؟' : 'هل لديك حساب بالفعل؟'}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className=\"text-indigo-600 dark:text-indigo-400 font-semibold hover:underline mr-1 transition-colors duration-200\"
          >
            {isLogin ? 'أنشئ حسابًا' : 'سجّل الدخول'}
          </button>
        </p>
      </div>
    </motion.div>
  );
};

export default AuthPage;
