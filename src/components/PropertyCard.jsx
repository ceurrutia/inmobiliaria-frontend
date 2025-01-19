import '../App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import {
  Button,
  Container,
  Form,
  Card,
  Row,
  Col,
  Alert,
  Modal,
} from "react-bootstrap";
import axios from "axios";
import AddNewProperty from "./AddNewProperty";

const CardProperty = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [propietarios, setPropietarios] = useState([]);
  const [barrios, setBarrios] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const [tipoOperacion, setTipoOperacion] = useState([]);
  const [selectedPropietario, setSelectedPropietario] = useState("");
  const [selectedBarrio, setSelectedBarrio] = useState("");
  const [selectedCiudad, setSelectedCiudad] = useState("");
  const [selectedTipoOperacion, setSelectedTipoOperacion] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [editForm, setEditForm] = useState({
    nombre: "",
    nombre_propietario: "",
    email_propietario: "",
    tel_propietario: "",
    barrio: "",
    ciudad: "",
    tipoOperacion: "",
    tipoPropiedad: "",
    descripcion: "",
    cantidadAmbientes: "",
    precio: "",
    expensas: "",
    amenities: "",
    metrosTotales: "",
    estado: "",
    antiguedad: "",
    fechaPublicacion: "",
  });

  useEffect(() => {
    axios
      .get("https://inmobiliaria-backend-kappa.vercel.app/api/properties")
      .then((response) => {
        const data = response.data;
        console.log(data);

        setProperties(data);
        setFilteredProperties(data);
        setPropietarios([
          ...new Set(data.map((prop) => prop.nombre_propietario)),
        ]);
        setBarrios([...new Set(data.map((prop) => prop.barrio))]);
        setCiudades([...new Set(data.map((prop) => prop.ciudad))]);
        setTipoOperacion([...new Set(data.map((prop) => prop.tipoOperacion))]);
      })
      .catch(() => {
        setErrorMessage("Error al cargar las propiedades");
      });
  }, []);

  const handleSearch = () => {
    const filtered = properties.filter(
      (property) =>
        (selectedBarrio ? property.barrio === selectedBarrio : true) &&
        (selectedCiudad ? property.ciudad === selectedCiudad : true) &&
        (selectedPropietario
          ? property.nombre_propietario === selectedPropietario
          : true) &&
        (selectedTipoOperacion
          ? property.tipoOperacion === selectedTipoOperacion
          : true)
    );
    setFilteredProperties(filtered);
  };

  const handleEdit = (property) => {
    setSelectedProperty(property);
    setEditForm({
      nombre: property.nombre,
      nombre_propietario: property.nombre_propietario,
      email_propietario: property.email_propietario,
      tel_propietario: property.tel_propietario,
      barrio: property.barrio,
      ciudad: property.ciudad,
      tipoOperacion: property.tipoOperacion,
      tipoPropiedad: property.tipoPropiedad,
      descripcion: property.descripcion,
      cantidadAmbientes: property.cantidadAmbientes,
      precio: property.precio,
      expensas: property.expensas,
      amenities: property.amenities,
      metrosTotales: property.metrosTotales,
      estado: property.estado,
      antiguedad: property.antiguedad,
      fechaPublicacion: property.fechaPublicacion,
    });
    setShowEditModal(true);
  };

  const handleDelete = (property) => {
    setSelectedProperty(property);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    axios
      .delete(`http://localhost:3000/api/properties/${selectedProperty._id}`)
      .then(() => {
        setProperties(
          properties.filter((prop) => prop._id !== selectedProperty._id)
        );
        setFilteredProperties(
          filteredProperties.filter((prop) => prop._id !== selectedProperty._id)
        );
        setShowDeleteModal(false);
      })
      .catch(() => {
        setErrorMessage("Error al eliminar la propiedad");
      });
  };

  const handleEditChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  const saveChanges = () => {
    axios
      .put(
        `http://localhost:3000/api/properties/${selectedProperty._id}`,
        editForm
      )
      .then(() => {
        setProperties(
          properties.map((prop) =>
            prop._id === selectedProperty._id ? { ...prop, ...editForm } : prop
          )
        );
        setFilteredProperties(
          filteredProperties.map((prop) =>
            prop._id === selectedProperty._id ? { ...prop, ...editForm } : prop
          )
        );
        setShowEditModal(false);
      })
      .catch(() => {
        setErrorMessage("Error al actualizar la propiedad");
      });
  };

  return (
    <Container fluid>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

      <Form>
        <Row className="mb-4">
          <Col md={4}>
            <Form.Group controlId="formBarrio">
              <Form.Label>Seleccione Propietario</Form.Label>
              <Form.Control
                as="select"
                value={selectedPropietario}
                onChange={(e) => setSelectedPropietario(e.target.value)}
              >
                <option value="">Todos</option>
                {propietarios.map((propietario, index) => (
                  <option key={index} value={propietario}>
                    {propietario}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formBarrio">
              <Form.Label>Seleccione Barrio</Form.Label>
              <Form.Control
                as="select"
                value={selectedBarrio}
                onChange={(e) => setSelectedBarrio(e.target.value)}
              >
                <option value="">Todos</option>
                {barrios.map((barrio, index) => (
                  <option key={index} value={barrio}>
                    {barrio}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="formCiudad">
              <Form.Label>Seleccione Ciudad</Form.Label>
              <Form.Control
                as="select"
                value={selectedCiudad}
                onChange={(e) => setSelectedCiudad(e.target.value)}
              >
                <option value="">Todas</option>
                {ciudades.map((ciudad, index) => (
                  <option key={index} value={ciudad}>
                    {ciudad}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formTipoOperacion">
              <Form.Label>Seleccione Tipo de Operacion</Form.Label>
              <Form.Control
                as="select"
                value={selectedTipoOperacion}
                onChange={(e) => setSelectedTipoOperacion(e.target.value)}
              >
                <option value="">Todas</option>
                {tipoOperacion.map((tipoOperacion, index) => (
                  <option key={index} value={tipoOperacion}>
                    {tipoOperacion}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={4} className="d-flex align-items-end">
            <Button variant="secondary" onClick={handleSearch}>
              Buscar
            </Button>

            <AddNewProperty />
          </Col>
        </Row>
      </Form>

      <hr></hr>
      <h3>Propiedades registradas en el sistema</h3>
      <Row>
        {filteredProperties.map((property) => (
          <Col md={4} key={property._id}>
            <Card className="mb-4">
              <Card.Img
                variant="top"
                src={property.imagen}
                className="img-fluid"
                style={{ maxHeight: "200px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{property.nombre}</Card.Title>
                <Card.Text>
                  <strong>Propietario:</strong> {property.nombre_propietario}{" "}
                  <br />
                  <strong>Email del propietario:</strong>{" "}
                  {property.email_propietario} <br />
                  <strong>Telefono del Propietario:</strong>{" "}
                  {property.tel_propietario} <br />
                  <strong>Barrio:</strong> {property.barrio} <br />
                  <strong>Ciudad:</strong> {property.ciudad} <br />
                  <strong>Tipo de Operación:</strong> {property.tipoOperacion}{" "}
                  <br />
                  <strong>Tipo de Propiedad:</strong> {property.tipoPropiedad}{" "}
                  <br />
                  <strong>Descripción:</strong> {property.descripcion} <br />
                  <strong>Cantidad Ambientes:</strong>{" "}
                  {property.cantidadAmbientes} <br />
                  <strong>Precio:</strong> {property.precio} <br />
                  <strong>Expensas:</strong> {property.expensas} <br />
                  <strong>Amenities:</strong> {property.amenities} <br />
                  <strong>Metros² Totales:</strong> {property.metrosTotales}{" "}
                  <br />
                  <strong>Estado:</strong> {property.estado} <br />
                  <strong>Antigüedad:</strong> {property.antiguedad} <br />
                  <strong>Fecha de Publicación:</strong>{" "}
                  {property.fechaPublicacion} <br />
                </Card.Text>
                <Button
                  variant="dark"
                  onClick={() => handleEdit(property)}
                  className="me-2"
                >
                  Editar
                </Button>
                <Button variant="danger" onClick={() => handleDelete(property)}>
                  Eliminar
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal de editar propiedad */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Propiedad</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="editNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={editForm.nombre}
                onChange={handleEditChange}
              />
            </Form.Group>

            <Form.Group controlId="editNombrePropietario">
              <Form.Label>Nombre propietario</Form.Label>
              <Form.Control
                type="text"
                name="nombre_propietario"
                value={editForm.nombre_propietario}
                onChange={handleEditChange}
              />
            </Form.Group>

            <Form.Group controlId="editEmailPropietario">
              <Form.Label>Email propietario</Form.Label>
              <Form.Control
                type="text"
                name="email_propietario"
                value={editForm.email_propietario}
                onChange={handleEditChange}
              />
            </Form.Group>

            <Form.Group controlId="editTelPropietario">
              <Form.Label>Telefono propietario</Form.Label>
              <Form.Control
                type="text"
                name="tel_propietario"
                value={editForm.tel_propietario}
                onChange={handleEditChange}
              />
            </Form.Group>

            <Form.Group controlId="editImagen">
              <Form.Label>Imagen</Form.Label>
              <Form.Control
                type="text"
                name="imagen"
                value={editForm.imagen}
                onChange={handleEditChange}
              />
            </Form.Group>

            <Form.Group controlId="editBarrio">
              <Form.Label>Barrio</Form.Label>
              <Form.Control
                type="text"
                name="barrio"
                value={editForm.barrio}
                onChange={handleEditChange}
              />
            </Form.Group>

            <Form.Group controlId="editCiudad">
              <Form.Label>Ciudad</Form.Label>
              <Form.Control
                type="text"
                name="ciudad"
                value={editForm.ciudad}
                onChange={handleEditChange}
              />
            </Form.Group>

            <Form.Group controlId="editTipoOperacion">
              <Form.Label>Tipo de Operacion</Form.Label>
              <Form.Control
                type="text"
                name="tipoOperacion"
                value={editForm.tipoOperacion}
                onChange={handleEditChange}
              />
            </Form.Group>

            <Form.Group controlId="EditDescripcion">
              <Form.Label>Tipo de Propiedad</Form.Label>
              <Form.Control
                type="text"
                name="tipoPropiedad"
                value={editForm.tipoPropiedad}
                onChange={handleEditChange}
              />
            </Form.Group>

            <Form.Group controlId="EditDescripcion">
              <Form.Label>Descripcion</Form.Label>
              <Form.Control
                type="text"
                name="descripcion"
                value={editForm.descripcion}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group controlId="editCantidadAmbientes">
              <Form.Label>Cantidad de Ambientes</Form.Label>
              <Form.Control
                type="text"
                name="cantidadAmbientes"
                value={editForm.cantidadAmbientes}
                onChange={handleEditChange}
              />
            </Form.Group>

            <Form.Group controlId="editPrecio">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                name="precio"
                value={editForm.precio}
                onChange={handleEditChange}
              />
            </Form.Group>

            <Form.Group controlId="editExpensas">
              <Form.Label>Expensas</Form.Label>
              <Form.Control
                type="number"
                name="expensas"
                value={editForm.expensas}
                onChange={handleEditChange}
              />
            </Form.Group>

            <Form.Group controlId="editAmenities">
              <Form.Label>Amenities</Form.Label>
              <Form.Control
                type="text"
                name="amenities"
                value={editForm.amenities}
                onChange={handleEditChange}
              />
            </Form.Group>

            <Form.Group controlId="editMetrosTotales">
              <Form.Label>Metros2 Totales</Form.Label>
              <Form.Control
                type="number"
                name="metrosTotales"
                value={editForm.metrosTotales}
                onChange={handleEditChange}
              />
            </Form.Group>

            <Form.Group controlId="editEstado">
              <Form.Label>Estado</Form.Label>
              <Form.Control
                type="text"
                name="estado"
                value={editForm.estado}
                onChange={handleEditChange}
              />
            </Form.Group>

            <Form.Group controlId="editAtiguedad">
              <Form.Label>Antiguedad</Form.Label>
              <Form.Control
                type="number"
                name="antiguedad"
                value={editForm.antiguedad}
                onChange={handleEditChange}
              />
            </Form.Group>

            <Form.Group controlId="editFechaPublicacion">
              <Form.Label>Fecha de publicacion</Form.Label>
              <Form.Control
                type="date"
                name="fechaPublicacion"
                value={editForm.fechaPublicacion}
                onChange={handleEditChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={saveChanges}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal confirmar la eliminar */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Está seguro de que desea eliminar la propiedad{" "}
          {selectedProperty?.nombre}? Se eliminará de la base de datos. Esta
          acción no se puede deshacer.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={() => setShowDeleteModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default CardProperty;
