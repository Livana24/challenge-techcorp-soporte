import { useState, useEffect } from "react";
import FormProducto from "./FormProducto";
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from "../firebaseConfig";

const estadoInicial = {
  nombre: "",
  title: "",
  precio: "",
  stock: "",
  categoria: "",
  descripcion: "",
  imagen: "",
  image: ""
};

const FormProductContainer = ({ productoAEditar, onProductoAgregado }) => {
  const [datosForm, setDatosForm] = useState(estadoInicial);
  const [imagenArchivo, setImagenArchivo] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [errores, setErrores] = useState({});

  useEffect(() => {
    if (productoAEditar) {
      setDatosForm({
        ...productoAEditar,
        nombre: productoAEditar.nombre || productoAEditar.title || "",
        title: productoAEditar.title || productoAEditar.nombre || "",
        precio: productoAEditar.precio || productoAEditar.price || "",
        stock: productoAEditar.stock || "",
        categoria: productoAEditar.categoria || productoAEditar.category || "",
        descripcion: productoAEditar.descripcion || "",
        imagen: productoAEditar.imagen || productoAEditar.image || "",
        image: productoAEditar.image || productoAEditar.imagen || ""
      });
    } else {
      setDatosForm(estadoInicial);
    }
    setErrores({});
  }, [productoAEditar]);

  const manejarCambio = (evento) => {
    const { name, value } = evento.target;
    setDatosForm(prev => {
      const nuevoEstado = { ...prev, [name]: value };
      if (name === "nombre") nuevoEstado.title = value;
      if (name === "title") nuevoEstado.nombre = value;
      if (name === "precio") nuevoEstado.price = value;
      if (name === "price") nuevoEstado.precio = value;
      if (name === "imagen") nuevoEstado.image = value;
      if (name === "image") nuevoEstado.imagen = value;
      return nuevoEstado;
    });

    if (errores[name]) {
      setErrores(prev => ({ ...prev, [name]: null }));
    }
  };

  const manejarCambioImagen = (evento) => {
    const archivo = evento.target.files[0];
    setImagenArchivo(archivo);
    if (archivo && errores.imagen) {
      setErrores(prev => ({ ...prev, imagen: null, image: null }));
    }
  };

  const validarFormulario = () => {
    const nuevosErrores = {};
    const nombreProd = datosForm.nombre || datosForm.title || "";
    if (!nombreProd.trim()) {
      nuevosErrores.nombre = "El nombre no puede quedar vacío.";
    }

    const precioProd = datosForm.precio;
    if (precioProd === "" || precioProd === undefined || precioProd === null) {
      nuevosErrores.precio = "El precio no puede quedar vacío.";
    } else if (Number(precioProd) <= 0) {
      nuevosErrores.precio = "El precio debe ser mayor a 0.";
    }

    if (datosForm.stock === "" || datosForm.stock === undefined || datosForm.stock === null) {
      nuevosErrores.stock = "El stock no puede quedar vacío.";
    } else if (Number(datosForm.stock) < 0) {
      nuevosErrores.stock = "El stock no puede ser un número negativo.";
    }

    if (!datosForm.categoria) {
      nuevosErrores.categoria = "Por favor selecciona una categoría.";
    }

    const urlImagen = datosForm.imagen || datosForm.image || "";
    if (!productoAEditar && !imagenArchivo && !urlImagen.trim()) {
      nuevosErrores.imagen = "Debes ingresar una URL de imagen o seleccionar un archivo.";
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const subirImagenImgbb = async (file) => {
    const apiKey = "4bc89d90e5ba2ca799b0f1339650ce18";
    const formData = new FormData();
    formData.append("image", file);

    const respuesta = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: formData,
    });

    const datos = await respuesta.json();
    if (!datos.success) throw new Error("Error al subir la imagen");
    return datos.data.url;
  };

  const manejarEnvio = async (evento) => {
    evento.preventDefault();
    if (!validarFormulario()) return;

    setCargando(true);
    try {
      let urlImagen = datosForm.imagen || datosForm.image || "";

      if (imagenArchivo) {
        urlImagen = await subirImagenImgbb(imagenArchivo);
      }

      const nombreFinal = datosForm.nombre || datosForm.title;
      const precioFinal = Number(datosForm.precio);
      const stockFinal = Number(datosForm.stock);
      const categoriaFinal = datosForm.categoria.trim();
      const descripcionFinal = datosForm.descripcion ? datosForm.descripcion.trim() : "-";

      const datosAEnviar = {
        title: nombreFinal,
        nombre: nombreFinal,
        price: precioFinal,
        precio: precioFinal,
        stock: stockFinal,
        categoria: categoriaFinal,
        descripcion: descripcionFinal,
        image: urlImagen,
        imagen: urlImagen
      };

      if (productoAEditar) {
        const docRef = doc(db, "productos", productoAEditar.id);
        await updateDoc(docRef, datosAEnviar);

        alert("¡Producto actualizado con éxito!");
        if (onProductoAgregado) {
          onProductoAgregado({ id: productoAEditar.id, ...datosAEnviar }, true);
        }
      } else {
        const docRef = await addDoc(collection(db, "productos"), datosAEnviar);

        alert("¡Producto guardado con éxito!");
        if (onProductoAgregado) {
          onProductoAgregado({ id: docRef.id, ...datosAEnviar }, false);
        }
      }

      setDatosForm(estadoInicial);
      setImagenArchivo(null);

    } catch (error) {
      console.error("Error en el envío:", error);
      alert("Hubo un error al procesar la operación en Firebase.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div>
      <FormProducto
        manejarCambio={manejarCambio}
        manejarEnvio={manejarEnvio}
        manejarCambioImagen={manejarCambioImagen}
        datosForm={datosForm}
        cargando={cargando}
        esEdicion={!!productoAEditar}
        errores={errores}
      />
    </div>
  );
};

export default FormProductContainer;