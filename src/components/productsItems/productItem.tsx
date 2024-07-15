import { useSelector } from "react-redux";
import {
  // selectAllProducts,
  selectIsCreatedByUser,
  selectIsLoggedIn,
  selectProducts,
  selectUser,
} from "../../axios/selectors";
import { format } from "date-fns";
import { ICart, IProduct } from "../../typesOrInterfaces/typesOrInterfaces";
import { useAppDispatch } from "../../hooks/useDispatch";
import { MdAddShoppingCart, MdDeleteForever } from "react-icons/md";
import { addUserCart } from "../../axios/cartOperations";
import { deleteProduct } from "../../axios/operations";
import {
  // useEffect,
  useState,
} from "react";
import {
  AddCartButton,
  DeleteUserProduct,
  DescriptionStyled,
  ImgStyled,
  ProductItemStyled,
  QuantityButton,
  TitleStyled,
  TooltipStyle,
} from "./ProductItem.style";
import { deleteCartItem } from "../../axios/cartSlice";

type Prop = {
  prop: IProduct;
};

const ProductItem = ({ prop }: Prop) => {
  const [count, setCount] = useState(0);
  const dispatch = useAppDispatch();
  const userIsLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const createdByUser = useSelector(selectIsCreatedByUser);

  // const products = useSelector(selectAllProducts);
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
  };

  // const checkIsInProducts = () => {
  //   const allProductsIds = products.map((i) => i.id);
  //   for (const cartItem of cardSelects) {
  //     if (!allProductsIds.includes(cartItem.productId)) {
  //       console.log(cartItem.productId);
  //       const id = Number(cartItem.productId);
  //       return dispatch(deleteCartItem({ id }));
  //     }
  //   }
  // };

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

      <TitleStyled>{prop.title}</TitleStyled>

      <DescriptionStyled>{prop.description}</DescriptionStyled>

      <p style={{ gridArea: "c", alignSelf: "self-end", textAlign: "justify" }}>
        {prop.category}
      </p>

      <p style={{ gridArea: "v" }}>{prop.price}$</p>

      {/* <span
        className="d-flex justify-content-between"
        style={{ width: "100%" }}
      > */}
      {/* <span className="d-flex align-items-center gap-2"> */}
      <span style={{ gridArea: "q", display: "flex" }}>
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
      {/* </span> */}
      <AddCartButton onClick={handleAddToCart} className="ms-auto">
        <MdAddShoppingCart />
      </AddCartButton>
      {/* </span> */}
      {/* <DeleteUserProduct
        onClick={handleDelete}
        className="position-absolute 
           d-flex justify-content-center align-items-center"
      >
        <MdDeleteForever />
      </DeleteUserProduct> */}

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
