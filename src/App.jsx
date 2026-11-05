import { Routes, Route } from 'react-router-dom';
import { Nav } from "./Components/Nav";
import Footer from "./Components/Footer"; 
import { Home } from "./Components/Home/Home";
import { ProductosPage } from "./pages/ProductosPage";
import { CarritoPage } from "./pages/CarritoPage";
import { ProductoDetallePage } from "./pages/ProductoDetallePage";
import Cupon from './Components/Cupon';
import Contacto from "./Components/Contacto";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Panel from "./pages/Panel";
import RutaProtegida from "./Components/RutaProtegida";

function App() {
  return (
    <>
      {/* El menú superior abarca todo el ancho */}
      <Nav />

      {/* Las rutas gestionan las páginas */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<ProductosPage />} />
        <Route path="/carrito" element={<CarritoPage />} />
        <Route path="/producto/:id" element={<ProductoDetallePage />} />
        <Route path="/cupones" element={<Cupon />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route 
          path="/panel" 
          element={
            <RutaProtegida rolesPermitidos={['admin']}>
              <Panel />
            </RutaProtegida>
          } 
        />
      </Routes>

      {/* El pie de página abarca todo el ancho */}
      <Footer />
    </>
  );
}

export default App;