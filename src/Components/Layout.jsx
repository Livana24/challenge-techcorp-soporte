import Nav from './Nav';
import HeroBanner from './HeroBanner';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="layout-wrapper">
      {/* 1. El Nav queda fuera del contenedor central -> Ocupa el 100% de la pantalla */}
      <Nav />

      {/* 2. El Banner queda fuera del contenedor central -> Ocupa el 100% de la pantalla */}
      <HeroBanner />

      {/* 3. Contenedor central: este sí tiene un max-width para que el contenido de los productos no se estire demasiado */}
      <main className="content-container">
        {children} 
      </main>

      {/* 4. El Footer queda fuera del contenedor central -> Ocupa el 100% de la pantalla */}
      <Footer />
    </div>
  );
};

export default Layout;