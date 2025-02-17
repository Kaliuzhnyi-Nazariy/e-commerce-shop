import styled from "styled-components";

export const MenuDiv = styled.div`
  display: flex;
  gap: 6px;

  @media screen and (max-width: 767px) {
    height: 90%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const MenuBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;

  @media screen and (max-width: 767px) {
    width: 140px;
  }

  @media screen and (min-width: 1440px) {
    width: 75px;
    height: 75px;
    font-size: 28px;
  }
`;

export const IsMobileDiv = styled.div`
  display: block;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

export const IsMoreThanMobileDiv = styled.div`
  display: none;
  @media screen and (min-width: 768px) {
    display: flex;
  }
`;
