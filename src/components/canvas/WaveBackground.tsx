import { useEffect, useRef }  from 'react';

const WaveComponent = ({...rest}) => {
    const canvasRef = useRef<any>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const offscreen = canvasRef.current.transferControlToOffscreen();
        // const worker = createWorker(canvas, new URL('./worker.js', import.meta.url));

        // worker.post( {
        //     drawingSurface: offscreen,
        //     width: canvas.clientWidth,
        //     height: canvas.clientHeight,
        //     pixelRatio: window.devicePixelRatio,
        // }, [ offscreen ] );

    }, []);

    return <canvas ref={canvasRef} style={{position:'absolute', zIndex:-1, opacity: 0.3}} {...rest}/>
}

export default WaveComponent; 