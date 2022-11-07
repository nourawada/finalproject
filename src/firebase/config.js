import app from 'firebase';
import firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3tKPzHJRuD0uz1kJ-GPgR8sIDm7mDMY0",
  authDomain: "finalproject-97b13.firebaseapp.com",
  projectId: "finalproject-97b13",
  storageBucket: "finalproject-97b13.appspot.com",
  messagingSenderId: "448034564534",
  appId: "1:448034564534:web:285b3b4b29b8daef69b917"
};

app.initializeApp(firebaseConfig)

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore()