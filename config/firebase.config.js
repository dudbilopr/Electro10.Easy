// ============================================================
// ARCHIVO DE CONFIGURACIÓN PRIVADA — NO SUBIR A GIT
// Este archivo está en .gitignore
//
// ⚠️  SEGURIDAD: Aunque estas claves sean visibles para el
// cliente web (es normal en Firebase), protege tu proyecto
// configurando Firebase Security Rules en la consola:
// https://console.firebase.google.com/project/laboratorio-de-coulomb/firestore/rules
// ============================================================

export const firebaseConfig = {
    apiKey: "AIzaSyCI0c7KgnEAn-sV_CrHs0Er1LXL13CvQSA",
    authDomain: "laboratorio-de-coulomb.firebaseapp.com",
    projectId: "laboratorio-de-coulomb",
    storageBucket: "laboratorio-de-coulomb.firebasestorage.app",
    messagingSenderId: "525944850850",
    appId: "1:525944850850:web:eca9c0b79809358e8d8afb",
    measurementId: "G-SZECJNG25E"
};

// ID de la aplicación en Firestore (colección raíz)
export const APP_ID = 'electro10';

// Emails de los administradores maestros
export const ADMIN_EMAILS = [
    "dudbilopr@gmail.com",
    "dpabon180@unab.edu.co"
];

// ID de Google Analytics (gtag)
export const GA_ID = "G-EXGD1GSLLB";
