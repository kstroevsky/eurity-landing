import { SvgIconProps } from "../types";

export const SvgIcon = ({ src, width, height }: SvgIconProps) => (
  <img src={`/img/svg/${src}`} alt={src} width={width} height={height} style={{margin:'auto', display: 'block', strokeWidth:"20"}}/>
);
