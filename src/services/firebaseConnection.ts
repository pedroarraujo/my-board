import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBjhpCrvW-68ptNV1Y2iqfK7NcUNYY4BCg",
    authDomain: "boardapp-6030b.firebaseapp.com",
    projectId: "boardapp-6030b",
    storageBucket: "boardapp-6030b.appspot.com",
    messagingSenderId: "839952489014",
    appId: "1:839952489014:web:70e45c2d86746f07469697",
    measurementId: "G-4G4JYSXRGJ"
};

// Initialize Firebase
if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

export default firebase;