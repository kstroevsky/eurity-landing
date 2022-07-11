import styled from "styled-components";

export const LeftContentSection = styled("section")`
  position: relative;
  padding: 4rem 0 1rem;

  #sub-title {
    position: sticky;
    top: 0;
  }
  
  @media only screen and (max-width: 1024px) {
    padding: 4rem 0 4rem;
  }

  @media only screen and (max-width: 767px) {
    padding: 2rem 0 2rem;
    #sub-title {
      position: relative;
    }
  }

  @media only screen and (max-width: 575px) {
    #mission>div {
      margin-bottom:4em;
    }

    #sub-title {
      position: relative;
    }
  }
`;

export const Content = styled("p")`
  margin: 1.5rem 0 2rem 0;
`;

export const ContentWrapper = styled("div")`
  position: relative;
  max-width: 540px;
  padding: 20px;
`;

export const ServiceWrapper = styled("div")`
  position: relative;
  display: block;
  min-width: 100%;
  
  transition: 0.5s;
  padding-left: 15%;

  cursor: default;

  :hover {
    transition: 0.5s;
  }
`;

export const MinTitle = styled("h6")`
  font-size: 26px;
  padding: 0.8rem 0 0 0;
  // padding-top: 0.7rem;
  text-transform: none;
  color: #000;
  font-family: "Motiva Sans Bold", sans-serif;
  // font-weight: 999;

  .currency-green {
    color: #448361;
  }

  .back-green {
    background-color: #EDF3EC;
  }
`;

export const MinPara = styled("div")`
  transition: 0.8s;
  border-bottom: 1px solid white;

  :hover {
    border-bottom-color: black;
    transition: 0.8s;
  }

  p {
    font-size: 18px;
  }

  ul {
    border-top: 1px solid #DFDFDE;
    font-size: 18px;
    padding-top: 7px;
  }

  li {
    padding-top: 7px;
  }

  .currency-green {
    color: #448361;
  }

  .def-bold {
    font-weight: 999;
  }
`;
