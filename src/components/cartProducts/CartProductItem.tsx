import { deleteUserCart } from "../../axios/cart/cartOperations";
import { deleteProductFromCart } from "../../axios/products/operations";
import { useAppDispatch } from "../../hooks/useDispatch";
import { IProduct } from "../../typesOrInterfaces/typesOrInterfaces";
import {
  DescriptionStyled,
  ImgStyled,
  Price,
  TitleStyled,
  TooltipStyle,
} from "../productsItems/ProductItem.style";
import {
  DeleteButton,
  ProductDiv,
  QuantityField,
} from "./CartProductItem.style";

type Prop = {
  propMainInfo: IProduct;
  propSecondaryInfo: { productId: number; quantity: number } | undefined;
};

const CartProductItem = ({ propMainInfo, propSecondaryInfo }: Prop) => {
  const dispatch = useAppDispatch();

  const handleDeleteFromCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(deleteUserCart(Number(e.currentTarget.closest("div")?.id)));
    dispatch(deleteProductFromCart(Number(e.currentTarget.closest("div")?.id)));
  };

  return (
    <ProductDiv
      key={propMainInfo.id}
      id={propMainInfo.id.toString()}
      // className="d-flex flex-column align-items-center gap-2"
    >
      <TooltipStyle
        className="border rounded-circle position-absolute"
        data-tooltip={propMainInfo.description}
      >
        i
      </TooltipStyle>
      <ImgStyled src={propMainInfo.image} alt={propMainInfo.title} />
      <TitleStyled>{propMainInfo.title}</TitleStyled>
      <DescriptionStyled>{propMainInfo.description}</DescriptionStyled>
      <QuantityField>
        Quantity: {propSecondaryInfo?.quantity ?? "no info"}
      </QuantityField>
      <Price>Price: {propMainInfo.price}$</Price>
      <DeleteButton onClick={handleDeleteFromCart}>delete</DeleteButton>
    </ProductDiv>
  );
};

export default CartProductItem;
