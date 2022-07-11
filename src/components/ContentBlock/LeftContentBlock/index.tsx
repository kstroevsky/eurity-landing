import { Row, Col } from "antd";
import { withTranslation } from "react-i18next";
import { SvgIcon } from "../../../common/SvgIcon";
import { ContentBlockProps } from "../types";
import {
  LeftContentSection,
  Content,
  ContentWrapper,
  ServiceWrapper,
  MinTitle,
  MinPara,
} from "./styles";

const LeftContentBlock = ({
  title,
  content,
  icon,
  title1,
  content1,
  title2,
  content2,
  section,
  t,
  id,
}: ContentBlockProps) => {
  return (
    <LeftContentSection>
        {title && <h6 style={{textAlign:'center'}}>{title}</h6>}
        <Row justify="space-between" align="middle" id={id}>
          <Col lg={11} md={11} sm={12} xs={24}>
            <ContentWrapper style={title === 'Details' ? {padding: 0} : {}}>
              <div className='textCard' style={title === 'Details' ? {padding: 0} : {}}>
                {title1 && <h6>{t(title1)}</h6>}
                {content1 && <Content>{t(content1)}</Content>}
                <ServiceWrapper>
                  <Row justify="center" style={{alignContent: "stretch", paddingBottom: title === 'Details' ? 0 : undefined}}>
                    {typeof section === "object" &&
                      section.map((item: any, id: number) => {
                        if ((id+1)%2 !== 0) {
                          return (
                            <Col key={id} span={16}>
                              <SvgIcon src={item.icon} width="60px" height="60px" />
                              <MinTitle>{t(item.title)}</MinTitle>
                              <MinPara style={title === 'Details' ? {marginBottom: '3em'} : {}}>{t(item.content)}</MinPara>
                            </Col>
                          )
                        }
                      })}
                  </Row>
                </ServiceWrapper>
              </div>
            </ContentWrapper>
          </Col>
          <Col lg={11} md={11} sm={11} xs={24}>
            <ContentWrapper style={title === 'Details' ? {padding: 0} : {}}>
              <div className='textCard' style={title === 'Details' ? {padding: 0} : {}}>
                {title2 && <h6>{t(title2)}</h6>}
                {content2 && <Content>{t(content2)}</Content>}
                <ServiceWrapper>
                  <Row justify="center" style={{alignContent: "stretch", paddingBottom: title === 'Details' ? 0 : undefined}}>
                    {typeof section === "object" &&
                      section.map((item: any, id: number) => {
                        
                        if ((id+1)%2 === 0) {
                          console.log(id)
                          return (
                            <Col key={id} span={16}>
                              <SvgIcon src={item.icon} width="60px" height="60px" />
                              <MinTitle>{t(item.title)}</MinTitle>
                              <MinPara style={title === 'Details' ? {marginBottom: '3em'} : {}}>{t(item.content)}</MinPara>
                            </Col>
                          );
                        }
                      })}
                  </Row>
                </ServiceWrapper>
              </div>
            </ContentWrapper>
          </Col>
        </Row>
    </LeftContentSection>
  );
};

export default withTranslation()(LeftContentBlock);
