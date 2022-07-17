import React, { useEffect, useRef }  from 'react';
import AnimationWaves from './animation';

interface WaveComponentProps {
    height: number;
}

const isPortraitOrientation = (): boolean => {
    try {
        return window.screen.orientation.type === 'portrait-primary';
    } catch {
        return window.matchMedia("(orientation: portrait)").matches;
    }
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

    return (
        <canvas
            ref={canvasWorkerRef}
            style={{
                position:'absolute', 
                zIndex:-1, 
                opacity: 0.6,
                width: window.innerWidth > 567 ? 1600 : window.innerWidth * 2, 
                height: height,
                backgroundColor: 'white',
                left: dpr >= 2.5 ? -200 : 0, 
                top: dpr >= 2.5 && isPortraitOrientation() ? 120 : 0,
            }} 
        />
    )
}

export default React.memo(WaveComponent); 