import styled from "styled-components";

export const ProductItemStyled = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: space-between;

  padding: 16px;

  border: 2px solid lightgray;
  border-radius: 16px;

  position: relative;

  width: 240px;
  height: 420px;

  @media screen and (min-width: 768px) {
    width: 300px;
  }

  @media screen and (min-width: 1024px) {
    width: 700px;
    flex-direction: row;
    display: grid;
    grid-template-rows: repeat(4, 1fr);
    grid-template-columns: repeat(10, 1fr);
    grid-template-areas:
      " p p . t t t t t t t"
      " p p . d d d d d d d"
      " p p . c c . . . . ."
      " p p . v . . . . q  b";
  }
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

  @media screen and (min-width: 1024px) {
    grid-area: b;
  }
`;

export const TooltipStyle = styled.p`
  left: 20px;
  width: 25px;
  height: 25px;
  background-color: rgba(255, 255, 255, 0.5);

  @media screen and (min-width: 1024px) {
    top: 20px;
  }
`;

export const ImgStyled = styled.img`
  max-height: 150px;
  max-width: 200px;

  @media screen and (min-width: 1024px) {
    max-width: 100%;
    max-height: 100%;
    grid-area: p;
  }
`;

export const TitleStyled = styled.p`
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media screen and (min-width: 768px) {
    max-width: 260px;
  }

  @media screen and (min-width: 1024px) {
    max-width: 100%;
    max-height: 150px;
    white-space: wrap;
    grid-area: t;
    text-align: justify;
  }
`;

export const DescriptionStyled = styled.p`
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media screen and (min-width: 768px) {
    max-width: 260px;
  }

  @media screen and (min-width: 1024px) {
    max-width: 100%;
    max-height: 150px;
    white-space: wrap;
    grid-area: d;
    align-self: self-start;
    text-align: justify;
  }
`;

export const DeleteUserProduct = styled.button`
  right: 20px;
  padding: 6px;
  color: red;
  background: transparent;
  border-radius: 100%;
  border: 1px solid rgba(0, 0, 0, 0.2);

  @media screen and (min-width: 1024px) {
    top: 20px;
  }
`;
