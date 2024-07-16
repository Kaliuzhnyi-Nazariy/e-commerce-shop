import { useSelector } from "react-redux";
import { selectIsCreatedByUser } from "../../axios/products/productSelectors";
import { format } from "date-fns";
import { ICart, IProduct } from "../../typesOrInterfaces/typesOrInterfaces";
import { useAppDispatch } from "../../hooks/useDispatch";
import { MdAddShoppingCart, MdDeleteForever } from "react-icons/md";
import { addUserCart } from "../../axios/cart/cartOperations";
import { deleteProduct } from "../../axios/products/operations";
import { useState } from "react";
import {
  AddCartButton,
  BottomCardBlock,
  CategoryStyled,
  DeleteUserProduct,
  DescriptionStyled,
  ImgStyled,
  Price,
  ProductItemStyled,
  QuantityButton,
  SpanQuantity,
  TitleStyled,
  TooltipStyle,
} from "./ProductItem.style";
import { deleteCartItem } from "../../axios/cart/cartSlice";
import { selectIsLoggedIn, selectUser } from "../../axios/auth/authSelectors";
import { selectProducts } from "../../axios/cart/cartSellectors";
import toast from "react-hot-toast";

type Prop = {
  prop: IProduct;
};

const ProductItem = ({ prop }: Prop) => {
  const [count, setCount] = useState(0);
  const dispatch = useAppDispatch();
  const userIsLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const createdByUser = useSelector(selectIsCreatedByUser);

  const cardSelects = useSelector(selectProducts);

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!userIsLoggedIn) return;
    dispatch(deleteProduct(Number(e.currentTarget.closest("div")?.id)));
    const cardSelectsIds = cardSelects.map((cart) => cart.productId);
    if (cardSelectsIds.includes(Number(e.currentTarget.closest("div")?.id))) {
      dispatch(
        deleteCartItem({ id: Number(e.currentTarget.closest("div")?.id) })
      );
    }
    toast.success("Product delted successfully!");
  };

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
    toast.success("Product added to cart!");
  };

  const isProductCreatedByUser = (productId: number) => {
    return createdByUser.some((userProduct) => userProduct.id === productId);
  };

  return (
    <ProductItemStyled key={prop.id} id={prop.id.toString()}>
      <TooltipStyle
        className="border rounded-circle position-absolute"
        data-tooltip={prop.description}
      >
        i
      </TooltipStyle>

      <ImgStyled src={prop.image} alt={prop.title} />

      <TitleStyled>{prop.title}</TitleStyled>

      <DescriptionStyled>{prop.description}</DescriptionStyled>

      <CategoryStyled>{prop.category}</CategoryStyled>

      <Price>
        <b>Price:</b> {prop.price}$
      </Price>

      <BottomCardBlock>
        <SpanQuantity>
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
        </SpanQuantity>
        <AddCartButton onClick={handleAddToCart} className="ms-auto">
          <MdAddShoppingCart />
        </AddCartButton>
      </BottomCardBlock>
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
