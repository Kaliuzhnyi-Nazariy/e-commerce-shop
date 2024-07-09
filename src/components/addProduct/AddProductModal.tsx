import { useState } from "react";
import {
  // Button,
  Modal,
} from "react-bootstrap";
import { IoIosAddCircle } from "react-icons/io";
import AddProductForm from "./AddProductForm";

const AddProductModal = () => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      {/* <button onClick={handleAddProduct}></button> */}

      <button
        // variant="outline-primary"
        style={{
          //   width: "100px",
          height: "48px",
          fontWeight: "bold",
          textTransform: "uppercase",
        }}
        onClick={handleShow}
        className="ms-auto"
      >
        <IoIosAddCircle />
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title
            style={{ textTransform: "uppercase", fontWeight: "bold" }}
          >
            Add Product form
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddProductForm onCLick={handleClose} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddProductModal;
