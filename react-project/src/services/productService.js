import { collection, addDoc, getDoc, getDocs, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage, projectId } from './firebase';

const getProductsCollectionRef = () => collection(db, `projects/${projectId}/products`);
const getProductDocRef = (id) => doc(db, `projects/${projectId}/products`, id);
const getProductImageRef = (imageName) => ref(storage, `projects/${projectId}/images/${imageName}`);

export const addProduct = async (productData, imageFile) => {
  try {
    let imageUrl = '';
    if (imageFile) {
      const imageRef = getProductImageRef(`${Date.now()}-${imageFile.name}`);
      const snapshot = await uploadBytes(imageRef, imageFile);
      imageUrl = await getDownloadURL(snapshot.ref);
    }

    const newProduct = {
      ...productData,
      imageUrl,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const docRef = await addDoc(getProductsCollectionRef(), newProduct);
    return { id: docRef.id, ...newProduct };
  } catch (error) {
    console.error(\"Error adding product: \", error);
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const docSnap = await getDoc(getProductDocRef(id));
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error(\"Error getting product: \", error);
    throw error;
  }
};

export const getAllProducts = async () => {
  try {
    const querySnapshot = await getDocs(getProductsCollectionRef());
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error(\"Error getting all products: \", error);
    throw error;
  }
};

export const updateProduct = async (id, newData, imageFile = null, oldImageUrl = null) => {
  try {
    let imageUrl = oldImageUrl;
    if (imageFile) {
      // Delete old image if it exists and is different from new
      if (oldImageUrl && oldImageUrl.includes(projectId) ) { // Simple check to ensure it's a project storage image
        try {
          const oldImageRef = ref(storage, oldImageUrl);
          await deleteObject(oldImageRef);
        } catch (deleteError) {
          console.warn(\"Could not delete old image, it might not exist or permissions issue:\", deleteError);
        }
      }
      // Upload new image
      const imageRef = getProductImageRef(`${Date.now()}-${imageFile.name}`);
      const snapshot = await uploadBytes(imageRef, imageFile);
      imageUrl = await getDownloadURL(snapshot.ref);
    }

    const updatedProduct = {
      ...newData,
      imageUrl,
      updatedAt: serverTimestamp(),
    };

    await updateDoc(getProductDocRef(id), updatedProduct);
    return { id, ...updatedProduct };
  } catch (error) {
    console.error(\"Error updating product: \", error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const productSnap = await getDoc(getProductDocRef(id));
    if (productSnap.exists() && productSnap.data().imageUrl) {
      const imageUrl = productSnap.data().imageUrl;
      if (imageUrl.includes(projectId)) { // Ensure it's a project storage image
        const imageRef = ref(storage, imageUrl);
        await deleteObject(imageRef);
      }
    }
    await deleteDoc(getProductDocRef(id));
    return true;
  } catch (error) {
    console.error(\"Error deleting product: \", error);
    throw error;
  }
};
