import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Credenciales que copiaste de la consola de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCxeAhgm5x4t4iq1G3HDbGinMWqAySt9EQ",
  authDomain: "pruebatalentotech.firebaseapp.com",
  projectId: "pruebatalentotech",
  storageBucket: "pruebatalentotech.firebasestorage.app",
  messagingSenderId: "71960976343",
  appId: "1:71960976343:web:43ffb2c72e7f45f7714992"
};

// Inicializar la aplicación
const app = initializeApp(firebaseConfig);

// Exportar la instancia de Firestore para usarla en tus componentes
export const db = getFirestore(app);