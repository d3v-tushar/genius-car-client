// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_apiKey,
//   authDomain: process.env.REACT_APP_authDomain,
//   projectId: process.env.REACT_APP_projectId,
//   storageBucket: process.env.REACT_APP_storageBucket,
//   messagingSenderId: process.env.REACT_APP_messagingSenderId,
//   appId: process.env.REACT_APP_appId,
// };

const firebaseConfig = {
    apiKey: "AIzaSyA9JhEEHIEv14_M1bRCmPRnah8pDxNzXko",
    authDomain: "genius-car-7c5a6.firebaseapp.com",
    projectId: "genius-car-7c5a6",
    storageBucket: "genius-car-7c5a6.appspot.com",
    messagingSenderId: "743355994273",
    appId: "1:743355994273:web:b05fb81d68a52c62c8e0e0"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;