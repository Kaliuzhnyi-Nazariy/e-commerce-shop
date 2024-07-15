import { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { GiHamburgerMenu } from "react-icons/gi";
import { AuthNav } from "./appStyles";
import { LoginModal } from "./auth/login/LoginModal";
import { SignUpModal } from "./auth/registration/SignUpModal";

export const OffCanvas = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className="btn" onClick={handleShow}>
        <GiHamburgerMenu />
      </button>

      <Offcanvas show={show} onHide={handleClose} placement={"end"}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Authentication</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <AuthNav>
            <LoginModal />
            <SignUpModal />
          </AuthNav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
