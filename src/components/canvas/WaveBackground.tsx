import React, { RefObject, useEffect, useRef }  from 'react';
import { AnimationWaves } from './animation';

// import waveWorker from './wave.worker';

const initCanvas = (worker: RefObject<Worker | null>, canvas: RefObject<HTMLCanvasElement>) => {
    (worker.current as Worker) = new Worker(new URL('./wave.worker.js', import.meta.url));
    const offscreen = canvas.current!.transferControlToOffscreen();

    worker.current!.postMessage(
        { msg: 'init', canvas: offscreen }, 
        [offscreen]
    );
}

const getVariables = (): Array<any> => {
    let animation = null;
    let canvas, canvasCtx;

    return [animation, canvas, canvasCtx]
};

interface WaveComponentProps {
    height: number;
}

const WaveComponent: React.FC<WaveComponentProps> = ({ height }) => {
    const workerRef = useRef<Worker | null>(null);
    const canvasWorkerRef = useRef<HTMLCanvasElement>(null);
    const dpr = window.devicePixelRatio || 1;

    useEffect(() => {
        workerRef.current = new Worker(new URL('./wave.worker.js', import.meta.url));
        const rect = canvasWorkerRef.current!.getBoundingClientRect()
        console.log(window.orientation);

        try {
            const offscreen = canvasWorkerRef.current!.transferControlToOffscreen();

            workerRef.current.postMessage(
                { 
                    msg: 'init', 
                    canvas: offscreen, 
                    dpr,
                    sizes: rect || {width: window.innerWidth, height: window.innerHeight}
                }, 
                [offscreen]
            );
        } catch {
            canvasWorkerRef.current!.width = Math.round(rect.width * dpr);
            canvasWorkerRef.current!.height = Math.round(rect.height * dpr);

            const canvasCtx = canvasWorkerRef.current!.getContext('2d', { alpha: false });
            canvasCtx!.scale(dpr, dpr);

            const animation = new AnimationWaves(canvasCtx, rect, dpr);
            animation.init();
            animation.run();
        }

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