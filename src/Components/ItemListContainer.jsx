import React, { useState, useEffect } from "react";
import { Item } from "./Item";
import styles from "./ItemListContainer.module.css";

export const ItemListContainer = () => {
  const [productos, setProductos] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");

  useEffect(() => {
    fetch("/productos.json")
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error("Error al cargar productos:", error));
  }, []);

  const productosFiltrados = categoriaSeleccionada
    ? productos.filter((p) => p.categoria.toLowerCase() === categoriaSeleccionada.toLowerCase())
    : productos;

  const categorias = ["Hombres", "Mujeres", "Niños"];

  return (
    <div className={styles.container}>
      {/* Panel de filtros */}
      <div className={styles.filters}>
        <h3 className={styles.filterTitle}>Categorías</h3>
        <div className={styles.filterButtons}>
          <button
            className={`${styles.filterBtn} ${categoriaSeleccionada === "" ? styles.active : ""}`}
            onClick={() => setCategoriaSeleccionada("")}
          >
            Todos
          </button>
          {categorias.map((cat) => (
            <button
              key={cat}
              className={`${styles.filterBtn} ${categoriaSeleccionada === cat ? styles.active : ""}`}
              onClick={() => setCategoriaSeleccionada(categoriaSeleccionada === cat ? "" : cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grilla de productos */}
      <div className={styles.grid}>
        {productosFiltrados.length > 0 ? (
          productosFiltrados.map((prod) => <Item key={prod.id} producto={prod} />)
        ) : (
          <p>No hay productos disponibles para esta categoría.</p>
        )}
      </div>
    </div>
  );
};