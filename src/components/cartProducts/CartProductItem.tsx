import { deleteUserCart } from "../../axios/cartOperations";
import { deleteProductFromCart } from "../../axios/operations";
import { useAppDispatch } from "../../hooks/useDispatch";
import { IProduct } from "../../typesOrInterfaces/typesOrInterfaces";
import {
  DescriptionStyled,
  ImgStyled,
  TooltipStyle,
} from "../productsItems/ProductItem.style";
import { DeleteButton, ProductDiv } from "./CartProductItem.style";

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
      <p>{propMainInfo.title}</p>
      <DescriptionStyled>{propMainInfo.description}</DescriptionStyled>
      <span>Quantity: {propSecondaryInfo?.quantity ?? "no info"}</span>
      <span>Price: {propMainInfo.price}</span>
      <DeleteButton onClick={handleDeleteFromCart}>delete</DeleteButton>
    </ProductDiv>
  );
};

export default CartProductItem;
