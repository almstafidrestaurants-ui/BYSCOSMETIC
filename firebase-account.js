import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import {
    getAuth, createUserWithEmailAndPassword, reload, signInWithCustomToken, signOut
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

async function verificationRequest(path, body, user) {
    const response = await fetch("https://almstafid.com/bysauthapi/" + path, {
        method: "POST",
        signal: AbortSignal.timeout(25000),
        headers: {
            ...(user ? { Authorization: "Bearer " + await user.getIdToken() } : {}),
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });
    if (!response.ok) throw new Error(String(response.status));
    return response.json().catch(() => ({}));
}

export const account = {
    get user() { return auth.currentUser; },
    observe: callback => auth.onAuthStateChanged(callback),
    register: (email, password) => createUserWithEmailAndPassword(auth, email, password),
    sendVerification: (email, challengeId, login) => verificationRequest("send", { email, challengeId, login }),
    verifyCode: (email, code, challengeId, login) => verificationRequest("verify", { email, code, challengeId, login }),
    signIn: token => signInWithCustomToken(auth, token),
    signOut: () => signOut(auth),
    async activate(user, registrationToken) {
        await verificationRequest("activate", { registrationToken }, user);
        await reload(user);
        await user.getIdToken(true);
    },
    notifyRegistration: (user, notice) => verificationRequest("notify-registration", notice, user),
    async read(user) {
        return (await getDoc(profileDoc(user))).data() || {};
    },
    write: (user, profile) => setDoc(profileDoc(user), profile)
};
