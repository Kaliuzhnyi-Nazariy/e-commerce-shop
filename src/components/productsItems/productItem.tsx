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

type Prop = {
  prop: IProduct;
};

const ProductItem = ({ prop }: Prop) => {
  console.log(prop);

  const dispatch = useAppDispatch();
  const userIsLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const createdByUser = useSelector(selectIsCreatedByUser);

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
  return (
    <div
      key={prop.id}
      id={prop.id.toString()}
      className="p-3 border rounded w-50"
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
      <button onClick={handleAddToCart}>
        <MdAddShoppingCart />
      </button>

      {isProductCreatedByUser(prop.id) && (
        <button onClick={handleDelete}>
          <MdDeleteForever />
        </button>
      )}
    </div>
  );
};

export default ProductItem;
