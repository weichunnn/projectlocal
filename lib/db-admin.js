import { db } from './firebase-admin';

export async function getAllBusinesses() {
  const snapshot = await db.collection('businesses').get();
  const businesses = [];

  snapshot.forEach((doc) => {
    businesses.push({ id: doc.id, ...doc.data() });
  });
  return { businesses };
}

export async function getBusiness(businessId) {
  const doc = await db.collection('businesses').doc(businessId).get();
  const business = { id: doc.id, ...doc.data() };

  return { business };
}
