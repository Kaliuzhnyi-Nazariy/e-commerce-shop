import { useEffect, useState } from "react";
import "./App.css";
import { useAppDispatch } from "./hooks/useDispatch";
import {
  getAllProducts,
  getCategories,
  getExactCategory,
  getOneProduct,
} from "./axios/operations";
import { useSelector } from "react-redux";
import {
  selectAllProducts,
  selectCartProducts,
  selectCategories,
  selectIsLoggedIn,
  selectProducts,
  // selectUser,
} from "./axios/selectors";
import { refreshUser } from "./axios/authOperations";
// import { getUserCart, refreshCart } from "./axios/cartOperations";
import { SignUpModal } from "./components/auth/registration/SignUpModal";
import { LoginModal } from "./components/auth/login/LoginModal";
import { FaCartShopping } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
import ProductItem from "./components/productsItems/productItem";
import { Dropdown, DropdownButton, Stack } from "react-bootstrap";
import AddProductModal from "./components/addProduct/AddProductModal";
import CartProductItem from "./components/cartProducts/CartProductItem";
import { ClearButton } from "./components/ClearButton.styleS";
import {
  AuthDiv,
  CategoryButton,
  CategoryName,
  DivIsMobile,
  DivIsNotMobile,
  ImageCategory,
  StyledCartDiv,
} from "./components/appStyles";
import { OffCanvas } from "./components/OffCanvas";

function App() {
  const dispatch = useAppDispatch();

  const categories = useSelector(selectCategories);
  const products = useSelector(selectAllProducts);
  const userIsLoggedIn = useSelector(selectIsLoggedIn);
  const cartProducts = useSelector(selectCartProducts);
  const cardSelects = useSelector(selectProducts);

  const [categoryPicked, setCategoryPeckied] = useState(null);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getAllProducts());
    dispatch(refreshUser());
  }, [dispatch]);

  const handleClick = (category: string) => {
    dispatch(getExactCategory(category));
  };

  const handleAllProduct = () => {
    dispatch({ type: "cleanCartProducts" });
    dispatch(getAllProducts());
    setCategoryPeckied(null);
  };

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
  };

  const handleCleanCart = () => {
    dispatch({ type: "cleanCartProducts" });
    dispatch({ type: "cleanProducts" });
  };

  const sortedCartProducts = [...cartProducts].sort((a, b) => a.id - b.id);
  const sortedCardSelects = [...cardSelects].sort(
    (a, b) => a.productId - b.productId
  );

  return (
    <div style={{ width: "320px" }}>
      <Stack direction="horizontal" gap={3}>
        <button onClick={handleAllProduct} className="btn">
          <img
            src="../public/logo_for_e-comm_8d168fe7-7f71-4d2b-aa61-959ada1ac9f6-removebg-preview.png"
            alt="SwiftShopper"
            style={{ height: "50px" }}
          />
        </button>
        <Stack
          className="ms-auto"
          direction="horizontal"
          // gap={3}
        >
          {userIsLoggedIn ? (
            <>
              <button onClick={handleUserCart} style={{ position: "relative" }}>
                <StyledCartDiv>
                  {cardSelects.length !== 0 ? (
                    <> {cardSelects.length}</>
                  ) : (
                    <>0</>
                  )}
                </StyledCartDiv>
                <FaCartShopping />
              </button>
              <AddProductModal />
              <button onClick={handleLogOut}>
                <IoIosLogOut />
              </button>
            </>
          ) : (
            <>
              <DivIsMobile>
                <OffCanvas />
              </DivIsMobile>
              <DivIsNotMobile>
                <AuthDiv>
                  <LoginModal />
                  <div className="vr"></div>
                  <SignUpModal />
                </AuthDiv>
              </DivIsNotMobile>
            </>
          )}
        </Stack>
      </Stack>
      {sortedCartProducts.length === 0 ? (
        <>
          <div
            className="d-flex gap-3 justify-content-evenly"
            style={{ width: "240px" }}
          >
            {categories.map((category) => (
              <CategoryButton
                onClick={() => {
                  handleClick(category);
                  setCategoryPeckied(category);
                }}
                className="btn d-flex flex-column align-items-center"
              >
                <ImageCategory />
                <CategoryName>{category}</CategoryName>
              </CategoryButton>
            ))}
          </div>
          {/* <DropdownButton
            key="secondary"
            id={`dropdown-variants-secondary`}
            variant="dark"
            title="Categories"
          >
            {categories.map((category) => (
              <Dropdown.Item
                key={category}
                onClick={() => {
                  handleClick(category);
                  setCategoryPeckied(category);
                }}
              >
                {category}
                <Dropdown.Divider />
              </Dropdown.Item>
            ))}
          </DropdownButton> */}
          <h2>{categoryPicked ? categoryPicked : "All product"}</h2>
        </>
      ) : (
        <></>
      )}
      <div className="d-flex flex-column align-items-center gap-2">
        {sortedCartProducts.length === 0 ? (
          products.map((i) => {
            return <ProductItem prop={i} key={i.id} />;
          })
        ) : (
          <>
            {cardSelects ? (
              <>
                {sortedCartProducts.map((i) => {
                  const selectedProduct = sortedCardSelects.find(
                    (item) => item.productId === i.id
                  );
                  return (
                    <CartProductItem
                      key={i.id}
                      propMainInfo={i}
                      propSecondaryInfo={selectedProduct}
                    />
                  );
                })}
              </>
            ) : (
              <></>
            )}
            <ClearButton onClick={handleCleanCart}>Clear</ClearButton>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
