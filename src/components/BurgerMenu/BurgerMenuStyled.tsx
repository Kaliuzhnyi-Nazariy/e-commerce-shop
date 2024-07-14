import styled from "styled-components";

export const MenuDiv = styled.div`
  display: flex;
  gap: 6px;

  @media screen and (max-width: 767px) {
    height: 90vh;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const MenuBtn = styled.button`
  width: 140px;
`;
