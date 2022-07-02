import styled from "styled-components";

export const LeftContentSection = styled("section")`
  position: relative;
  padding: 4rem 0 1rem;
  
  #mission h6 {font-size:2em;}
  
  #mission {align-items: stretch}

  #mission>div {
    display: flex; 
    align-items: baseline; 
    borderColor: rgba(122,199,240,0.4);
    background: linear-gradient(200deg, #b2d3c2, #FDF8D0);
    box-shadow: 0px 4px 8px rgba(41, 49, 71, 0.1);
    border-radius: 5%;
    transition: 0.5s;
  }

  #mission>div:hover {
    transition: 0.5s; 
    box-shadow: 0px 16px 32px rgba(41, 49, 71, 0.1);
  }

  .textCard {padding: 10px 0;}
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
  margin: 1.5rem 0 0 0;
`;

export const ContentWrapper = styled("div")`
  position: relative;
  max-width: 540px;
  padding:20px;

  
`;

export const ServiceWrapper = styled("div")`
  display: flex;
  justify-content: center;
  max-width: 100%;
`;

export const MinTitle = styled("h6")`
  font-size: 22px;
  padding: 0.5rem 0;
  text-transform: uppercase;
  color: #000;
  font-family: "Motiva Sans Light", sans-serif;
  text-align: center;
`;

export const MinPara = styled("p")`
  font-size: 17px;
  text-align: center;
`;
