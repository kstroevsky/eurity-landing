import React from 'react'
import { withTranslation } from "react-i18next";
import { Container, TextWrapper, Content } from "./styles";

interface Props {
  title?: string;
  content?: string;
  t: any;
}

const Block: React.FC<Props> = ({ title, content, t }) => {  
  return (
    <Container>
      <h6>{t(title)}</h6>
      <TextWrapper>
        <Content>{t(content)}</Content>
      </TextWrapper>
    </Container>
  );
};

export default withTranslation()(Block);
