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
        
        const kr = rect.width/window.innerWidth * 1.2;

        try {
            const offscreen = canvasWorkerRef.current!.transferControlToOffscreen();

            workerRef.current.postMessage(
                { 
                    msg: 'init', 
                    canvas: offscreen, 
                    dpr: kr,
                    sizes: {width: window.innerWidth, height: window.innerHeight}
                }, 
                [offscreen]
            );
        } catch {
            canvasWorkerRef.current!.width = Math.round(window.innerWidth * kr);
            canvasWorkerRef.current!.height = Math.round(window.innerHeight * kr);

            const canvasCtx = canvasWorkerRef.current!.getContext('2d', { alpha: false });
            canvasCtx!.scale(kr, kr);

            const animation = new AnimationWaves(canvasCtx, {width: window.innerWidth, height: window.innerHeight}, kr);
            animation.init();
            animation.run();
        }

    }, []);

    // TODO: add resize func
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
        <canvas
            ref={canvasWorkerRef}
            style={{
                position:'absolute', 
                zIndex:-1, 
                opacity: 0.6,
                width: 3240/dpr, 
                height: height,
                backgroundColor: 'white',
                left: dpr >= 3 ? -200 : 0, 
                top: dpr >= 3 ? 120 : 0,
            }} 
        />
    )
}

export default WaveComponent; 