import { deleteUserCart } from "../../axios/cartOperations";
import { deleteProductFromCart } from "../../axios/operations";
import { useAppDispatch } from "../../hooks/useDispatch";
import { IProduct } from "../../typesOrInterfaces/typesOrInterfaces";

type Prop = {
  propMainInfo: IProduct;
  propSecondaryInfo: { productId: number; quantity: number };
};

const CartProductItem = ({ propMainInfo, propSecondaryInfo }: Prop) => {
  const dispatch = useAppDispatch();

  console.log(propMainInfo);
  console.log(propSecondaryInfo);

  const handleDeleteFromCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(deleteUserCart(Number(e.target.closest("div").id)));
    dispatch(deleteProductFromCart(Number(e.target.closest("div").id)));
  };

  return (
    <div
      key={propMainInfo.id}
      id={propMainInfo.id.toString()}
      style={{
        border: "2px solid lightgray",
        borderRadius: "16px",
        margin: "16px 0",
        padding: "16px",
        width: "240px",
      }}
      className="d-flex flex-column align-items-center gap-2"
    >
      <img
        src={propMainInfo.image}
        style={{ maxWidth: "150px", maxHeight: "150px" }}
        alt={propMainInfo.title}
      />
      <p>{propMainInfo.title}</p>
      <span>Quantity: {propSecondaryInfo?.quantity ?? "no info"}</span>
      <span>Price: {propMainInfo.price}</span>
      <button onClick={handleDeleteFromCart}>delete</button>
    </div>
  );
};

export default CartProductItem;
