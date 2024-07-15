import styled from "styled-components";

export const ClearButton = styled.button`
  background-color: black;
  color: white;

  padding: 8px 16px;

  border-radius: 20px;

  margin-top: 12px;

  transition: all 0.25s;

  &:hover,
  &:focus {
    transform: scale(1.1);
  }

  @media screen and (min-width: 768px) {
    margin-top: 16px;
  }

  @media screen and (min-width: 768px) {
    padding: 12px 20px;
    margin-bottom: 8px;
  }
`;
