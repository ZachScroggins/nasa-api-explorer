import firebase from 'firebase/app';
// // import 'firebase/auth' // If you need it
// // import 'firebase/firestore' // If you need it
// // import 'firebase/storage' // If you need it
// // import 'firebase/analytics'; // If you need it

const clientCredentials = {
  // TODO: Replace the following with your app's Firebase project configuration
  apiKey: 'AIzaSyBC_J93OrsseqBMi4gi5TQBmIl5v0nucaA',
  authDomain: 'nasa-api-explorer.firebaseapp.com',
  databaseURL: 'https://nasa-api-explorer.firebaseio.com',
  projectId: 'nasa-api-explorer',
  storageBucket: 'nasa-api-explorer.appspot.com',
  messagingSenderId: '1052395961928',
  appId: '1:1052395961928:web:c03cc2f0e0cbd2e674227d',
};

// // Check that `window` is in scope for the analytics module!
// if (typeof window !== 'undefined' && !firebase.apps.length) {
//   firebase.initializeApp(clientCredentials);
//   // To enable analytics. https://firebase.google.com/docs/analytics/get-started
//   if ('measurementId' in clientCredentials) firebase.analytics();
// }

firebase.initializeApp(clientCredentials);

export default firebase;
