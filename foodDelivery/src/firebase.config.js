import {getApp,getApps, initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
import { conf } from './conf/config';
const firebaseConfig = {
    apiKey:conf.apiKey ,
    authDomain: conf.authDomain,
    projectId: conf.projectId,
    storageBucket: conf.storageBucket,
    messagingSenderId: conf.messagingSenderId,
    appId: conf.appId,
    measurementId: conf.measurementId
  };


  const app=getApps.length >0 ? getApp() :initializeApp(firebaseConfig);
  const firestore=getFirestore(app);
  const storage=getStorage(app);


  export {app,firestore,storage};