import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { SignUpForm } from "./SignUpForm";

export const SignUpModal = () => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <Button
        variant="outline-primary"
        style={{
          width: "100px",
          height: "48px",
          fontWeight: "bold",
          textTransform: "uppercase",
        }}
        onClick={handleShow}
      >
        Sign up
      </Button>

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
            Signup form
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SignUpForm onClickClose={handleClose} />
        </Modal.Body>
      </Modal>
    </>
  );
};
