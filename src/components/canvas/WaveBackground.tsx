import React  from 'react';
import useCanvas from './useCanvas'; 
import { resizeCanvasToDisplaySize } from './resizeCanvas';

export const WaveComponent = (props:any) => {
    
    const { draw, options, ...rest } = props;
    const canvasRef = useCanvas(draw);

    return <canvas style={{position:'absolute', zIndex:-1, opacity: 0.2, top: '-15%'}} ref={canvasRef} {...rest}/>
}