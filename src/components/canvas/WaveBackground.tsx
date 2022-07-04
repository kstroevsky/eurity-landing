import React, { RefObject, useEffect, useRef }  from 'react';

// import waveWorker from './wave.worker';

const initCanvas = (worker: RefObject<Worker | null>, canvas: RefObject<HTMLCanvasElement>) => {
    (worker.current as Worker) = new Worker(new URL('./wave.worker.js', import.meta.url));
    const offscreen = canvas.current!.transferControlToOffscreen();

    worker.current!.postMessage(
        { msg: 'init', canvas: offscreen }, 
        [offscreen]
    );
}

interface WaveComponentProps {
    height: number;
}

const WaveComponent: React.FC<WaveComponentProps> = ({ height }) => {
    // const canvasContainerRef = useRef<HTMLDivElement>(null)
    const workerRef = useRef<Worker | null>(null);
    const canvasWorkerRef = useRef<HTMLCanvasElement>(null);
    const dpr = window.devicePixelRatio || 1;

    useEffect(() => {
        console.log('initial start')
        workerRef.current = new Worker(new URL('./wave.worker.js', import.meta.url));
        const offscreen = canvasWorkerRef.current!.transferControlToOffscreen();
        const rect = canvasWorkerRef.current!.getBoundingClientRect()
        console.log(rect);

        workerRef.current.postMessage(
            { 
                msg: 'init', 
                canvas: offscreen, 
                dpr,
                sizes: rect || {width: window.innerWidth, height: window.innerHeight}
            }, 
            [offscreen]
        );

        // initCanvas(workerRef, canvasWorkerRef)
    }, []);

    // useEffect(() => {
    //     if (
    //         workerRef.current && 
    //         canvasWorkerRef.current && 
    //         Math.floor(rest.width) !== Math.floor(canvasWorkerRef.current.width)
    //     ) {
    //         console.log('resize')
    //         workerRef.current.terminate()
    //         initCanvas(workerRef, canvasWorkerRef);
    //     }
    // }, [rest.width])

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

    return (
        // <div ></div>
        <canvas
            ref={canvasWorkerRef}
            style={{
                position:'absolute', 
                zIndex:-1, 
                opacity: 0.6,
                width: 1200 * 1.35, 
                height: height,
                backgroundColor: 'white'
            }} 
        />
    )
}

export default WaveComponent; 