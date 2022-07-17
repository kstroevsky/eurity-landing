import React, { useEffect, useRef, useState }  from 'react';
import AnimationWaves from './animation';

interface WaveComponentProps {
    height: number;
}

const WaveComponent: React.FC<WaveComponentProps> = ({ height }) => {
    const workerRef = useRef<Worker | null>(null);
    const canvasWorkerRef = useRef<HTMLCanvasElement>(null);
    const [canvasWidth, setCanvasWidth] = useState<number>();
    const dpr = window.devicePixelRatio || 1;

    useEffect(() => {
        console.log(window.screen.orientation.type)
        setCanvasWidth(window.screen.orientation.type === 'portrait-primary' && dpr >= 2.5 ? 4000/dpr : 3420/dpr)
    }, [dpr])

    useEffect(() => {
        workerRef.current = new Worker(new URL('./wave.worker.js', import.meta.url));
        const rect = canvasWorkerRef.current!.getBoundingClientRect()
        
        const kr = rect.width/window.innerWidth * 1.2;

        console.log(3240/window.innerWidth, window.innerHeight, dpr, window.screen.orientation.type)

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
                width: 1600, 
                height: height,
                backgroundColor: 'white',
                left: dpr >= 2.5 ? -200 : 0, 
                top: dpr >= 2.5 && window.screen.orientation.type === 'portrait-primary' ? 120 : 0,
            }} 
        />
    )
}

export default React.memo(WaveComponent); 