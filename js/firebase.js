// ============================================================
// js/firebase.js
// Inicializa Firebase (una sola versión del SDK: 11.6.1) y exporta
// la app compartida y las instancias de auth, Firestore y Realtime Database.
// Las páginas importan de aquí; nunca llaman a initializeApp por su cuenta.
// ============================================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-database.js";
import { firebaseConfig } from '../config/firebase.config.js';

export const app = initializeApp(firebaseConfig);

export const db  = getFirestore(app);
export const auth = getAuth(app);
export const rtdb = getDatabase(app);
