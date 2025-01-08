import "../App.css";
import Footer from "./Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Login";


const Inicio = () => {
  return (
    <>
      <div className="container-fluid">
        <Login />
       
      </div>
      <Footer />
    </>
  );
};

export default Inicio;
