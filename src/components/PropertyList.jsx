import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Table, Button, Modal, Alert, Container, Form } from "react-bootstrap";
import axios from "axios";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [currentProperty, setCurrentProperty] = useState(null);

  // Fetch de la API
  useEffect(() => {
    axios
      .get("https://inmobiliaria-backend-kappa.vercel.app/api/properties")
      .then((response) => {
        setProperties(response.data);
      })
      .catch(() => {
        setErrorMessage("Error al cargar las propiedades");
      });
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "¿Está seguro de que desea eliminar esta propiedad? Esta acción no se puede deshacer."
    );
    if (confirmDelete) {
      axios
        .delete(`http://localhost:3000/api/properties/${id}`)
        .then(() => {
          setProperties(properties.filter((property) => property._id !== id));
        })
        .catch(() => {
          setErrorMessage("Error al eliminar la propiedad");
        });
    }
  };

  const handleEdit = (property) => {
    setCurrentProperty({ ...property });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentProperty(null);
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setCurrentProperty((prev) => {
      const updatedProperty = { ...prev };
      const keys = name.split(".");

      if (keys.length === 1) {
        updatedProperty[keys[0]] = value;
      } else if (keys.length === 2) {
        updatedProperty[keys[0]] = {
          ...updatedProperty[keys[0]],
          [keys[1]]: value,
        };
      }

      return updatedProperty;
    });
  };

  const handleSave = () => {
    axios
      .put(
        `http://localhost:3000/api/properties/${currentProperty._id}`,
        currentProperty
      )
      .then(() => {
        setProperties(
          properties.map((property) =>
            property._id === currentProperty._id ? currentProperty : property
          )
        );
        setShowModal(false);
        setSuccessMessage("La propiedad se ha modificado exitosamente");
        setTimeout(() => setSuccessMessage(""), 3000); 
      })
      .catch(() => {
        setErrorMessage("Error al guardar la propiedad");
      });
  };

  return (
    <Container fluid>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Tipo de operacion</th>
            <th>Tipo de propiedad</th>
            <th>Barrio</th>
            <th>Ciudad</th>
            <th>Cantidad Ambientes</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Expensas</th>
            <th>Amenities</th>
            <th>Antiguedad</th>
            <th>Metros2 Totales</th>
            <th>Estado</th>
            <th>Fecha de Publicacion</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property) => (
            <tr key={property._id}>
              <td>
                <img
                  src={property.imagen}
                  className="img-fluid"
                  style={{ maxWidth: "100px", height: "auto" }}
                />
              </td>
              <td>{property.tipoOperacion}</td>
              <td>{property.tipoPropiedad}</td>
              <td>{property.barrio}</td>
              <td>{property.ciudad}</td>
              <td>{property.cantidadAmbientes}</td>
              <td>{property.nombre}</td>
              <td>{property.descripcion}</td>
              <td>{property.precio}</td>
              <td>{property.expensas}</td>
              <td>{property.amenities}</td>
              <td>{property.antiguedad}</td>
              <td>{property.metrosTotales}</td>
              <td>{property.estado}</td>
              <td>{property.fechaPublicacion}</td>
              <td>
                <Button
                  variant="secondary"
                  onClick={() => handleEdit(property)}
                  className="mr-2"
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(property._id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Propiedad</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorMessage ? (
            <Alert variant="danger">{errorMessage}</Alert>
          ) : (
            currentProperty && (
              <Form>
                <Form.Group controlId="formOperacion">
                  <Form.Label>Tipo de operacion</Form.Label>
                  <Form.Control
                    type="text"
                    name="tipoOperacion"
                    value={currentProperty.tipoOperacion || ""}
                    onChange={handleFormChange}
                  />
                </Form.Group>

                <Form.Group controlId="formPropiedad">
                  <Form.Label>Tipo de propiedad</Form.Label>
                  <Form.Control
                    type="text"
                    name="tipoPropiedad"
                    value={currentProperty.tipoPropiedad || ""}
                    onChange={handleFormChange}
                  />
                </Form.Group>

                <Form.Group controlId="formBarrio">
                  <Form.Label>Barrio</Form.Label>
                  <Form.Control
                    type="text"
                    name="barrio"
                    value={currentProperty.barrio || ""}
                    onChange={handleFormChange}
                  />
                </Form.Group>
                <Form.Group controlId="formCiudad">
                  <Form.Label>Ciudad</Form.Label>
                  <Form.Control
                    type="text"
                    name="ciudad"
                    value={currentProperty.ciudad || ""}
                    onChange={handleFormChange}
                  />
                </Form.Group>

                <Form.Group controlId="formNombre">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    name="nombre"
                    value={currentProperty.nombre || ""}
                    onChange={handleFormChange}
                  />
                </Form.Group>

                <Form.Group controlId="formDescripcion">
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control
                    type="text"
                    name="descripcion"
                    value={currentProperty.descripcion || ""}
                    onChange={handleFormChange}
                  />
                </Form.Group>

                <Form.Group controlId="formPrecio">
                  <Form.Label>Precio</Form.Label>
                  <Form.Control
                    type="number"
                    name="precio"
                    value={currentProperty.precio || ""}
                    onChange={handleFormChange}
                  />
                </Form.Group>

                <Form.Group controlId="formExpensas">
                  <Form.Label>Expensas</Form.Label>
                  <Form.Control
                    type="number"
                    name="expensas"
                    value={currentProperty.expensas || ""}
                    onChange={handleFormChange}
                  />
                </Form.Group>

                <Form.Group controlId="formAmenities">
                  <Form.Label>Amenities</Form.Label>
                  <Form.Control
                    type="text"
                    name="amenities"
                    value={currentProperty.amenities || ""}
                    onChange={handleFormChange}
                  />
                </Form.Group>

                <Form.Group controlId="formMetrosTotales">
                  <Form.Label>Metros2 Totales</Form.Label>
                  <Form.Control
                    type="number"
                    name="metrosTotales"
                    value={currentProperty.metrosTotales || ""}
                    onChange={handleFormChange}
                  />
                </Form.Group>

                <Form.Group controlId="formEstado">
                  <Form.Label>Estado</Form.Label>
                  <Form.Control
                    type="text"
                    name="estado"
                    value={currentProperty.estado || ""}
                    onChange={handleFormChange}
                  />
                </Form.Group>

                <Form.Group controlId="formFechaPublicacion">
                  <Form.Label>Fecha de Publicación</Form.Label>
                  <Form.Control
                    type="date"
                    name="fechaPublicacion"
                    value={currentProperty.fechaPublicacion || ""}
                    onChange={handleFormChange}
                  />
                </Form.Group>

                <Form.Group controlId="formUbicacionBarrio">
                  <Form.Label>Barrio</Form.Label>
                  <Form.Control
                    type="text"
                    name="ubicacion.barrio"
                    value={currentProperty.ubicacion?.barrio || ""}
                    onChange={handleFormChange}
                  />
                </Form.Group>

                <Form.Group controlId="formUbicacionCiudad">
                  <Form.Label>Ciudad</Form.Label>
                  <Form.Control
                    type="text"
                    name="ubicacion.ciudad"
                    value={currentProperty.ubicacion?.ciudad || ""}
                    onChange={handleFormChange}
                  />
                </Form.Group>
              </Form>
            )
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default PropertyList;
