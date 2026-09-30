// src/utils/uploadImage.js
export const uploadToImgbb = async (imageFile) => {
  const apiKey = "d3401402d34ae72f398c77a7a79fdb40"; // Tu API Key colocada aquí
  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      return data.data.url; // Devuelve la URL de la imagen en la nube
    } else {
      throw new Error("No se pudo subir la imagen a Imgbb");
    }
  } catch (error) {
    console.error("Error al subir imagen:", error);
    return null;
  }
};