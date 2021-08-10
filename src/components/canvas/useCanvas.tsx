import { useRef, useEffect } from 'react';
import Wave from './Wave';
import { resizeCanvasToDisplaySize } from './resizeCanvas';

const useCanvas = (draw:any, options={}) => {
  
  const canvasRef = useRef<any>(null);
  
  useEffect(() => {
    
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    resizeCanvasToDisplaySize(canvas);

    const run = (callback:any) => {
        window.requestAnimationFrame(()=>{
            run(callback);
        })
        callback(context);
    }

    let frameCount:number;
    let animationFrameId:number;

    const gradients = [
        ['white', 'black'],
        ['white', 'black'],
        ['white', 'black'],
        ['white', 'black'],
        ['white', 'black'],
        ['white', 'black'],
    ]

    let waves:any[] = [];

    const init = ()=>{
        waves = []
        for(let i=0; i<25; i++){
            const [start,stop] = gradients[Math.floor(Math.random() * gradients.length)]  //解构赋值，数组的解构赋值  
            waves.push(
                new Wave(canvas,{
                    start:start,
                    stop:stop,
                    lineWidth:1, 
                    xSpeed: 0.005,
                    amplitude: 0.3,
                    offset: i*0.1
                })
            )
        }
    }

    init();

    run((context:any):void => {
        context.clearRect(0,0, canvas.width, canvas.height);
        waves.forEach((wave)=>{
            wave.draw(context);
        })
    }) 

    
  }, [draw]);

  return canvasRef;
}

export default useCanvas;