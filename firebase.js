// Import Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSUMyrwaKAWHoGQ64L5HPjERmasp0evD4",
  authDomain: "auth2134-aff05.firebaseapp.com",
  projectId: "auth2134-aff05",
  storageBucket: "auth2134-aff05.appspot.com",
  messagingSenderId: "216030498678",
  appId: "1:216030498678:web:7af56bfdf9c1bb43c03457",
  measurementId: "G-QFG65JW5V3"
};

// Initialize Firebase and export auth
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
