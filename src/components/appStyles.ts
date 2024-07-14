import styled from "styled-components";

export const AppStyle = styled.div`
  height: 100%;
  width: 320px;
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
`;

export const AuthDiv = styled.div`
  display: flex;
  gap: 6px;

  @media screen and (max-width: 767px) {
    height: 90vh;
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
`;

export const MenuButtons = styled.div`
  display: flex;
  gap: 12px;
`;

export const CategoryButton = styled.button`
  margin: 0;
  padding: 0;
`;

export const CategoryName = styled.p`
  max-width: 60px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
