import { lazy } from "react";
import IntroContent from "../../content/IntroContent.json";
import mEURERTYBlockContent from "../../content/mEURERTYContent.json";
import AboutContent from "../../content/AboutContent.json";
import FAQContent from "../../content/FAQContent.json";

const Container = lazy(() => import("../../common/Container"));
const ScrollToTop = lazy(() => import("../../common/ScrollToTop"));
const ContentBlock = lazy(() => import("../../components/ContentBlock"));
const FAQ = lazy(() => import("../../components/ContentBlock/FAQ"));

const Home = () => {
  return (
    <Container>
      <ScrollToTop />
      <ContentBlock
        type="right"
        title={IntroContent.title}
        content={IntroContent.text}
        button={IntroContent.button}
        icon="developer.svg"
        id="intro"
      />
      <ContentBlock
        type="left"
        title1={mEURERTYBlockContent.title1}
        content1={mEURERTYBlockContent.text1}
        title2={mEURERTYBlockContent.title2}
        content2={mEURERTYBlockContent.text2}
        icon="product-launch.svg"
        id="mission"
      />
      <ContentBlock
        type="left"
        title={AboutContent.title}
        section={AboutContent.section}
        icon="graphs.svg"
        id="about"
      />
      <FAQ
        info={FAQContent.info}
        title={FAQContent.title}
        content={FAQContent.text}
        section={FAQContent.section}
        link={FAQContent.link}
        id="faq"
      />
    </Container>
  );
};

export default Home;
