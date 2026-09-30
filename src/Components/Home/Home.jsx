import { ItemListContainer } from '../ItemListContainer';
import './Home.css';

export const Home = () => {
  return (
    <div className="home-container">
      <section className="hero-section">
        {/* Video apuntando al archivo en la carpeta public */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="background-video"
        >
          <source src="/background.mp4" type="video/mp4" />
          Tu navegador no soporta videos HTML5.
        </video>

        {/* Capa oscura semitransparente */}
        <div className="hero-overlay"></div>

        {/* Contenido de texto */}
        <div className="hero-content">
          <h2>¡Bienvenidos a tu Tienda de Indumentaria!</h2>
          <p>Encuentra las últimas tendencias en moda para hombres, mujeres y niños.</p>
        </div>
      </section>

      <ItemListContainer />
    </div>
  );
};
