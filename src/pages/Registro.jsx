import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore"; 
import { db } from "../firebaseConfig";
import { useAuth } from "../Components/context/AuthContext";
import styles from "./Login.module.css"; // Puedes usar los mismos estilos o crear Registro.module.css

const Registro = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  const { signup } = useAuth(); 
  
  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Creamos el usuario usando la función 'signup' del AuthContext
      const credencialUsuario = await signup(email, password);
      const user = credencialUsuario.user;

      // Guardamos los datos adicionales en Firestore usando el UID generado
      await setDoc(doc(db, "usuarios", user.uid), {
        nombre: nombre,
        apellido: apellido,
        rol: "usuario", 
        email: email
      });

      alert("¡Registro exitoso!");
      navigate("/");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        const quiereLoguearse = window.confirm(
          "Este correo electrónico ya está registrado. ¿Desea intentar iniciar sesión?"
        );

        if (quiereLoguearse) {
          navigate("/login");
        } else {
          navigate("/");
        }
      } else {
        setError(
          "Ocurrió un error al registrar el usuario. Verifique los datos e intente nuevamente."
        );
        console.error("Error en el registro:", error.message);
      }
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Crear una nueva cuenta</h2>
      <form onSubmit={handleRegister} className={styles.form}>
        <div className={styles.inputGroup || ""}>
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.inputGroup || ""}>
          <input
            type="text"
            placeholder="Apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.inputGroup || ""}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.inputGroup || ""}>
          <input
            type="password"
            placeholder="Contraseña (mínimo 6 caracteres)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        {error && <p style={{ color: "red", fontSize: "0.9rem", textAlign: "center" }}>{error}</p>}
        <button type="submit" className={styles.button}>Registrarse</button>
        <br/>
        <p className={styles.text}>
          ¿Ya tienes una cuenta? <Link to="/login" className={styles.link}>Inicia sesión</Link>
        </p>
      </form>
    </div>
  );
};

export default Registro;