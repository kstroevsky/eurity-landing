import styled from "styled-components";

export const Content = styled("p")`
  margin-top: 1.5rem;
  transition: all 0.3s ease-in-out;

  a {
    color: black;
  }

  a>span {
    color: #91C788;
  }

  a>span:hover {
    color: rgb(255, 130, 92);
    text-underline-position: under;
    text-decoration: rgb(255, 130, 92) wavy underline;
    transition: all 0.3s ease-in-out;
  }

  span:hover 
`;

export const Container = styled("div")`
  position: relative;
`;

export const TextWrapper = styled("div")`
  border-radius: 3rem;
  max-width: 400px;
`;
