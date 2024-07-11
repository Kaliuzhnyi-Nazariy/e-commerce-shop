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
  selectUser,
} from "./axios/selectors";
import { refreshUser } from "./axios/authOperations";
import { getUserCart } from "./axios/cartOperations";
import { SignUpModal } from "./components/auth/registration/SignUpModal";
import { LoginModal } from "./components/auth/login/LoginModal";
import { FaCartShopping } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
import ProductItem from "./components/productsItems/productItem";
import { Dropdown, DropdownButton, Stack } from "react-bootstrap";
import AddProductModal from "./components/addProduct/AddProductModal";
import CartProductItem from "./components/cartProducts/CartProductItem";
import { ClearButton } from "./components/ClearButton.styleS";

function App() {
  const dispatch = useAppDispatch();

  const categories = useSelector(selectCategories);
  const products = useSelector(selectAllProducts);
  const user = useSelector(selectUser);
  const userIsLoggedIn = useSelector(selectIsLoggedIn);
  const cartProducts = useSelector(selectCartProducts);
  const cardSelects = useSelector(selectProducts);

  const [categoryPicked, setCategoryPeckied] = useState(null);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getUserCart(user.id));
    dispatch(getAllProducts());
    dispatch(refreshUser());
  }, [user, dispatch]);

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
    cardSelects.forEach((i) => dispatch(getOneProduct(i.productId)));
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
    <div style={{ minWidth: "320px" }}>
      <Stack direction="horizontal" gap={3}>
        <button onClick={handleAllProduct}>All products</button>
        <Stack className="ms-auto" direction="horizontal" gap={3}>
          {userIsLoggedIn ? (
            <>
              <button onClick={handleUserCart} style={{ position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    width: "20px",
                    height: "20px",
                    backgroundColor: "tomato",
                    top: -8,
                    right: -8,
                    borderRadius: "100%",
                    fontSize: "12px",
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {cardSelects.length !== 0 ? (
                    <> {cardSelects.length}</>
                  ) : (
                    <>0</>
                  )}
                </div>
                <FaCartShopping />
              </button>
              <AddProductModal />
              <button onClick={handleLogOut}>
                <IoIosLogOut />
              </button>
            </>
          ) : (
            <>
              <LoginModal />
              <div className="vr"></div>
              <SignUpModal />
            </>
          )}
        </Stack>
      </Stack>
      {sortedCartProducts.length === 0 ? (
        <>
          <DropdownButton
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
          </DropdownButton>
          {categoryPicked}
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
                  console.log(selectedProduct);
                  // console.log(i);
                  return (
                    <CartProductItem
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
