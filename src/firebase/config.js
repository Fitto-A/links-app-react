import firebase from 'firebase/app'
import 'firebase/firestore'


// Your web app's Firebase configuration
var firebaseConfig = {
apiKey: "AIzaSyBYwK_iSH5QxWLYzVP8lBJmWMhYeRZoqXA",
authDomain: "links-app-firebase.firebaseapp.com",
projectId: "links-app-firebase",
storageBucket: "links-app-firebase.appspot.com",
messagingSenderId: "530532486382",
appId: "1:530532486382:web:a450aeee0ebd6e25c3b7ff"
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);

export const db = fb.firestore();






