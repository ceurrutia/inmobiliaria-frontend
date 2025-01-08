import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import {
  Button,
  Modal,
  Alert,
  Form,
  Container,
} from "react-bootstrap";
import axios from "axios";

const AddNewProperty = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProperty, setNewProperty] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewProperty((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    axios
      .post("http://localhost:3000/api/properties", newProperty)
      .then(() => {
        setSuccessMessage("La propiedad se ha agregado exitosamente");
        setTimeout(() => setSuccessMessage(""), 3000);
        setShowAddModal(false);
        setNewProperty({});
      })
      .catch(() => {
        setErrorMessage("Error al agregar la propiedad");
      });
  };

  return (
    <Container>
      <Button variant="success" onClick={() => setShowAddModal(true)}>
        Agregar Nuevo
      </Button>

      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}

      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Nueva Propiedad</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={newProperty.nombre || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formImagen">
              <Form.Label>Imagen</Form.Label>
              <Form.Control
                type="text"
                name="imagen"
                value={newProperty.imagen || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formNombrePropietario">
              <Form.Label>Nombre del Propietario</Form.Label>
              <Form.Control
                type="text"
                name="nombre_propietario"
                value={newProperty.nombre_propietario || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formEmailPropietario">
              <Form.Label>Email del Propietario</Form.Label>
              <Form.Control
                type="text"
                name="email_propietario"
                value={newProperty.email_propietario || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formTelPropietario">
              <Form.Label>Telefono del Propietario</Form.Label>
              <Form.Control
                type="text"
                name="tel_propietario"
                value={newProperty.tel_propietario || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            
            <Form.Group controlId="formTipoOperacion">
              <Form.Label>Tipo de Operación</Form.Label>
              <Form.Control
                type="text"
                name="tipoOperacion"
                value={newProperty.tipoOperacion || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formTipoPropiedad">
              <Form.Label>Tipo de Propiedad</Form.Label>
              <Form.Control
                type="text"
                name="tipoPropiedad"
                value={newProperty.tipoPropiedad || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formBarrio">
              <Form.Label>Barrio</Form.Label>
              <Form.Control
                type="text"
                name="barrio"
                value={newProperty.barrio || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formCiudad">
              <Form.Label>Ciudad</Form.Label>
              <Form.Control
                type="text"
                name="ciudad"
                value={newProperty.ciudad || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formDescripcion">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type="text"
                name="descripcion"
                value={newProperty.descripcion || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formCantidadAmbientes">
              <Form.Label>Cantidad de Ambientes</Form.Label>
              <Form.Control
                type="number"
                name="cantidadAmbientes"
                value={newProperty.cantidadAmbientes || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formPrecio">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                name="precio"
                value={newProperty.precio || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formExpensas">
              <Form.Label>Expensas</Form.Label>
              <Form.Control
                type="number"
                name="expensas"
                value={newProperty.expensas || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formAmenities">
              <Form.Label>Amenities</Form.Label>
              <Form.Control
                type="text"
                name="amenities"
                value={newProperty.amenities || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formMetrosTotales">
              <Form.Label>Metros Totales</Form.Label>
              <Form.Control
                type="number"
                name="metrosTotales"
                value={newProperty.metrosTotales || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formEstado">
              <Form.Label>Estado</Form.Label>
              <Form.Control
                type="text"
                name="estado"
                value={newProperty.estado || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formAntiguedad">
              <Form.Label>Antigüedad</Form.Label>
              <Form.Control
                type="number"
                name="antiguedad"
                value={newProperty.antiguedad || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formFechaPublicacion">
              <Form.Label>Fecha de Publicación</Form.Label>
              <Form.Control
                type="date"
                name="fechaPublicacion"
                value={newProperty.fechaPublicacion || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={() => setShowAddModal(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Agregar nueva propiedad
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AddNewProperty;
