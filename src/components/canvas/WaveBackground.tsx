import { useEffect, useRef }  from 'react';

// import waveWorker from './wave.worker';

const WaveComponent = ({...rest}) => {
    const workerRef = useRef<Worker | null>(null);
    const canvasWorkerRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        workerRef.current = new Worker(new URL('./wave.worker.js', import.meta.url));
        const offscreen = canvasWorkerRef.current!.transferControlToOffscreen();
        console.log(new URL('wave.worker.js', import.meta.url), workerRef.current, canvasWorkerRef.current, offscreen)

        workerRef.current.postMessage(
            { msg: 'init', canvas: offscreen }, 
            [offscreen]
        );

    }, []);

    // useEffect(() => {
    //     const canvas = canvasRef.current;

    //     const ctx = canvas.getContext('bitmaprenderer');
    //     const offscreenCanvas = new OffscreenCanvas(canvas.width, canvas.height);
    //     const worker = new Worker(new URL('./worker.js', import.meta.url));

    //     worker.postMessage({msg: 'init', canvas: offscreenCanvas}, [offscreenCanvas]);

    //     worker.addEventListener('message', function(ev) {
    //         if(ev.data.msg === 'render') {
    //           ctx.transferFromImageBitmap(ev.data.bitmap);
    //         }
    //     }

    // }, []);

    return <canvas ref={canvasWorkerRef} style={{position:'absolute', zIndex:-1, opacity: 0.3}} {...rest}/>
}

export default WaveComponent; 