import { useState } from "react";
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
import { LoginForm } from "./LoginForm";
import { useAppDispatch } from "../../../hooks/useDispatch";
import { getAllUsers } from "../../../axios/authOperations";

import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { OpenButton } from "./LoginModal.style";

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
        <OpenButton
          onClick={() => {
            dispatch(getAllUsers());
            handleOpen();
          }}
          type="button"
          className="btn btn-primary"
        >
          sign in
        </OpenButton>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} style={{ width: "80%" }}>
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
                onClick={handleClose}
              >
                <span aria-hidden="true" style={{ fontSize: "32px" }}>
                  &times;
                </span>
              </button>
            </div>
            <div id="modal-modal-description">
              <LoginForm onClose={handleClose} />
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
};
