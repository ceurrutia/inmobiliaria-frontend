import '../App.css';

const Footer = () => {
    return (
        <footer className="custom-footer py-3">
        <div className="container text-center">
          <p className="mb-0">&copy; {new Date().getFullYear()} Inmobiliaria Lois. Todos los derechos reservados.</p>
        </div>
      </footer>
    );
  }

  export default Footer;
