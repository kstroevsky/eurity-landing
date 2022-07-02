import React from "react";
import * as ReactAwesomeReveal from "react-awesome-reveal";

declare module "react-awesome-reveal" {
    interface SlideProps extends Omit<ReactAwesomeReveal.RevealProps, "keyframes" | "css"> {
        children?: React.ReactNode;
    }
    interface ZoomProps extends Omit<ReactAwesomeReveal.RevealProps, "keyframes" | "css"> {
        children?: React.ReactNode;
    }
}