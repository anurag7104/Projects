import { getAuth } from "firebase/auth";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAP9JbLQOnp4xm9EP9jBZK2Uf3IUM9sr0w",
  authDomain: "resume-builder-a8e71.firebaseapp.com",
  projectId: "resume-builder-a8e71",
  storageBucket: "resume-builder-a8e71.appspot.com",
  messagingSenderId: "364890743780",
  appId: "1:364890743780:web:3dff67fab028ee792f1df1"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage=getStorage(app);
export { auth, db,storage };
