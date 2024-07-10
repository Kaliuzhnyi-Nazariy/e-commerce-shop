import { useState } from "react";
import { SignUpForm } from "./SignUpForm";
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

export const SignUpModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div>
        <Button
          onClick={handleOpen}
          type="button"
          class="btn btn-outline-primary"
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
              <h1>Signup</h1>
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
              <SignUpForm />
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
};
