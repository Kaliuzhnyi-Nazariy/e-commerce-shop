import { useState } from "react";
import Modal from "@mui/material/Modal";
import { IoIosAddCircle } from "react-icons/io";
import AddProductForm from "./AddProductForm";
import { Box } from "@mui/material";

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

const AddProductModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div>
        <button onClick={handleOpen}>
          <IoIosAddCircle />
        </button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} style={{ width: "80%" }}>
            <AddProductForm onClick={handleClose} />
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default AddProductModal;
