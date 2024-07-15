import styled from "styled-components";

export const ProductDiv = styled.div`
  border: 2px solid lightgray;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 12px;

  width: 240px;
  align-items: center;

  position: relative;

  @media screen and (min-width: 768px) {
    width: 300px;
  }

  @media screen and (min-width: 1024px) {
    width: 700px;
    height: 450px;
    flex-direction: row;
    display: grid;
    grid-template-rows: repeat(3, 1fr);
    grid-template-columns: repeat(10, 1fr);
    grid-template-areas:
      " p p . t t t t t t t"
      " p p . d d d d d d d"
      " p p . v v . . q q e";
  }
`;

export const QuantityField = styled.p`
  @media screen and (min-width: 1024px) {
    grid-area: q;
    display: grid;
    align-items: center;
  }
`;

export const DeleteButton = styled.button`
  background-color: black;
  color: white;
  padding: 8px 16px;
  border-radius: 20px;

  @media screen and (min-width: 1024px) {
    grid-area: e;
  }
`;
