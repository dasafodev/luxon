import firebase from 'firebase/app';
import 'firebase/auth'

export const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

try {
    firebase.initializeApp(firebaseConfig)
} catch (error) {
    if(!/already exist/.test(error.message)){
        console.error('Firebase initialization error',error.stack)
    }
    
}

export const loginWithGmail = () => { 
    const gmailProvider = new firebase.auth.GoogleAuthProvider()
    return firebase.auth().signInWithPopup(gmailProvider)
}

export default firebase;