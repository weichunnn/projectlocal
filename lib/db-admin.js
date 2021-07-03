import { db } from './firebase-admin';
import { compareDesc, parseISO } from 'date-fns';

export async function getAllBusinesses() {
  const snapshot = await db
    .collection('businesses')
    .where('status', '==', 'active')
    .get();
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

export async function getPreferences(userId) {
  const doc = await db.collection('preferences').doc(userId).get();

  const preferences = doc.data();
  return { preferences };
}

export async function getAllReviews(businessId) {
  const snapshot = await db
    .collection('reviews')
    .where('businessId', '==', businessId)
    .get();
  const reviews = [];
  snapshot.forEach((doc) => {
    reviews.push({ id: doc.id, ...doc.data() });
  });

  reviews.sort((a, b) =>
    compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
  );

  return { reviews };
}

export async function getUserBusinesses(uid) {
  const snapshot = await db
    .collection('businesses')
    .where('authorId', '==', uid)
    .get();

  const businesses = [];

  snapshot.forEach((doc) => {
    businesses.push({ id: doc.id, ...doc.data() });
  });

  businesses.sort((a, b) =>
    compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
  );

  return { businesses };
}
