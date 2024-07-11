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
`;

export const DeleteButton = styled.button`
  background-color: black;
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
`;
