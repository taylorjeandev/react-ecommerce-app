// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCdUnwF1U5394MSBbz0cz0QI6ww6qbRwPc",
    authDomain: "family-storefront.firebaseapp.com",
    projectId: "family-storefront",
    storageBucket: "family-storefront.appspot.com",
    messagingSenderId: "660232702544",
    appId: "1:660232702544:web:4088e8a6fd8cbbdc611f55",
    measurementId: "G-27JGWT1GRT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;