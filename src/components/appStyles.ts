import { Stack } from "react-bootstrap";
import styled from "styled-components";

export const AppStyle = styled.div`
  height: 100%;
  width: 280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-y: auto;

  max-width: 100vw;
  overflow-x: hidden;

  @media screen and (min-width: 768px) {
    width: 700px;
  }

  @media screen and (min-width: 1440px) {
    min-width: 1200px;
  }
`;

export const StuckStyled = styled(Stack)`
  min-width: 260px;

  @media screen and (min-width: 768px) {
    min-width: 700px;
  }

  @media screen and (min-width: 1440px) {
    min-width: 1200px;
  }
`;

export const StyledImg = styled.img`
  height: 50px;

  @media screen and (min-width: 768px) {
    height: 100px;
  }

  @media screen and (min-width: 1440px) {
    height: 175px;
  }
`;

export const StyledCartDiv = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: tomato;
  top: -10px;
  right: -12px;
  border-radius: 100%;
  font-size: 12px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;

  @media screen and (min-width: 1440px) {
    width: 40px;
    height: 40px;
    font-size: 20px;

    top: -14px;
    right: -20px;
  }
`;

export const AuthNav = styled.nav`
  display: flex;
  gap: 6px;

  @media screen and (max-width: 767px) {
    height: 90%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const DivIsMobile = styled.div`
  display: block;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

export const DivIsNotMobile = styled.div`
  display: none;
  @media screen and (min-width: 768px) {
    display: block;
  }
`;

export const DivIsNotMobileCategory = styled.div`
  display: none;
  @media screen and (min-width: 768px) {
    display: block;
    width: 80%;
  }
`;

export const ImageCategory = styled.div`
  width: 40px;
  height: 40px;
  overflow: hidden;
  background-image: url("https://images.pexels.com/photos/7319328/pexels-photo-7319328.jpeg");
  background-size: cover;
  background-position: 50% 50%;
  border: 2px solid #ccc;
  border-radius: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media screen and (min-width: 768px) {
    width: 60px;
    height: 60px;
  }

  @media screen and (min-width: 1440px) {
    width: 100px;
    height: 100px;
  }
`;

export const MenuButtons = styled.div`
  display: flex;
  gap: 12px;

  @media screen and (min-width: 768px) {
    gap: 16px;
  }

  @media screen and (min-width: 1440px) {
    gap: 20px;
  }
`;

export const MenuButton = styled.button`
  width: 50px;
  height: 50px;

  @media screen and (min-width: 1440px) {
    width: 75px;
    height: 75px;
    font-size: 28px;
  }
`;

export const CategoryButton = styled.button`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (min-width: 768px) {
    width: 150px;
  }

  @media screen and (min-width: 1024px) {
    width: 200px;
  }
`;

export const CategoryName = styled.p`
  max-width: 60px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: capitalize;

  @media screen and (min-width: 768px) {
    max-width: 100px;
    font-size: 20px;
  }

  @media screen and (min-width: 1440px) {
    max-width: 200px;
    font-size: 24px;
  }
`;

export const CategoryPicked = styled.h2`
  text-transform: capitalize;
`;

export const ProductsField = styled.div`
  flex-direction: column;
  align-items: center;
  height: 100%;
  gap: 12px;

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px;
  }
`;

export const ClearButton = styled.span`
  margin-top: 12px;

  @media screen and (min-width: 768px) {
    margin-top: 16px;
  }
`;
