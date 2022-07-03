import React, {useEffect, useState} from "react";
import { Row, Col } from "antd";
import { withTranslation } from "react-i18next";
import { SvgIcon } from "../../../common/SvgIcon";
import useResizeAware from 'react-resize-aware';
import { Button } from "../../../common/Button";
import { ContentBlockProps } from "../types";
import WaveComponent from '../../canvas/WaveBackground';
import {
  RightBlockContainer,
  Content,
  ContentWrapper,
  ButtonWrapper,
} from "./styles";

const RightBlock = ({
  title,
  content,
  button,
  icon,
  t,
  id,
}: ContentBlockProps) => {
  const [canvasWidth, setCanvasWidth] = useState<number>(window.innerWidth * 1.2)
  const scrollTo = (id: string) => {
    const element = document.getElementById(id) as HTMLDivElement;
    element.scrollIntoView({
      behavior: "smooth",
    });
  };

  const [resizeListener, sizes] = useResizeAware();

  // useEffect(() => {
  //   console.log(sizes.width)
  //   setCanvasWidth(prev => sizes.width || prev)
  // }, [sizes.width])

  return (
    <RightBlockContainer>
      {resizeListener}
        <Row justify="space-between" align="middle" id={id}>
          <Col lg={24} md={24} sm={24} xs={24}>
            {id === 'intro' && (
              <WaveComponent
                // width={sizes.width || window.innerWidth * 1.2} 
                // height={sizes.height || window.innerHeight}
              />
            )}
            <ContentWrapper>
              <h6>{t(title)}</h6>
              <Content>{t(content)}</Content>
              <ButtonWrapper>
                {typeof button === "object" &&
                  button.map((item: any, id: number) => {
                    return (
                      <Button
                        key={id}
                        color={item.color}
                        fixedWidth={true}
                        onClick={() => scrollTo("about")}
                      >
                        {t(item.title)}
                      </Button>
                    );
                  })}
              </ButtonWrapper>
            </ContentWrapper>
          </Col>
        </Row>
    </RightBlockContainer>
  );
};

export default withTranslation()(RightBlock);
