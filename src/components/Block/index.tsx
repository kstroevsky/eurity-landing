import React from 'react'
import { withTranslation } from "react-i18next";
import { Link } from 'react-router-dom';
import { Container, TextWrapper, Content } from "./styles";

interface Props {
  title?: string;
  content?: string;
  t: any;
  link?: string;
}

const Block: React.FC<React.PropsWithChildren<React.PropsWithChildren<Props>>> = ({ title, content, t, link }) => {
  const subtitle = t(content).split(' ');

  return (
    <Container>
      <h6>{t(title)}</h6>
      <TextWrapper>
        <Content>{
          link 
            ? <Link
                className={'subtitle'} 
                to={{ pathname: "https://t.me/eurity" }} 
                target="_blank"
                >
                  {subtitle.splice(0, subtitle.length - 1).join(' ')} <span>{subtitle[0]}</span>
              </Link> 
            : t(content)
          }</Content>
      </TextWrapper>
    </Container>
  );
};

export default withTranslation()(Block);
