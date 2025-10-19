import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useFirebase } from '../contexts/FirebaseContext';
import LoadingSpinner from './LoadingSpinner';

const AuthRoute = ({ roles = [] }) => {
  const { currentUser, loadingAuth, db, projectId } = useFirebase();
  const [isAuthorized, setIsAuthorized] = React.useState(false);
  const [checkingRole, setCheckingRole] = React.useState(true);

  React.useEffect(() => {
    if (loadingAuth) return;

    if (!currentUser) {
      setCheckingRole(false);
      setIsAuthorized(false);
      return;
    }

    if (roles.length === 0) { // No specific roles required, just authenticated
      setIsAuthorized(true);
      setCheckingRole(false);
      return;
    }

    // Check user roles from Firestore
    const checkUserRole = async () => {
      try {
        const { doc, getDoc } = await import('firebase/firestore'); // Import dynamically to prevent circular deps
        const userDocRef = doc(db, `projects/${projectId}/members`, currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          const userRoles = userData.roles || [];
          const hasRequiredRole = roles.some(role => userRoles.includes(role));
          setIsAuthorized(hasRequiredRole);
        } else {
          setIsAuthorized(false);
        }
      } catch (err) {
        console.error(\"Error checking user role:\", err);
        setIsAuthorized(false);
      } finally {
        setCheckingRole(false);
      }
    };

    checkUserRole();
  }, [currentUser, loadingAuth, roles, db, projectId]);


  if (loadingAuth || checkingRole) {
    return (
      <div className=\"flex items-center justify-center min-h-[calc(100vh-12rem)]\">
        <LoadingSpinner text=\"جارٍ التحقق من الصلاحيات...\" />
      </div>
    );
  }

  if (!currentUser || !isAuthorized) {
    return <Navigate to=\"/auth\" replace />;
  }

  return <Outlet />;
};

export default AuthRoute;
