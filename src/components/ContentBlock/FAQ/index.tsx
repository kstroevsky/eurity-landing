import { Row, Col } from "antd";
import { withTranslation } from "react-i18next";
import { Button } from "../../../common/Button";
import Block from "../../Block";
import { ContentBlockProps } from "../types";
import {
  LeftContentSection,
  ServiceWrapper,
  MinTitle,
  MinPara,
} from "./styles";

const checkIndependenOfSpecialSymbols = (
  target: Record<string, string>, word: string
): string => 
  word in target 
    ? word 
    : word.replace(/\W/g, '') in target 
      ? word.replace(/\W/g, '') 
      : '';

const findAllIndexes = (
  arr: string[], pattern: string, exlcude: boolean
): number[] => arr.reduce(
  (acc: number[], item: string, idx: number) => 
    item === pattern 
      ? exlcude 
        ? acc 
        : [...acc, idx] 
      : exlcude 
        ? [...acc, idx] 
        : acc,
  []
);

const findAllMatches = (
  text: string, pattern: string
): string[] => 
  text.includes(pattern) 
    ? [
        ...findAllMatches(text.slice(0, text.indexOf(pattern)), pattern), 
        pattern, 
        ...findAllMatches(text.slice(text.indexOf(pattern) + pattern.length), pattern)
      ] 
    : [text];

const parseByRules = (text: string, rules: Record<string, string>) => {
  const parsedRules = Object.keys(rules).filter(rule => text.includes(rule))

  if (parsedRules.length) {
    return parsedRules.length > 1 
      ? parsedRules
        .slice(1)
        .reduce((acc: string[], rule: string) => {
          const targetIndexes = findAllIndexes(acc, rule, true)

          return acc.reduce((inAcc: string[], item: string, idx: number) => idx in targetIndexes ? [...inAcc, ...findAllMatches(item, rule)] : inAcc, [])
        }, [...findAllMatches(text, parsedRules[0])])
      : findAllMatches(text, parsedRules[0])
  }

  return [text];
}

const contentTextToJSX = (text: string, rules?: Record<string, string>) => {
  return (
    <>
      {rules 
        ? parseByRules(text, rules).map((word: string, idx: number) => {
          const match = checkIndependenOfSpecialSymbols(rules, word);
          
          return (
            match
              ? <span key={rules[match] + idx} className={rules[match]}>{match}</span> 
              : word
          )
        }) : text
      }
    </>
  )
}

const contentListToJSXList = (content: string[], rules?: Record<string, string>) => {
  return (
    <>
      {
        <ul key={'list-' + content[0][0]}>
          {content.map((text: string, idx: number) => (
            <li key={'list-item-' + text[0] + idx}>
              {contentTextToJSX(text.slice(2), rules)}
            </li>
          ))}
        </ul>
      }
    </>
  )
}

const contentToJSX = (content: string[] | string, rules?: Record<string, string>, isTitle?: boolean) => {
  const hasList = Array.isArray(content) ? content.findIndex((text) => text.startsWith('- ')) : -1

  if (Array.isArray(content) && hasList >= 0) {
    return (
      <>
        {
          content.slice(0, hasList)
            .map((text: string, idx: number) => (
              <p key={text[0] + idx}>
                {contentTextToJSX(text, rules)}
              </p>
            ))
        }
        {contentListToJSXList(content.slice(hasList))}
      </>
    )
  }

  return (
    <>
      {
        Array.isArray(content) 
          ? content.map((text: string, idx: number) => (
            <p key={text[0] + idx}>
              {contentTextToJSX(text, rules)}
            </p>
          )) : isTitle 
            ? contentTextToJSX(content, rules)
            : (
            <p key={content[0] + 0}>
              {contentTextToJSX(content, rules)}
            </p>
          )
      }
    </>
  )
}

const FAQ = ({ title, content, id, t, section, info }: ContentBlockProps) => {

  return (
    <LeftContentSection>
        {title ? <h6 style={{textAlign:'center'}}>{title}</h6> : <></> }
      <Row justify="space-between" align="top" id={id}>
        <Col lg={6} md={11} sm={24} xs={24}>
            <Block title={info} content={content} />
        </Col>
        <Col lg={18} md={12} sm={24} xs={24}>
          <Row justify="center" style={{alignContent: "stretch"}}>
            {typeof section === "object" &&
              section.map((item: any, id: number) => {
                  return (
                    <ServiceWrapper key={id}>
                      <Col span={20} style={{minHeight:"5em", maxWidth:"100%"}}>
                        <MinTitle>
                          {contentToJSX(item.title, {
                            mEUR: 'currency-green',
                            'earn ERTY': 'back-green', 
                            'earn ON ERTY': 'back-green'
                          }, true)}
                        </MinTitle>
                        <MinPara>
                          {contentToJSX(
                            item.content, 
                            {
                              mEUR: 'currency-green', 
                              Vaults: 'def-bold', 
                              DEXes: 'def-bold', 
                            }
                          )}
                        </MinPara>
                      </Col>
                    </ServiceWrapper>
                  );
              })}
          </Row>
        </Col>
      </Row>
    </LeftContentSection>
  );
};

export default withTranslation()(FAQ);
