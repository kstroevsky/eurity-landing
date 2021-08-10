import { Row, Col } from "antd";
import { withTranslation } from "react-i18next";
import { Slide, Zoom, Fade } from "react-awesome-reveal";
import { Button } from "../../../common/Button";
import Block from "../../Block";
import { ContentBlockProps } from "../types";
import {
  LeftContentSection,
  Content,
  ContentWrapper,
  ServiceWrapper,
  MinTitle,
  MinPara,
} from "./styles";

const FAQ = ({ title, content, id, t, section, info }: ContentBlockProps) => {

  return (
    <LeftContentSection>
      <Fade direction="down">
        {title ? <h6 style={{textAlign:'center'}}>{title}</h6> : <></> }
      </Fade>
      <Row justify="space-between" align="middle" id={id}>
        <Col lg={6} md={11} sm={24} xs={24}>
          <Slide direction="left">
            <Block title={info} content={content} />
          </Slide>
        </Col>
        <Col lg={18} md={12} sm={24} xs={24}>
          <Slide direction="right">
              <Row justify="center" style={{alignContent: "stretch"}}>
                {typeof section === "object" &&
                  section.map((item: any, id: number) => {
                      return (
                        <ServiceWrapper>
                          <Col key={id} span={20} style={{minHeight:"5em", maxWidth:"100%"}}>
                            <MinTitle>{t(item.title)}</MinTitle>
                            <MinPara>{t(item.content)}</MinPara>
                          </Col>
                        </ServiceWrapper>
                      );
                  })}
              </Row>
          </Slide>
        </Col>
      </Row>
    </LeftContentSection>
  );
};

export default withTranslation()(FAQ);
