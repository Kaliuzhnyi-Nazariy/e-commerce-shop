import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { LoginForm } from "./LoginForm";
import { useAppDispatch } from "../../../hooks/useDispatch";
import { getAllUsers } from "../../../axios/authOperations";

export const LoginModal = () => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const dispatch = useAppDispatch();

  return (
    <>
      <Button
        variant="primary"
        style={{
          width: "100px",
          height: "48px",
          fontWeight: "bold",
          textTransform: "uppercase",
        }}
        onClick={() => {
          dispatch(getAllUsers());
          handleShow();
        }}
      >
        Sign in
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginForm />
        </Modal.Body>
      </Modal>
    </>
  );
};
