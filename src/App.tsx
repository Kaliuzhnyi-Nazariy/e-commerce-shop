import React, { useEffect } from "react";
import "./App.css";
import { useAppDispatch } from "./hooks/useDispatch";
import {
  deleteProductFromCart,
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
  selectIsCreatedByUser,
  selectIsLoggedIn,
  selectProducts,
  selectUser,
} from "./axios/selectors";
import { refreshUser } from "./axios/authOperations";
import { deleteUserCart, getUserCart } from "./axios/cartOperations";
import { SignUpModal } from "./components/auth/registration/SignUpModal";
import { LoginModal } from "./components/auth/login/LoginModal";
import { FaCartShopping } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
import ProductItem from "./components/productsItems/productItem";
import { Carousel, Stack } from "react-bootstrap";
import AddProductModal from "./components/addProduct/AddProductModal";
import CartProductItem from "./components/cartProducts/CartProductItem";

function App() {
  const dispatch = useAppDispatch();

  const categories = useSelector(selectCategories);
  const products = useSelector(selectAllProducts);
  const user = useSelector(selectUser);
  const userIsLoggedIn = useSelector(selectIsLoggedIn);
  const cartProducts = useSelector(selectCartProducts);
  const cardSelects = useSelector(selectProducts);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getUserCart(user.id));
    dispatch(getAllProducts());
    dispatch(refreshUser());
  }, [user, dispatch]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(
      getExactCategory(e.target.textContent || e.target.closest("img").id)
    );
  };

  const handleAllProduct = () => {
    dispatch({ type: "cleanCartProducts" });
    dispatch(getAllProducts());
  };

  const handleUserCart = async () => {
    if (!userIsLoggedIn) return;
    // will open modal to login
    cardSelects.forEach((i) => dispatch(getOneProduct(i.productId)));
  };

  const handleLogOut = () => {
    dispatch({ type: "cleanCreatedByUser" });
    dispatch({ type: "cleanCartProducts" });
    dispatch({ type: "user/logOut" });
  };

  const handleCleanCart = () => {
    dispatch({ type: "cleanCartProducts" });
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
        // <div
        //   // direction="horizontal"
        //   // gap={1}
        //   className="d-flex justify-content-around flex-column"
        // >
        //   {categories.map((i) => (
        //     <button
        //       key={i}
        //       style={{
        //         margin: "8px 16px",
        //         padding: "4px 8px",
        //         border: "1px solid white",
        //         borderRadius: "16px",
        //         display: "block",
        //       }}
        //       onClick={handleClick}
        //     >
        //       {i}
        //     </button>
        //   ))}
        // </div>

        <Carousel>
          {categories.map((i) => (
            <Carousel.Item onClick={handleClick} key={i}>
              <img
                className="d-block w-100 darker-image"
                src="https://images.pexels.com/photos/5624975/pexels-photo-5624975.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="First slide"
                id={i}
              />
              <Carousel.Caption>
                <h3>{i}</h3>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        <></>
      )}
      <div className="d-flex flex-column align-items-center">
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
                  // console.log(sortedCartProducts);
                  // console.log(i);
                  return (
                    <CartProductItem
                      propMainInfo={i}
                      propSecondaryInfo={selectedProduct}
                    />
                    // <div
                    //   key={i.id}
                    //   id={i.id.toString()}
                    //   style={{
                    //     border: "2px solid lightgray",
                    //     borderRadius: "16px",
                    //     margin: "16px 0",
                    //     padding: "16px",
                    //   }}
                    // >
                    //   <img
                    //     src={i.image}
                    //     style={{ maxWidth: "150px", maxHeight: "150px" }}
                    //     alt={i.title}
                    //   />
                    //   <p>{i.title}</p>
                    //   <span>
                    //     Quantity: {selectedProduct?.quantity ?? "no info"}
                    //   </span>
                    //   <span>Price: {i.price}</span>
                    //   <button onClick={handleDeleteFromCart}>delete</button>
                    // </div>
                  );
                })}
              </>
            ) : (
              <></>
            )}
            <button onClick={handleCleanCart}>Clear</button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
