import React, { useEffect } from "react";
import "./App.css";
import { useAppDispatch } from "./hooks/useDispatch";
import { format } from "date-fns";
import {
  addProduct,
  deleteProduct,
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
import {
  createUser,
  extraLoginUser,
  loginUser,
  refreshUser,
} from "./axios/authOperations";
import {
  addUserCart,
  deleteUserCart,
  getUserCart,
} from "./axios/cartOperations";
import { ICart } from "./typesOrInterfaces/typesOrInterfaces";

function App() {
  const dispatch = useAppDispatch();

  const categories = useSelector(selectCategories);
  const products = useSelector(selectAllProducts);
  const user = useSelector(selectUser);
  const userIsLoggedIn = useSelector(selectIsLoggedIn);
  const cartProducts = useSelector(selectCartProducts);
  const cardSelects = useSelector(selectProducts);
  const createdByUser = useSelector(selectIsCreatedByUser);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getUserCart(user.id));
    dispatch(getAllProducts());
    dispatch(refreshUser());
  }, [user, dispatch]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(getExactCategory(e.currentTarget.textContent));
  };

  const handleAllProduct = () => {
    dispatch({ type: "cleanCartProducts" });
    dispatch(getAllProducts());
  };

  const isProductCreatedByUser = (productId: number) => {
    return createdByUser.some((userProduct) => userProduct.id === productId);
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(
      isProductCreatedByUser(Number(e.currentTarget.closest("div")?.id))
    );
    if (!userIsLoggedIn) return;
    dispatch(deleteProduct(Number(e.currentTarget.closest("div")?.id)));
  };

  const regUser = () => {
    // will open modal

    dispatch(
      createUser({
        email: "don@gmail.com",
        username: "donero",
        password: "ewedon",
        name: { firstname: "don", lastname: "romer" },
        address: {
          city: "San Antonio",
          street: "Hunters Creek Dr",
          number: 6454,
          zipcode: "34-1734",
          geolocation: {
            lat: "50.3467",
            long: "-20.1310",
          },
        },
        phone: "1-765-789-6734",
      })
    );
  };

  const logUser = async () => {
    // will open modal
    dispatch(extraLoginUser({ username: "donero", password: "ewedon" }));
    dispatch(loginUser({ username: "donero", password: "ewedon" }));
  };

  const handleUserCart = async () => {
    if (!userIsLoggedIn) return;
    // will open modal to login
    cardSelects.forEach((i) => dispatch(getOneProduct(i.productId)));
  };

  const handleLogOut = () => {
    dispatch({ type: "cleanCartProducts" });
    dispatch({ type: "user/logOut" });
  };

  const handleCleanCart = () => {
    dispatch({ type: "cleanCartProducts" });
  };

  const handleDeleteFromCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(deleteUserCart(Number(e.target.closest("div").id)));
    dispatch(deleteProductFromCart(Number(e.target.closest("div").id)));
  };

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!userIsLoggedIn) return;
    const userId = user.id;
    const date = format(Date(), "yyyy-MM-dd");
    const productInfoClick: ICart = {
      id: Number(e.target.closest("div").id),
      userId,
      date,
      products: {
        productId: Number(e.target.closest("div").id),
        quantity: 1,
      },
    };
    console.log(productInfoClick);
    dispatch(addUserCart(productInfoClick));
  };

  const sortedCartProducts = [...cartProducts].sort((a, b) => a.id - b.id);
  const sortedCardSelects = [...cardSelects].sort(
    (a, b) => a.productId - b.productId
  );

  const handleAddProduct = () => {
    if (!userIsLoggedIn) return;
    dispatch(
      addProduct({
        title: "nameProduct",
        price: 15,
        description: "lorem ipsum lalalal",
        image:
          "https://cdn.pixabay.com/photo/2017/06/15/13/06/retro-2405404_1280.jpg",
        category: "jewelry",
      })
    );
  };

  return (
    <>
      {userIsLoggedIn ? (
        <>
          <button onClick={handleLogOut}>log out</button>
          <button onClick={handleAddProduct}>Add product</button>
        </>
      ) : (
        <>
          <button onClick={regUser}>register</button>
          <button onClick={logUser}>login</button>
        </>
      )}
      <button onClick={handleAllProduct}>All products</button>
      <button onClick={handleUserCart}>Get Cart</button>
      {sortedCartProducts.length === 0 ? (
        <>
          {categories.map((i) => (
            <button
              key={i}
              style={{
                margin: "8px 16px",
                padding: "4px 8px",
                border: "1px solid white",
                borderRadius: "16px",
                display: "block",
              }}
              onClick={handleClick}
            >
              {i}
            </button>
          ))}
        </>
      ) : (
        <></>
      )}

      {sortedCartProducts.length === 0 ? (
        products.map((i) => {
          return (
            <div key={i.id} id={i.id.toString()}>
              <p>{i.title}</p>
              {!isProductCreatedByUser(i.id) && (
                <button onClick={handleAddToCart}>Add to cart</button>
              )}

              {isProductCreatedByUser(i.id) && (
                <button onClick={handleDelete}>Delete</button>
              )}
            </div>
          );
        })
      ) : (
        <>
          {cardSelects ? (
            <>
              {sortedCartProducts.map((i) => {
                const selectedProduct = sortedCardSelects.find(
                  (item) => item.productId === i.id
                );
                console.log(sortedCartProducts);
                console.log(i);
                return (
                  <div
                    key={i.id}
                    id={i.id.toString()}
                    style={{
                      border: "2px solid lightgray",
                      borderRadius: "16px",
                      margin: "16px 0",
                      padding: "16px",
                    }}
                  >
                    <img
                      src={i.image}
                      style={{ maxWidth: "150px", maxHeight: "150px" }}
                      alt={i.title}
                    />
                    <p>{i.title}</p>
                    <span>
                      Quantity: {selectedProduct?.quantity ?? "no info"}
                    </span>
                    <span>Price: {i.price}</span>
                    <button onClick={handleDeleteFromCart}>delete</button>
                  </div>
                );
              })}
            </>
          ) : (
            <></>
          )}
          <button onClick={handleCleanCart}>Clear</button>
        </>
      )}
    </>
  );
}

export default App;
