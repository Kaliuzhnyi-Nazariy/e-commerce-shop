import React, { useEffect } from "react";
import "./App.css";
import { useAppDispatch } from "./hooks/useDispatch";
import {
  addProduct,
  deleteProduct,
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
  selectProducts,
  selectUser,
} from "./axios/selectors";
import { createUser, loginUser } from "./axios/authOperations";
import { deleteUserCart, getUserCart } from "./axios/cartOperations";

// export interface IGoodProduct {
//   title: string;
//   price: number;
// }

function App() {
  const dispatch = useAppDispatch();

  const categories = useSelector(selectCategories);
  const products = useSelector(selectAllProducts);
  const user = useSelector(selectUser);
  const cartProducts = useSelector(selectCartProducts);
  const cardSelects = useSelector(selectProducts);

  // console.log(products);
  useEffect(() => {
    dispatch(getCategories());
    // dispatch(
    //   addProduct({
    //     title: "nameProduct",
    //     price: 15,
    //     description: "lorem ipsum lalalal",
    //     image:
    //       "https://cdn.pixabay.com/photo/2017/06/15/13/06/retro-2405404_1280.jpg",
    //     category: "jewelry",
    //   })
    // );
    dispatch(getAllProducts());
    console.log(cartProducts);
  }, [dispatch, cartProducts]);

  // console.log(categories);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(getExactCategory(e.currentTarget.textContent));
  };

  const handleAllProduct = () => {
    dispatch(getAllProducts());
    dispatch({ type: "cleanCartProducs" });
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(deleteProduct(Number(e.currentTarget.closest("div")?.id)));
  };

  const regUser = () => [
    dispatch(
      createUser({
        email: "lala@mail.com",
        username: "lalashka",
        password: "123123po",
        name: { firstname: "andrey", lastname: "Kinkov" },
        address: {
          city: "zabrze",
          street: "sw.Wawrzynca",
          number: 47,
          zipcode: "48-807",
          geolocation: {
            lat: "-3077.25741",
            long: "456",
          },
        },
        phone: "047-596-78-15",
      })
    ),
  ];

  const logUser = () => {
    // dispatch(loginUser({ username: "mor_2314", password: "83r5^_" }));
    // dispatch(loginUser({ username: "johnd", password: "m38rmF$" }));
    dispatch(loginUser({ username: "snyder", password: "f238&@*$" }));
    // dispatch(loginUser({ username: "lalashka", password: "123123po" }));
  };

  // const handleUserCart = () => {
  //   dispatch(getUserCart(user.id));
  //   console.log(cardSelects.map((i) => i.productId));
  //   cardSelects.map((i) => dispatch(getOneProduct(i.productId)));

  //   // for (let i = 0; i < cardSelects.length; i++) {
  //   //   console.log(i + 1);
  //   // cardSelects.map((i) => {
  //   //   let arrayOfProductId = [];
  //   //   for (let i = 0; cardSelects.length; i++) {
  //   //     console.log("i inside sec for cycle: ", i);
  //   //   }
  //   //   dispatch(getOneProduct(i.productId));
  //   // });
  //   // }
  //   // console.log(products);
  // };
  const handleUserCart = () => {
    if (Object.keys(user).length === 0) return;
    dispatch(getUserCart(user.id));
    console.log(cardSelects);
    console.log(cardSelects.forEach((i) => i));
    cardSelects.forEach((i) => dispatch(getOneProduct(i.productId)));
    console.log(cardSelects);
  };

  // console.log(cardSelects.map((cardItem) => cardItem.productId));

  const handleCardProducts = () => {
    console.log(cardSelects);
    dispatch(getOneProduct(5));
    dispatch(getOneProduct(3));
  };

  const handleLogOut = () => {
    dispatch({ type: "cleanCartProducts" });
    dispatch({ type: "user/logOut" });
  };

  const handleCleanCart = () => {
    dispatch({ type: "cleanCartProducts" });
  };

  // cardSelects.map((i) => {
  //   console.log(i);
  //   console.log(cardSelects);
  // });

  // for (let i = 0; i < cardSelects.length; i++) {
  //   console.log(i);
  //   console.log(cardSelects[i]);
  // }
  const handleDeleteFromCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e.target.closest("div").id);
    dispatch(deleteUserCart(e.target.closest("div").id));
  };

  return (
    <>
      <button onClick={regUser}>register</button>
      <button onClick={logUser}>login</button>
      <button onClick={handleLogOut}>log out</button>
      <button onClick={handleAllProduct}>All products</button>
      <button onClick={handleUserCart}>Get Cart</button>
      <button onClick={handleCardProducts}>Get One card product</button>
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
      {cartProducts.length === 0 ? (
        products.map((i) => {
          return (
            <div key={i.id} id={i.id}>
              <p>{i.title}</p>
              <button onClick={handleDelete}>Delete</button>
            </div>
          );
        })
      ) : (
        <>
          {cartProducts.map((i) => {
            const selectedProduct = cardSelects.find(
              (item) => item.productId === i.id
            );
            return (
              <div
                key={i.id}
                id={i.id}
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
                <span>Quantity: {selectedProduct?.quantity ?? "no info"}</span>
                <span>Price: {i.price}</span>
                <button onClick={handleDeleteFromCart}>delete</button>
              </div>
            );
          })}
          <button onClick={handleCleanCart}>Clear</button>
        </>
      )}
    </>
  );
}

export default App;
