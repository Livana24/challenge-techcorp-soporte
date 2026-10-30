import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Nav } from "./Components/Nav";
import  Footer  from "./Components/Footer"; 
import { Home } from "./Components/Home/Home";
import { ProductosPage } from "./pages/ProductosPage";
import { CarritoPage } from "./pages/CarritoPage";
import { CartProvider } from "./Components/context/CartContext";
import { ProductoDetallePage } from "./pages/ProductoDetallePage";
import Cupon from './Components/Cupon';
import Contacto from "./Components/Contacto";
import Panel from "./pages/Panel";

function App() {
  return (
    <CartProvider>
     
      {/* El menú superior abarca todo el ancho */}
        <Nav />

        {/* Las rutas gestionan las páginas (el componente Home incluye el Banner) */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<ProductosPage />} />
          <Route path="/carrito" element={<CarritoPage />} />
          <Route path="/producto/:id" element={<ProductoDetallePage />} /> {/* <-- Sintaxis JSX correcta */}
          <Route path="/cupones" element={<Cupon />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/panel" element={<Panel />} />
        </Routes>

        {/* El pie de página abarca todo el ancho */}
        <Footer />
     
       
      
    </CartProvider>
      
    
  );
}

export default App;