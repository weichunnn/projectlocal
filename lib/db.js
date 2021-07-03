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

export function createBusiness(data) {
  return firestore.collection('businesses').add(data);
}

export async function storeImages(businessId, businessName, files) {
  const storageRef = firebase.storage().ref();
  const imageURLs = [];
  // Parellel Async Function to start processing at the same tim
  await Promise.all(
    files.map(async (file) => {
      const fileRef = storageRef.child(
        `${businessId}-${businessName}/${file.name}`
      );
      await fileRef.put(file);
      const fileUrl = await fileRef.getDownloadURL();
      imageURLs.push(fileUrl);
    })
  );
  // Sequence Async Function start processing one after another (May be slower)
  // for (const file of files) {
  //   const fileRef = storageRef.child(
  //     `${businessName}-${businessId}/${file.name}`
  //   );
  //   await fileRef.put(file);
  //   const fileUrl = await fileRef.getDownloadURL();
  //   imageURLs.push(fileUrl);
  // }
  return imageURLs;
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
