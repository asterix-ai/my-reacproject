import { useState, useEffect } from 'react';
import { useFirebase } from '../contexts/FirebaseContext';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import toast from 'react-hot-toast';
import { doc, setDoc } from 'firebase/firestore';

export const useAuth = () => {
  const { auth, db, projectId } = useFirebase();
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, [auth]);

  const signup = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Add user to 'members' collection with a role
      await setDoc(doc(db, `projects/${projectId}/members`, userCredential.user.uid), {
        email: userCredential.user.email,
        roles: ['member'], // Default role for new users
        createdAt: new Date(),
      });
      toast.success('تم إنشاء الحساب بنجاح! 🎉');
      return userCredential.user;
    } catch (err) {
      console.error(\"Signup error:\", err);
      setError(err.message);
      toast.error(`فشل التسجيل: ${err.message}`);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      toast.success('تم تسجيل الدخول بنجاح! 👋');
      return userCredential.user;
    } catch (err) {
      console.error(\"Login error:\", err);
      setError(err.message);
      toast.error(`فشل تسجيل الدخول: ${err.message}`);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    setError(null);
    try {
      await signOut(auth);
      toast.success('تم تسجيل الخروج بنجاح!');
    } catch (err) {
      console.error(\"Logout error:\", err);
      setError(err.message);
      toast.error(`فشل تسجيل الخروج: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return {
    currentUser,
    loading,
    error,
    signup,
    login,
    logout,
  };
};
