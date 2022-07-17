/* eslint no-restricted-globals: 0 */
import AnimationWaves from './animation';

let animationWorker = null;
let canvas, canvasCtx;

self.onmessage = function(e) {
  if (e.data.msg === 'init') {
    canvas = e.data.canvas;

    canvas.width = Math.round(e.data.sizes.width * e.data.dpr);
    canvas.height = Math.round(e.data.sizes.height * e.data.dpr);

    canvasCtx = canvas.getContext('2d', { alpha: false });
    canvasCtx.scale(e.data.dpr, e.data.dpr);

    animationWorker = new AnimationWaves(canvasCtx, e.data.sizes, e.data.dpr);
    animationWorker.init();
    animationWorker.run();
  }

  return;
}