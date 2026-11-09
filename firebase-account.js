import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import {
    getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, reload
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const app = initializeApp({
    apiKey: "AIzaSyD3yckhrfXDbJGzzimy7ri0iZCsGYAEdWU",
    authDomain: "bys-cosmetic.firebaseapp.com",
    projectId: "bys-cosmetic",
    storageBucket: "bys-cosmetic.firebasestorage.app",
    messagingSenderId: "255569844331",
    appId: "1:255569844331:web:9f14b8df3876b391d0792e"
});
const auth = getAuth(app);
const db = getFirestore(app);
const profileDoc = user => doc(db, "profiles", user.uid);

export const account = {
    get user() { return auth.currentUser; },
    observe: callback => auth.onAuthStateChanged(callback),
    register: (email, password) => createUserWithEmailAndPassword(auth, email, password),
    login: (email, password) => signInWithEmailAndPassword(auth, email, password),
    sendVerification: user => sendEmailVerification(user),
    refresh: user => reload(user),
    logout: () => auth.signOut(),
    async read(user) {
        return (await getDoc(profileDoc(user))).data() || {};
    },
    write: (user, profile) => setDoc(profileDoc(user), profile)
};
