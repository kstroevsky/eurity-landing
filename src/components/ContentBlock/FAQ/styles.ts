import styled from "styled-components";

export const LeftContentSection = styled("section")`
  position: relative;
  padding: 4rem 0 1rem;
  
  @media only screen and (max-width: 1024px) {
    padding: 4rem 0 4rem;
  }
  @media only screen and (max-width: 575px) {
    #mission>div {
      margin-bottom:4em;
    }
  }
`;

export const Content = styled("p")`
  margin: 1.5rem 0 2rem 0;
`;

export const ContentWrapper = styled("div")`
  position: relative;
  max-width: 540px;
  padding:20px;

  
`;

export const ServiceWrapper = styled("div")`
  position: relative;
  display:block;
  min-width: 100%;
  
  transition: 0.5s;
  padding-left:20%;

  :hover {
    transition: 0.5s;
    padding-left:15%;
  }
`;

export const MinTitle = styled("h6")`
  font-size: 22px;
  padding: 0.5rem 0;
  text-transform: uppercase;
  color: #000;
  font-family: "Motiva Sans Light", sans-serif;
`;

export const MinPara = styled("p")`
  font-size: 17px;
  border-bottom: 1px solid black;
`;
