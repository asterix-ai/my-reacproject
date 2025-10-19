import { createContext, useContext, useEffect, useState } from 'react';
import { app, auth, db, storage, projectId } from '../services/firebase'; // Import initialized instances

export const FirebaseContext = createContext(null);

export const FirebaseProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoadingAuth(false);
      console.log('Auth state changed:', user ? user.email : 'No user');
    });

    return () => unsubscribe();
  }, []);

  return (
    <FirebaseContext.Provider value={{ app, auth, db, storage, projectId, currentUser, loadingAuth }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};
