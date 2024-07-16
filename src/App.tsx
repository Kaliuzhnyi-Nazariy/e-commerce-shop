import { useEffect, useState } from "react";
import "./App.css";
import { useAppDispatch } from "./hooks/useDispatch";
import {
  getAllProducts,
  getCategories,
  getExactCategory,
  getOneProduct,
} from "./axios/products/operations";
import { useSelector } from "react-redux";
import {
  selectAllProducts,
  selectCartProducts,
  selectProductError,
  selectProductIsLoging,
} from "./axios/products/productSelectors";
import { refreshUser } from "./axios/auth/authOperations";
import { SignUpModal } from "./components/auth/registration/SignUpModal";
import { LoginModal } from "./components/auth/login/LoginModal";
import { FaCartShopping } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
import ProductItem from "./components/productsItems/productItem";
import { Spinner, Stack } from "react-bootstrap";
import AddProductModal from "./components/addProduct/AddProductModal";
import CartProductItem from "./components/cartProducts/CartProductItem";
import { ClearButton } from "./components/ClearButton.styleS";
import {
  AppStyle,
  AuthNav,
  CategoryButton,
  CategoryName,
  CategoryPicked,
  DivIsMobile,
  DivIsNotMobile,
  DivIsNotMobileCategory,
  ImageCategory,
  MenuButton,
  MenuButtons,
  ProductsField,
  StuckStyled,
  StyledCartDiv,
  StyledImg,
} from "./components/appStyles";
import { OffCanvas } from "./components/OffCanvas";

import { Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import { BurgerMenu } from "./components/BurgerMenu/BurgerMenu";

import logoImg from "./assets/logo_for_e-comm_8d168fe7-7f71-4d2b-aa61-959ada1ac9f6-removebg-preview.png";
import {
  IsMobileDiv,
  IsMoreThanMobileDiv,
} from "./components/BurgerMenu/BurgerMenuStyled";
import { selectIsLoggedIn, selectUserError } from "./axios/auth/authSelectors";
import { selectCartError, selectProducts } from "./axios/cart/cartSellectors";
import {
  selectCategories,
  selectCategoriesError,
  selectCategoriesIsLoading,
} from "./axios/categories/categoriesSelectors";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const dispatch = useAppDispatch();

  const categories = useSelector(selectCategories);
  const products = useSelector(selectAllProducts);
  const userIsLoggedIn = useSelector(selectIsLoggedIn);
  const cartProducts = useSelector(selectCartProducts);
  const cardSelects = useSelector(selectProducts);
  const userError = useSelector(selectUserError);
  const cartError = useSelector(selectCartError);
  const categoriesError = useSelector(selectCategoriesError);
  const productsError = useSelector(selectProductError);

  const categoriesLoading = useSelector(selectCategoriesIsLoading);
  const productsLoading = useSelector(selectProductIsLoging);
  const [categoryPicked, setCategoryPeckied] = useState(null);

  if (userError.length > 0) {
    toast.error(userError);
  }

  if (cartError.length > 0) {
    toast.error(cartError);
  }

  if (categoriesError.length > 0) {
    toast.error(categoriesError);
  }

  if (productsError.length > 0) {
    toast.error(productsError);
  }

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getAllProducts());
    dispatch(refreshUser());
  }, [dispatch]);

  const handleClick = (category: string) => {
    dispatch(getExactCategory(category));
  };

  const handleAllProduct = () => {
    dispatch({ type: "cleanCartProducts" });
    dispatch(getAllProducts());
    setCategoryPeckied(null);
  };

  const handleUserCart = async () => {
    if (!userIsLoggedIn) return;
    const forCheckIsProductInCart = cartProducts.map((product) => product.id);
    const forCheckIsItInCart = cardSelects.map((i) => {
      if (!forCheckIsProductInCart.includes(i.productId)) {
        return true;
      }
      return false;
    });

    if (forCheckIsItInCart.includes(true)) {
      cardSelects.forEach((i) => dispatch(getOneProduct(i.productId)));
    }
  };

  const handleLogOut = () => {
    dispatch({ type: "cleanCreatedByUser" });
    dispatch({ type: "cleanCartProducts" });
    dispatch({ type: "user/logOut" });
    toast.success("We will wait for you!", {
      style: {
        border: "1px solid #074187",
        padding: "16px",
        color: "#074187",
      },
      iconTheme: {
        primary: "#074187",
        secondary: "#FFFAEE",
      },
    });
  };

  const handleCleanCart = () => {
    dispatch({ type: "cleanCartProducts" });
    dispatch({ type: "cleanProducts" });
    toast.success("Cart cleaned!");
  };

  const sortedCartProducts = [...cartProducts].sort((a, b) => a.id - b.id);
  const sortedCardSelects = [...cardSelects].sort(
    (a, b) => a.productId - b.productId
  );

  return (
    <AppStyle>
      <StuckStyled direction="horizontal">
        <button onClick={handleAllProduct} className="btn">
          <StyledImg src={logoImg} alt="SwiftShopper" />
        </button>
        <Stack className="ms-auto" direction="horizontal">
          {userIsLoggedIn ? (
            <>
              <IsMobileDiv>
                <BurgerMenu />
              </IsMobileDiv>
              <IsMoreThanMobileDiv>
                <MenuButtons>
                  <MenuButton
                    onClick={handleUserCart}
                    className="btn btn-outline-dark position-relative"
                  >
                    <StyledCartDiv>
                      {cardSelects.length !== 0 ? (
                        <> {cardSelects.length}</>
                      ) : (
                        <>0</>
                      )}
                    </StyledCartDiv>
                    <FaCartShopping />
                  </MenuButton>
                  <AddProductModal />
                  <MenuButton
                    onClick={handleLogOut}
                    className="btn btn-outline-dark"
                  >
                    <IoIosLogOut />
                  </MenuButton>
                </MenuButtons>
              </IsMoreThanMobileDiv>
            </>
          ) : (
            <>
              <DivIsMobile>
                <OffCanvas />
              </DivIsMobile>
              <DivIsNotMobile>
                <AuthNav>
                  <LoginModal />
                  <div className="vr"></div>
                  <SignUpModal />
                </AuthNav>
              </DivIsNotMobile>
            </>
          )}
        </Stack>
      </StuckStyled>
      {sortedCartProducts.length === 0 ? (
        <>
          {categoriesLoading ? (
            <Spinner animation="border" variant="warning" />
          ) : (
            <>
              <DivIsNotMobileCategory>
                <div className="d-flex gap-3 justify-content-evenly">
                  {categories.map((category) => (
                    <CategoryButton
                      onClick={() => {
                        handleClick(category);
                        setCategoryPeckied(category);
                      }}
                      className="btn d-flex flex-column align-items-center"
                      key={category}
                    >
                      <ImageCategory />
                      <CategoryName>{category}</CategoryName>
                    </CategoryButton>
                  ))}
                </div>
              </DivIsNotMobileCategory>
              <DivIsMobile>
                <Swiper
                  modules={[Scrollbar, A11y]}
                  spaceBetween={40}
                  slidesPerView={3}
                  style={{ width: "240px" }}
                  scrollbar={{ draggable: true }}
                >
                  {categories.map((category) => (
                    <SwiperSlide key={category}>
                      <CategoryButton
                        onClick={() => {
                          handleClick(category);
                          setCategoryPeckied(category);
                        }}
                        className="btn d-flex flex-column align-items-center"
                        key={category}
                      >
                        <ImageCategory />
                        <CategoryName key={category}>{category}</CategoryName>
                      </CategoryButton>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </DivIsMobile>
            </>
          )}
          <CategoryPicked>
            {categoryPicked ? categoryPicked : "All product"}
          </CategoryPicked>
        </>
      ) : (
        <></>
      )}
      <>
        {productsLoading ? (
          <>
            <Spinner animation="border" variant="warning" />
          </>
        ) : (
          <>
            {sortedCartProducts.length === 0 ? (
              <ProductsField className="d-flex">
                {products.map((i) => {
                  return <ProductItem prop={i} key={i.id} />;
                })}
              </ProductsField>
            ) : (
              <>
                {cardSelects ? (
                  <ProductsField className="d-flex">
                    {sortedCartProducts.map((i) => {
                      const selectedProduct = sortedCardSelects.find(
                        (item) => item.productId === i.id
                      );
                      return (
                        <CartProductItem
                          key={i.id}
                          propMainInfo={i}
                          propSecondaryInfo={selectedProduct}
                        />
                      );
                    })}
                  </ProductsField>
                ) : (
                  <></>
                )}
                <ClearButton onClick={handleCleanCart}>Clear</ClearButton>
              </>
            )}
          </>
        )}
      </>
      <Toaster position="top-right" reverseOrder={false} />
    </AppStyle>
  );
}

export default App;
