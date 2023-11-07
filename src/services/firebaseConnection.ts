import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDKdvMvwVekMeNYr_gdtRYjBs43W11KFDk",
    authDomain: "webca-2efb2.firebaseapp.com",
    projectId: "webca-2efb2",
    storageBucket: "webca-2efb2.appspot.com",
    messagingSenderId: "240897231955",
    appId: "1:240897231955:web:147bce964d5a15210acaa6"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)
