import { useEffect, useState } from "react";
import "./App.css";
import { useAppDispatch } from "./hooks/useDispatch";
import {
  getAllProducts,
  getCategories,
  getExactCategory,
  getOneProduct,
} from "./axios/operations";
import { useSelector } from "react-redux";
import {
  selectAllProducts,
  selectCartProducts,
  selectCategories,
  selectIsLoggedIn,
  selectProducts,
} from "./axios/selectors";
import { refreshUser } from "./axios/authOperations";
import { SignUpModal } from "./components/auth/registration/SignUpModal";
import { LoginModal } from "./components/auth/login/LoginModal";
import { FaCartShopping } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
import ProductItem from "./components/productsItems/productItem";
import { Stack } from "react-bootstrap";
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

function App() {
  const dispatch = useAppDispatch();

  const categories = useSelector(selectCategories);
  const products = useSelector(selectAllProducts);
  const userIsLoggedIn = useSelector(selectIsLoggedIn);
  const cartProducts = useSelector(selectCartProducts);
  const cardSelects = useSelector(selectProducts);

  const [categoryPicked, setCategoryPeckied] = useState(null);

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
  };

  const handleCleanCart = () => {
    dispatch({ type: "cleanCartProducts" });
    dispatch({ type: "cleanProducts" });
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
                <SwiperSlide>
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
                </SwiperSlide>
              ))}
            </Swiper>
          </DivIsMobile>
          <CategoryPicked>
            {categoryPicked ? categoryPicked : "All product"}
          </CategoryPicked>
        </>
      ) : (
        <></>
      )}
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
    </AppStyle>
  );
}

export default App;
