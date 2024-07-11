import styled from "styled-components";

export const ProductItemStyled = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;

  padding: 16px;

  border: 2px solid lightgray;
  border-radius: 16px;

  position: relative;

  width: 240px;
`;

export const QuantityButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 36px;
  height: 36px;

  border: 1px solid black;
  border-radius: 100%;
`;

export const AddCartButton = styled.button`
  width: 36px;
  height: 36px;

  border: 1px solid black;
`;

export const TooltipStyle = styled.p`
  left: 20px;
  width: 25px;
  height: 25px;
  background-color: rgba(255, 255, 255, 0.5);
`;

export const ImgStyled = styled.img`
  max-height: 150px;
  max-width: 200px;
`;

export const DescriptionStyled = styled.p`
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const DeleteUserProduct = styled.button`
  right: 20px;
  padding: 6px;
  color: red;
  background: transparent;
`;
