import styles from "./FormProducto.module.css";

const FormProducto = ({
  manejarCambio,
  manejarEnvio,
  manejarCambioImagen,
  datosForm,
  cargando,
  esEdicion,
  errores = {}
}) => {
  return (
    <form className={styles.formulario} onSubmit={manejarEnvio} noValidate>
      {/* Campo Título / Nombre */}
      <div className={styles.grupoInput}>
        <label className={styles.label}>Título del producto</label>
        <input
          name="title"
          type="text"
          placeholder="Ej: Remera Classic Black"
          value={datosForm.title || ""}
          onChange={manejarCambio}
          className={`${styles.input} ${errores.title ? styles.inputError : ""}`}
        />
        {errores.title && <span className={styles.mensajeError}>{errores.title}</span>}
      </div>

      {/* Campo Precio */}
      <div className={styles.grupoInput}>
        <label className={styles.label}>Precio (AR$)</label>
        <input
          name="price"
          type="number"
          placeholder="Ej: 45000"
          value={datosForm.price || ""}
          onChange={manejarCambio}
          className={`${styles.input} ${errores.price ? styles.inputError : ""}`}
        />
        {errores.price && <span className={styles.mensajeError}>{errores.price}</span>}
      </div>

      {/* Campo Stock (Opcional según tu JSON, pero útil si lo manejas) */}
      <div className={styles.grupoInput}>
        <label className={styles.label}>Stock disponible</label>
        <input
          name="stock"
          type="number"
          placeholder="Ej: 10"
          value={datosForm.stock || ""}
          onChange={manejarCambio}
          className={`${styles.input} ${errores.stock ? styles.inputError : ""}`}
        />
        {errores.stock && <span className={styles.mensajeError}>{errores.stock}</span>}
      </div>

      {/* Campo Categoría */}
      <div className={styles.grupoInput}>
        <label className={styles.label}>Categoría</label>
        <select
          name="categoria"
          value={datosForm.categoria || ""}
          onChange={manejarCambio}
          className={`${styles.select} ${errores.categoria ? styles.inputError : ""}`}
        >
          <option value="" disabled>Selecciona una categoría</option>
          <option value="Mujeres">Mujeres</option>
          <option value="Hombres">Hombres</option>
          <option value="Niños">Niños</option>
        </select>
        {errores.categoria && <span className={styles.mensajeError}>{errores.categoria}</span>}
      </div>

      {/* Campo Imagen (URL o archivo según prefieras, adaptado a "image") */}
      <div className={styles.grupoInput}>
        <label className={styles.label}>
          {esEdicion ? "URL de Imagen (Opcional)" : "URL de la Imagen"}
        </label>
        <input
          name="image"
          type="text"
          placeholder="https://i.ibb.co/..."
          value={datosForm.image || ""}
          onChange={manejarCambio}
          className={`${styles.input} ${errores.image ? styles.inputError : ""}`}
        />
        {errores.image && <span className={styles.mensajeError}>{errores.image}</span>}
        
        {/* Vista previa si ya existe una imagen en edición */}
        {esEdicion && datosForm.image && (
          <div>
            <span style={{ fontSize: "0.75rem", color: "#666" }}>Imagen actual:</span>
            <br />
            <img src={datosForm.image} alt="Vista previa" className={styles.previewImagen} />
          </div>
        )}
      </div>

      {/* Botón dinámico */}
      <button type="submit" className={styles.botonSubmit} disabled={cargando}>
        {cargando
          ? "Procesando..."
          : esEdicion
          ? "Guardar Cambios"
          : "Crear Producto"}
      </button>
    </form>
  );
};

export default FormProducto;