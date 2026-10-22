import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Ruta correcta según tu estructura (src/firebaseConfig.js)

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const productosRef = collection(db, "productos");
        const resp = await getDocs(productosRef);
        
        const listaProductos = resp.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }));

        setProductos(listaProductos);
      } catch (error) {
        console.error("Error al obtener productos de Firestore:", error);
      } finally {
        setCargando(false);
      }
    };

    obtenerProductos();
  }, []);

  if (cargando) return <p>Cargando productos...</p>;

  return (
    <div>
      <h1>Productos</h1>

      <div className="lista-productos">
        {productos.length === 0 ? (
          <p>No hay productos disponibles.</p>
        ) : (
          productos.map(prod => (
            <div key={prod.id}>
              {/* Usamos 'image' en lugar de 'imagen' */}
              {prod.image && (
                <img
                  src={prod.image}
                  alt={prod.title}
                  style={{ width: "100px" }}
                />
              )}
              {/* Usamos 'title', 'categoria' y 'price' tal como los guardaste en Firebase */}
              <h3>{prod.title}</h3>
              <p>Categoría: {prod.categoria}</p>
              <p>Precio: ${prod.price}</p>
              <hr />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Productos;