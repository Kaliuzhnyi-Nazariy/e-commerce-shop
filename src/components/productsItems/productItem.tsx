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
import {
  AddCartButton,
  DeleteUserProduct,
  DescriptionStyled,
  ImgStyled,
  ProductItemStyled,
  QuantityButton,
  TooltipStyle,
} from "./ProductItem.style";

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
      id: Number(e.currentTarget.closest("div")?.id),
      userId,
      date,
      products: {
        productId: Number(e.currentTarget.closest("div")?.id),
        quantity: count,
      },
    };
    dispatch(addUserCart(productInfoClick));
    setCount(0);
  };

  const isProductCreatedByUser = (productId: number) => {
    return createdByUser.some((userProduct) => userProduct.id === productId);
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!userIsLoggedIn) return;
    dispatch(deleteProduct(Number(e.currentTarget.closest("div")?.id)));
  };
  return (
    <ProductItemStyled
      key={prop.id}
      id={prop.id.toString()}
      // className="p-3 border rounded w-50 d-flex flex-column align-items-center"
      // style={{ position: "relative" }}
    >
      <TooltipStyle
        className="border rounded-circle position-absolute"
        data-tooltip={prop.description}
      >
        i
      </TooltipStyle>

      <ImgStyled src={prop.image} alt={prop.title} />

      <p>{prop.title}</p>

      <DescriptionStyled>{prop.description}</DescriptionStyled>

      <p>{prop.category}</p>

      <p>{prop.price}$</p>

      <span
        className="d-flex justify-content-between"
        style={{ width: "100%" }}
      >
        <span className="d-flex align-items-center gap-2">
          <QuantityButton
            onClick={() => setCount((prevState) => (prevState += 1))}
          >
            +
          </QuantityButton>
          <div>{count}</div>
          <QuantityButton
            onClick={() => {
              if (count !== 0) setCount((prevState) => (prevState -= 1));
            }}
          >
            -
          </QuantityButton>
        </span>
        <AddCartButton onClick={handleAddToCart} className="ms-auto">
          <MdAddShoppingCart />
        </AddCartButton>
      </span>
      {isProductCreatedByUser(prop.id) && (
        <DeleteUserProduct
          onClick={handleDelete}
          className="position-absolute 
           d-flex justify-content-center align-items-center"
        >
          <MdDeleteForever />
        </DeleteUserProduct>
      )}
    </ProductItemStyled>
  );
};

export default ProductItem;
