import "../App.css";
import PropertyCard from "./PropertyCard";
import Footer from "./Footer";
import AddNewProperty from "./AddNewProperty";
import "bootstrap/dist/css/bootstrap.min.css";

const Propiedades = () => {
  return (
    <>
      <div className="container-fluid">
        <PropertyCard />
        <AddNewProperty />
      </div>
      <Footer />
    </>
  );
};

export default Propiedades;
