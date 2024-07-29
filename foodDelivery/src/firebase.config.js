import {getApp,getApps, initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
const firebaseConfig = {
    apiKey: "AIzaSyB37gCCybMIxnbJndHEGInNbXOeXq8Rhfw",
    authDomain: "food-delivery-a3ba2.firebaseapp.com",
    projectId: "food-delivery-a3ba2",
    storageBucket: "food-delivery-a3ba2.appspot.com",
    messagingSenderId: "146572514072",
    appId: "1:146572514072:web:caa3b016714af6cd97046d",
    measurementId: "G-NL9172F1MW"
  };


  const app=getApps.length >0 ? getApp() :initializeApp(firebaseConfig);
  const firestore=getFirestore(app);
  const storage=getStorage(app);


  export {app,firestore,storage};