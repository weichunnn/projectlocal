import { db } from './firebase-admin';

export async function getAllBusinesses() {
  try {
    const snapshot = await db.collection('businesses').get();
    const businesses = [];

    snapshot.forEach((doc) => {
      businesses.push({ id: doc.id, ...doc.data() });
    });
    return { businesses };
  } catch (error) {
    return { error };
  }
}
