import { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { GiHamburgerMenu } from "react-icons/gi";
import { StyledCartDiv } from "../appStyles";
import { useSelector } from "react-redux";
import { selectCartProducts } from "../../axios/products/productSelectors";
import { useAppDispatch } from "../../hooks/useDispatch";
import { getOneProduct } from "../../axios/products/operations";
import { FaCartShopping } from "react-icons/fa6";
import AddProductModal from "../addProduct/AddProductModal";
import { IoIosLogOut } from "react-icons/io";
import { MenuBtn, MenuDiv } from "./BurgerMenuStyled";
import { selectIsLoggedIn } from "../../axios/auth/authSelectors";
import { selectProducts } from "../../axios/cart/cartSellectors";
import toast from "react-hot-toast";

export const BurgerMenu = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useAppDispatch();

  const cardSelects = useSelector(selectProducts);
  const cartProducts = useSelector(selectCartProducts);
  const userIsLoggedIn = useSelector(selectIsLoggedIn);

  const handleUserCart = async () => {
    if (!userIsLoggedIn) return;
    const forCheckIsProductInCart = cartProducts.map((product) => product.id);
    const forCheckIsItInCart = cardSelects.map((i) => {
      if (!forCheckIsProductInCart.includes(i.productId)) {
        return true;
      }
      return false;
    });

    if (forCheckIsItInCart.includes(true)) {
      cardSelects.forEach((i) => dispatch(getOneProduct(i.productId)));
    }
  };

  const handleLogOut = () => {
    dispatch({ type: "cleanCreatedByUser" });
    dispatch({ type: "cleanCartProducts" });
    dispatch({ type: "user/logOut" });

    toast.success("We will wait for you!", {
      style: {
        border: "1px solid #074187",
        padding: "16px",
        color: "#074187",
      },
      iconTheme: {
        primary: "#074187",
        secondary: "#FFFAEE",
      },
    });
  };

  return (
    <>
      <button className="btn" onClick={handleShow}>
        <GiHamburgerMenu />
      </button>

      <Offcanvas show={show} onHide={handleClose} placement={"end"}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <MenuDiv>
            <MenuBtn
              onClick={() => {
                handleUserCart();
                handleClose();
              }}
              // style={{ position: "relative" }}
              className="position-relative btn btn-outline-dark"
            >
              <StyledCartDiv>
                {cardSelects.length !== 0 ? <> {cardSelects.length}</> : <>0</>}
              </StyledCartDiv>
              Cart <FaCartShopping />
            </MenuBtn>
            <AddProductModal />
            <MenuBtn
              onClick={() => {
                handleClose();
                handleLogOut();
              }}
              className=" btn btn-outline-dark"
            >
              Log out
              <IoIosLogOut />
            </MenuBtn>
          </MenuDiv>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
