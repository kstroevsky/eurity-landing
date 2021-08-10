export const resizeCanvasToDisplaySize = (canvas:any) => {
    
    const { width, height, amplitude=0 } = canvas.getBoundingClientRect();

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      
      if (amplitude !== 0) {
        canvas.amplitude = canvas.height * amplitude;
      }

      return true; // here you can return some usefull information like delta width and delta height instead of just true
      // this information can be used in the next redraw...
    }

    return false;
}