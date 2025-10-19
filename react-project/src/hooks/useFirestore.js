import { useState, useEffect, useCallback } from 'react';
import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { useFirebase } from '../contexts/FirebaseContext';
import toast from 'react-hot-toast';

export const useFirestore = (collectionName, conditions = [], orderByField = null) => {
  const { db, projectId } = useFirebase();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCollection = useCallback(() => {
    setLoading(true);
    setError(null);
    let qRef = collection(db, `projects/${projectId}/${collectionName}`);

    if (conditions && conditions.length > 0) {
      conditions.forEach(cond => {
        qRef = query(qRef, where(cond.field, cond.operator, cond.value));
      });
    }

    if (orderByField) {
        qRef = query(qRef, orderBy(orderByField));
    }

    const unsubscribe = onSnapshot(qRef,
      (snapshot) => {
        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setData(items);
        setLoading(false);
      },
      (err) => {
        console.error(\"Firestore fetch error:\", err);
        setError(`فشل جلب البيانات: ${err.message}`);
        toast.error(`خطأ: ${err.message}`);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [db, projectId, collectionName, JSON.stringify(conditions), orderByField]); // JSON.stringify conditions for useCallback dependency array

  useEffect(() => {
    const unsubscribe = fetchCollection();
    return () => unsubscribe();
  }, [fetchCollection]);

  return { data, loading, error, refresh: fetchCollection };
};
