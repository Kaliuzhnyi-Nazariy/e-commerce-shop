import { useState } from "react";
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
import { LoginForm } from "./LoginForm";
import { useAppDispatch } from "../../../hooks/useDispatch";
import { getAllUsers } from "../../../axios/authOperations";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
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

export const LoginModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useAppDispatch();

  return (
    <>
      <div>
        <Button
          onClick={() => {
            dispatch(getAllUsers());
            handleOpen();
          }}
          type="button"
          class="btn btn-primary"
        >
          sign up
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="d-flex align-items-center">
              <h1>Sign in</h1>
              <button
                type="button"
                className="close ms-auto d-flex justify-content-center align-items-center"
                aria-label="Close"
                style={{
                  background: "transparent",
                  width: "40px",
                  height: "40px",
                  border: "none",
                }}
                onClick={() => handleClose()}
              >
                <span aria-hidden="true" style={{ fontSize: "32px" }}>
                  &times;
                </span>
              </button>
            </div>
            <div id="modal-modal-description">
              <LoginForm />
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
};

//   return (
//     <>
//       <Button
//         variant="primary"
//         style={{
//           width: "100px",
//           height: "48px",
//           fontWeight: "bold",
//           textTransform: "uppercase",
//         }}
//         onClick={() => {
//           dispatch(getAllUsers());
//           handleShow();
//         }}
//       >
//         Sign in
//       </Button>

//       <Modal
//         show={show}
//         onHide={handleClose}
//         backdrop="static"
//         keyboard={false}
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>Sign In</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <LoginForm />
//         </Modal.Body>
//       </Modal>
//     </>
//   );
// };
