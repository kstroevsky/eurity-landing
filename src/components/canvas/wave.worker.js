/* eslint no-restricted-globals: 0 */
import { Animation } from './animation';

let animationWorker = null;
let canvas, canvasCtx;

self.onmessage = function(e) {
  if (e.data.msg === 'init') {
    canvas = e.data.canvas;

    canvas.width = Math.round(e.data.sizes.width * e.data.dpr);
    canvas.height = Math.round(e.data.sizes.height * e.data.dpr);

    canvasCtx = canvas.getContext('2d');
    canvasCtx.scale(e.data.dpr, e.data.dpr);

    self.postMessage({
      masg: 'scale'
    })

    animationWorker = new Animation(canvasCtx, e.data.sizes);
    animationWorker.init();
    animationWorker.run();
  }

  return;
}