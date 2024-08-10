import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDMfiAb9H2IjyAEIiNqLobwmkV0xGkgX2c",
    authDomain: "buy-sell-corner-fullstack.firebaseapp.com",
    projectId: "buy-sell-corner-fullstack",
    storageBucket: "buy-sell-corner-fullstack.appspot.com",
    messagingSenderId: "915024696469",
    appId: "1:915024696469:web:fd520ba12f20c1fcdaf79c",
    measurementId: "G-74WPKPFJWE"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

