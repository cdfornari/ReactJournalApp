import 'firebase/firestore';
import 'firebase/auth';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';
 
 
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBilMUJkvSY2SxmTZKOaJdTEaX2HllTi-M",
    authDomain: "curso-node-325304.firebaseapp.com",
    projectId: "curso-node-325304",
    storageBucket: "curso-node-325304.appspot.com",
    messagingSenderId: "666663406124",
    appId: "1:666663406124:web:4a23c103196337cb31df89"
};
 
initializeApp(firebaseConfig);
 
const db = getFirestore();
 
const googleAuthProvider = new GoogleAuthProvider();
 
export{
    db,
    googleAuthProvider
}