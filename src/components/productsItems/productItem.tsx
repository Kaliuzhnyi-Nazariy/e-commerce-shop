import { useSelector } from "react-redux";
import {
  selectIsCreatedByUser,
  selectIsLoggedIn,
  selectUser,
} from "../../axios/selectors";
import { format } from "date-fns";
import { ICart, IProduct } from "../../typesOrInterfaces/typesOrInterfaces";
import { useAppDispatch } from "../../hooks/useDispatch";
import { MdAddShoppingCart, MdDeleteForever } from "react-icons/md";
import { addUserCart } from "../../axios/cartOperations";
import { deleteProduct } from "../../axios/operations";
import { useState } from "react";

type Prop = {
  prop: IProduct;
};

const ProductItem = ({ prop }: Prop) => {
  const [count, setCount] = useState(0);
  const dispatch = useAppDispatch();
  const userIsLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const createdByUser = useSelector(selectIsCreatedByUser);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!userIsLoggedIn) return;
    if (count === 0) return;
    const userId = user.id;
    const date = format(Date(), "yyyy-MM-dd");
    const productInfoClick: ICart = {
      id: Number(e.target.closest("div").id),
      userId,
      date,
      products: {
        productId: Number(e.target.closest("div").id),
        quantity: count,
      },
    };
    dispatch(addUserCart(productInfoClick));
  };

  const isProductCreatedByUser = (productId: number) => {
    return createdByUser.some((userProduct) => userProduct.id === productId);
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!userIsLoggedIn) return;
    dispatch(deleteProduct(Number(e.currentTarget.closest("div")?.id)));
  };
  return (
    <div
      key={prop.id}
      id={prop.id.toString()}
      className="p-3 border rounded w-50 d-flex flex-column align-items-center"
      style={{ position: "relative" }}
    >
      {/* <p data-tooltip={prop.description}>i</p> */}
      {/* <button
        type="button"
        className="btn btn-secondary w-25"
        data-toggle="tooltip"
        data-placement="bottom"
        title={prop.description}
      >
        i
      </button> */}
      {/* <button type="button" className="btn" title={prop.description}>
        i
      </button> */}

      <p
        style={{
          position: "absolute",
          left: "20px",
          width: "25px",
          height: "25px",
          background: "rgba(255,255,255, 0.5)",
          boxShadow:
            " rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px",
        }}
        className="border rounded-circle"
        data-tooltip={prop.description}
      >
        i
      </p>

      <img src={prop.image} alt={prop.title} style={{ height: "150px" }} />
      <p>{prop.title}</p>
      <p
        style={{
          maxWidth: "300px",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {prop.description}
      </p>
      <p>{prop.category}</p>
      <p>{prop.price}</p>
      <span
        className="d-flex justify-content-between"
        style={{ width: "100%" }}
      >
        <span className="d-flex align-items-center gap-2">
          <button
            onClick={() => setCount((prevState) => (prevState += 1))}
            style={{ width: "50px", height: "50px" }}
            className="rounded-circle"
          >
            +
          </button>
          <div>{count}</div>
          <button
            onClick={() => {
              if (count !== 0) setCount((prevState) => (prevState -= 1));
            }}
            style={{ width: "50px", height: "50px" }}
            className="rounded-circle"
          >
            -
          </button>
        </span>
        <button onClick={handleAddToCart} className="ms-auto">
          <MdAddShoppingCart />
        </button>
      </span>

      {isProductCreatedByUser(prop.id) && (
        <button
          onClick={handleDelete}
          className="position-absolute 
           d-flex justify-content-center align-items-center"
          style={{
            right: "20px",
            padding: "6px",
            color: "red",
            background: "transparent",
          }}
        >
          <MdDeleteForever />
        </button>
      )}
    </div>
  );
};

export default ProductItem;
