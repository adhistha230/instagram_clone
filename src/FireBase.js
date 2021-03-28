import firebase from 'firebase';

 const FirebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyADic7Rtnwe7J_RWyPZWICwnpmZZwOcjTM",
  authDomain: "insta-d96c6.firebaseapp.com",
  databaseURL: "https://insta-d96c6-default-rtdb.firebaseio.com",
  projectId: "insta-d96c6",
  storageBucket: "insta-d96c6.appspot.com",
  messagingSenderId: "308463288265",
  appId: "1:308463288265:web:5280275cacbd3205ca3218",
  measurementId: "G-0QDFS4MF13"
});

const db = FirebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };

// const FirebaseApp = firebase.initializeApp({
//   apiKey: "AIzaSyB1poxK0zqDzI_0ikw-2er6DvTLcIqHmQU",
//   authDomain: "instagramclone-b146e.firebaseapp.com",
//   databaseURL: "https://instagramclone-b146e.firebaseio.com",
//   projectId: "instagramclone-b146e",
//   storageBucket: "instagramclone-b146e.appspot.com",
//   messagingSenderId: "583593730459",
//   appId: "1:583593730459:web:74761eadc236b2767b813e",
//   measurementId: "G-ZQJFP5CKT6"
// });
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
