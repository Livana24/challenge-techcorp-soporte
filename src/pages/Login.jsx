import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../Components/context/AuthContext";
import { db } from "../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore"; // <-- Asegúrate de importar setDoc

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  const { login } = useAuth(); 

  const manejarLogin = async (evento) => {
    evento.preventDefault();
    
    const correoActual = email;
    const passActual = password;

    setEmail("");
    setPassword("");

    try {
      // 1. Iniciamos sesión en Firebase Auth
      const credencialUsuario = await login(correoActual, passActual);
      const user = credencialUsuario.user;

      console.log("UID actual en Auth:", user.uid);

      // 2. Consultamos Firestore usando el UID del usuario logueado
      const userDocRef = doc(db, "usuarios", user.uid);
      let userDocSnap = await getDoc(userDocRef);

      // Si el documento no existe, lo crea automáticamente con los datos de admin
      if (!userDocSnap.exists()) {
        const nuevoPerfil = {
          nombre: "Ivana",
          admin: "Hinojosa",
          rol: "admin"
        };
        await setDoc(userDocRef, nuevoPerfil);
        userDocSnap = await getDoc(userDocRef);
      }

      const userData = userDocSnap.data();

      // 3. Verificamos si es administrador
      if (userData.rol === "admin") {
        alert("¡Bienvenido Administrador!");
        navigate("/panel"); // Redirige directo a tu componente Panel
      } else {
        alert("No tienes permisos de administrador.");
      }

    } catch (error) {
      console.error("Error en el login:", error.code, error.message);
      alert("Error: " + error.message);
    }
  };

  const manejarLimpiar = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={manejarLogin}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(evento) => setEmail(evento.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(evento) => setPassword(evento.target.value)}
        />
        
        <button type="submit">Ingresar</button>
        
        <button type="button" onClick={manejarLimpiar} style={{ marginLeft: "10px" }}>
          Limpiar
        </button>

        <br/><br/>
        No estás registrado? <Link to="/registro">Regístrate</Link>
      </form>
    </div>
  );
};

export default Login;