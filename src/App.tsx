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
import { getUserCart } from "./axios/cartOperations";

// export interface IGoodProduct {
//   title: string;
//   price: number;
// }

function App() {
  const dispatch = useAppDispatch();

  const categories = useSelector(selectCategories);
  const products = useSelector(selectAllProducts);
  const user = useSelector(selectUser);

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
  }, [dispatch]);

  // console.log(categories);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(getExactCategory(e.currentTarget.textContent));
  };

  const handleAllProduct = () => {
    dispatch(getAllProducts());
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
    dispatch(loginUser({ username: "mor_2314", password: "83r5^_" }));
    // dispatch(loginUser({ username: "lalashka", password: "123123po" }));
  };

  const cardSelects = useSelector(selectProducts);
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
    dispatch(getUserCart(user.id));
    cardSelects.forEach((i) => dispatch(getOneProduct(i.productId)));
  };

  // console.log(cardSelects.map((cardItem) => cardItem.productId));

  const handleCardProducts = () => {};

  const cartProducts = useSelector(selectCartProducts);
  // console.log(cartProducts);

  return (
    <>
      <button onClick={regUser}>register</button>
      <button onClick={logUser}>login</button>
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
      {products.length > 1 ? (
        products.map((i) => {
          return (
            <div key={i.id} id={i.id}>
              <p>{i.title}</p>;<button onClick={handleDelete}>Delete</button>
            </div>
          );
        })
      ) : (
        <>
          <div key={products.id} id={products.id}>
            <p>{products.title}</p>;
            <button onClick={handleDelete}>Delete</button>
          </div>
        </>
      )}
    </>
  );
}

export default App;
