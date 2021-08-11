import React, { useEffect }  from 'react';
import useCanvas from './useCanvas'; 

const WaveComponent = (props:any) => {
    
    const { draw, ...rest} = props;
    const canvasRef = useCanvas(draw);

    return <canvas style={{position:'absolute', zIndex:-1, opacity: 0.2, top: '-15%'}} ref={canvasRef} {...rest}/>
}

export default WaveComponent; 