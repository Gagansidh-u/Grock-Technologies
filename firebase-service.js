// Firebase Service Functions 
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  onSnapshot,
  where,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './firebase-config.js';

// Collections
const USERS_COLLECTION = 'users';
const ORDERS_COLLECTION = 'orders';
const EMAILS_COLLECTION = 'emails';

// User Management
export const saveUser = async (userData) => {
  try {
    const docRef = await addDoc(collection(db, USERS_COLLECTION), {
      ...userData,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error saving user:', error);
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, USERS_COLLECTION));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting users:', error);
    throw error;
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const userRef = doc(db, USERS_COLLECTION, userId);
    await updateDoc(userRef, {
      ...userData,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// Order Management
export const saveOrder = async (orderData) => {
  try {
    const docRef = await addDoc(collection(db, ORDERS_COLLECTION), {
      ...orderData,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error saving order:', error);
    throw error;
  }
};

export const getOrders = async () => {
  try {
    const q = query(collection(db, ORDERS_COLLECTION), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting orders:', error);
    throw error;
  }
};

export const updateOrderStatus = async (orderId, status) => {
  try {
    const orderRef = doc(db, ORDERS_COLLECTION, orderId);
    await updateDoc(orderRef, {
      status,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};

// Email Management
export const saveEmail = async (emailData) => {
  try {
    const docRef = await addDoc(collection(db, EMAILS_COLLECTION), {
      ...emailData,
      read: false,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error saving email:', error);
    throw error;
  }
};

export const getEmails = async () => {
  try {
    const q = query(collection(db, EMAILS_COLLECTION), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting emails:', error);
    throw error;
  }
};

export const markEmailAsRead = async (emailId) => {
  try {
    const emailRef = doc(db, EMAILS_COLLECTION, emailId);
    await updateDoc(emailRef, {
      read: true,
      readAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error marking email as read:', error);
    throw error;
  }
};

export const deleteEmail = async (emailId) => {
  try {
    await deleteDoc(doc(db, EMAILS_COLLECTION, emailId));
  } catch (error) {
    console.error('Error deleting email:', error);
    throw error;
  }
};

export const deleteMultipleEmails = async (emailIds) => {
  try {
    const deletePromises = emailIds.map(id => deleteDoc(doc(db, EMAILS_COLLECTION, id)));
    await Promise.all(deletePromises);
  } catch (error) {
    console.error('Error deleting multiple emails:', error);
    throw error;
  }
};

// Real-time listeners
export const listenToEmails = (callback) => {
  const q = query(collection(db, EMAILS_COLLECTION), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (querySnapshot) => {
    const emails = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(emails);
  });
};

export const listenToOrders = (callback) => {
  const q = query(collection(db, ORDERS_COLLECTION), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (querySnapshot) => {
    const orders = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(orders);
  });
};

export const listenToUsers = (callback) => {
  const q = query(collection(db, USERS_COLLECTION), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (querySnapshot) => {
    const users = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(users);
  });
};
