import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAHqiomS_Esw6nX4Ru6lmlcn9DNbu8o0ek",
  authDomain: "plantillassistemas.firebaseapp.com",
  projectId: "plantillassistemas",
  storageBucket: "plantillassistemas.appspot.com",
  messagingSenderId: "629903211568",
  appId: "1:629903211568:web:749ce80532b1699f6501f5",
  measurementId: "G-P352PJ8C85"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

export default firebaseApp;