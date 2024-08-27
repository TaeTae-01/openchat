// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAoB0ArocBgW1RjM6tDB-Un1I-DseJ87sU",
    authDomain: "openchat-979ec.firebaseapp.com",
    projectId: "openchat-979ec",
    storageBucket: "openchat-979ec.appspot.com",
    messagingSenderId: "491075037015",
    appId: "1:491075037015:web:5aa09618a7b84aa2da0012"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);