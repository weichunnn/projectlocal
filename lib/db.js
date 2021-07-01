import firebase from './firebase';

const firestore = firebase.firestore();

export function createUser(uid, data) {
  firestore
    .collection('users')
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
  firestore
    .collection('preferences')
    .doc(uid)
    .set({ bookmarks: [], likes: [] }, { merge: true });
}

export function createReview(data) {
  return firestore.collection('reviews').add(data);
}

export function createBookmark(uid, businessId) {
  return firestore
    .collection('preferences')
    .doc(uid)
    .set(
      {
        bookmarks: firebase.firestore.FieldValue.arrayUnion(businessId)
      },
      { merge: true }
    );
}

export function removeBookmark(uid, businessId) {
  return firestore
    .collection('preferences')
    .doc(uid)
    .update({
      bookmarks: firebase.firestore.FieldValue.arrayRemove(businessId)
    });
}

export function createLike(uid, businessId) {
  return firestore
    .collection('preferences')
    .doc(uid)
    .set(
      {
        likes: firebase.firestore.FieldValue.arrayUnion(businessId)
      },
      { merge: true }
    );
}

export function removeLike(uid, businessId) {
  return firestore
    .collection('preferences')
    .doc(uid)
    .update({
      likes: firebase.firestore.FieldValue.arrayRemove(businessId)
    });
}
