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
  selectProducts,
  selectUser,
} from "./axios/selectors";
import { createUser, extraLoginUser, loginUser } from "./axios/authOperations";
import {
  addUserCart,
  deleteUserCart,
  getUserCart,
  ICart,
  IProductsInCart,
} from "./axios/cartOperations";

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
  }, [dispatch]);

  // console.log(categories);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(getExactCategory(e.currentTarget.textContent));
  };

  const handleAllProduct = () => {
    dispatch({ type: "cleanCartProducts" });
    dispatch(getAllProducts());
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(deleteProduct(Number(e.currentTarget.closest("div")?.id)));
  };

  const regUser = () => [
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
    ),
  ];

  const logUser = () => {
    // dispatch(loginUser({ username: "mor_2314", password: "83r5^_" }));
    // dispatch(loginUser({ username: "johnd", password: "m38rmF$" }));
    dispatch(loginUser({ username: "donero", password: "ewedon" }));
    dispatch(extraLoginUser({ username: "donero", password: "ewedon" }));
    const userId = user.id;
    // console.log(userId);
    dispatch(getUserCart(userId));
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
  const handleUserCart = async () => {
    if (Object.keys(user).length === 0) return;
    // if (cardSelects.length === 0) return;
    dispatch(getUserCart(user.id));
    cardSelects.forEach((i) => dispatch(getOneProduct(i.productId)));
    // console.log(cardSelects);
  };

  // console.log(cardSelects.map((cardItem) => cardItem.productId));

  const handleCardProducts = () => {
    // console.log(cardSelects);
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
    // console.log(Number(e.target.closest("div").id));
    dispatch(deleteUserCart(Number(e.target.closest("div").id)));
    dispatch(deleteProductFromCart(Number(e.target.closest("div").id)));
  };

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    // console.log(user.id);
    // console.log(format(Date(), "yyyy-MM-dd"));
    // console.log({ productId: Number(e.target.closest("div").id), quantity: 1 });
    const userId = user.id;
    const date = format(Date(), "yyyy-MM-dd");
    const productInfoClick: ICart = {
      userId,
      date,
      products: {
        productId: Number(e.target.closest("div").id),
        quantity: 1,
      },
    };
    // console.log(cardSelects[1].productId);
    dispatch(addUserCart(productInfoClick));
  };

  const sortedCartProducts = [...cartProducts].sort((a, b) => a.id - b.id);

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
      {sortedCartProducts.length === 0 ? (
        products.map((i) => {
          return (
            <div key={i.id} id={i.id.toString()}>
              <p>{i.title}</p>
              <button onClick={handleAddToCart}>Add to cart</button>

              <button onClick={handleDelete}>Delete</button>
            </div>
          );
        })
      ) : (
        <>
          {cardSelects ? (
            <>
              {sortedCartProducts.map((i) => {
                const selectedProduct = cardSelects.find(
                  (item) => item.productId === i.id
                );
                // console.log(
                //   cardSelects.find((item) => item.productId === i.id)
                // );
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
