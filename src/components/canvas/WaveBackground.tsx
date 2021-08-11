import React  from 'react';
import useCanvas from './useCanvas'; 
import { resizeCanvasToDisplaySize } from './resizeCanvas';

const _predraw = (context:any, canvas:any) => { 
    context.save()
    resizeCanvasToDisplaySize(context, canvas)
    const { width, height } = context.canvas
    context.clearRect(0, 0, width, height)
 }

const WaveComponent = (props:any) => {
    
    const { draw, predraw=_predraw, ...rest} = props;
    const canvasRef = useCanvas(draw, {predraw});

    return <canvas style={{position:'absolute', zIndex:-1, opacity: 0.2, top: '-15%'}} ref={canvasRef} {...rest}/>
}

export default WaveComponent; 