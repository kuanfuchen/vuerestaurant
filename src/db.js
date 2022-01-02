import firebase from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import "firebase/firestore";

let config = {
  projectId: "enhanced-bonito-205902",
};
// apiKey: "AIzaSyBnSeu-dstPeXwFGe90PzlwSeAVSLM42KA",
// authDomain: "enhanced-bonito-205902.firebaseapp.com",
// databaseURL: "https://enhanced-bonito-205902.firebaseio.com",
// storageBucket: "enhanced-bonito-205902.appspot.com",
// messagingSenderId: "464374520999",
// appId: "1:464374520999:web:f18ceb5ef0957059cf8f82"
// 
// eslint-disable-next-line import/prefer-default-export
// const app = initializeApp(config)
// const app = firebase.initializeApp(config);
// export const db = getDatabase(app);
// export const firebaseAuth = firebase.auth();
firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

export const db = firebase.firestore();

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyA0J-HScKBKeNa4gwX8wuXzOzgtmIpKoAA",
//   authDomain: "vuerestaurant-71e06.firebaseapp.com",
//   databaseURL: "https://vuerestaurant-71e06-default-rtdb.firebaseio.com",
//   projectId: "vuerestaurant-71e06",
//   storageBucket: "vuerestaurant-71e06.appspot.com",
//   messagingSenderId: "477478259368",
//   appId: "1:477478259368:web:bbbe1b92dc6713d95c109d",
//   measurementId: "G-PQDQ7R2H73"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);