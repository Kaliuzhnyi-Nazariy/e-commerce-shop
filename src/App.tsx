import React, { useEffect } from "react";
import "./App.css";
import { useAppDispatch } from "./hooks/useDispatch";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getCategories,
  getExactCategory,
} from "./axios/operations";
import { useSelector } from "react-redux";
import { selectAllProducts, selectCategories } from "./axios/selectors";

// export interface IGoodProduct {
//   title: string;
//   price: number;
// }

function App() {
  const dispatch = useAppDispatch();

  const categories = useSelector(selectCategories);
  const products = useSelector(selectAllProducts);

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
    // console.log(e.currentTarget.textContent);
    dispatch(getExactCategory(e.target.textContent));
  };

  const handleAllProduct = () => {
    dispatch(getAllProducts());
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(deleteProduct(Number(e.currentTarget.closest("div")?.id)));
  };

  return (
    <>
      <button onClick={handleAllProduct}>All products</button>
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
      {products.map((i) => {
        return (
          <div key={i.id} id={i.id}>
            <p>{i.title}</p>;<button onClick={handleDelete}>Delete</button>
          </div>
        );
      })}
    </>
  );
}

export default App;
