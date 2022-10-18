import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAdv-ljckfswoVipC--8elPFPfR7OQWsdo",
    authDomain: "kepp-it.firebaseapp.com",
    projectId: "kepp-it",
    storageBucket: "kepp-it.appspot.com",
    messagingSenderId: "258005276421",
    appId: "1:258005276421:web:7d375f6f1759464ae6096c",
    measurementId: "G-D04XWX7RSH"
  };

const app = initializeApp(firebaseConfig);

export default app;