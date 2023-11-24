// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import * as firebase from "firebase/app"; 
import "firebase/auth"
import "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBxMGNk6bL9jQQLWM-x2WTbDTUxJCqaYK4",
    authDomain: "inventory-manahement-system.firebaseapp.com",
    projectId: "inventory-manahement-system",
    storageBucket: "inventory-manahement-system.appspot.com",
    messagingSenderId: "228276275109",
    appId: "1:228276275109:web:db2381910d4e34153b4a4c",
    measurementId: "G-4GVKJNW8PP"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


/**
 * Export Firebase global manage
 */
// export const auth = firebase.auth();
// export const firestore = firebase.firestore();