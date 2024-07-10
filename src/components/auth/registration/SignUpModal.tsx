import { useState } from "react";
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
import { SignUpForm } from "./SignUpForm";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const SignUpModal = () => {
  // const [show, setShow] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const handleShow = () => setShow(true);
  // const handleClose = () => setShow(false);

  return (
    <>
      <div>
        <Button onClick={handleOpen}>Open modal</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div id="modal-modal-description">
              <button
                type="button"
                className="close"
                aria-label="Close"
                onClick={() => handleClose()}
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <SignUpForm />
            </div>
          </Box>
        </Modal>
      </div>
      {/* <Button
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
        className="custom-modal"
        style={{ width: "150px" }} // Apply custom CSS class here
      >
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title
              style={{
                textTransform: "uppercase",
                fontWeight: "bold",
              }}
            >
              Signup form
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <SignUpForm />
          </Modal.Body>
        </Modal.Dialog>
      </Modal>{" "} */}
    </>
  );
};
