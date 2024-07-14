import { useState } from "react";
import Modal from "@mui/material/Modal";
import { IoIosAddCircle } from "react-icons/io";
import AddProductForm from "./AddProductForm";
import { Box } from "@mui/material";
import { MenuBtn } from "../BurgerMenu/BurgerMenuStyled";

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

type Prop = {
  onClose: () => void;
};

const AddProductModal = ({ onClose }: Prop) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div>
        <MenuBtn
          onClick={() => {
            onClose();
            handleOpen();
          }}
          className=" btn btn-outline-dark"
        >
          Add product <IoIosAddCircle />
        </MenuBtn>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} style={{ width: "80%" }}>
            <AddProductForm onClick={handleClose} handleClose={handleClose} />
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default AddProductModal;
