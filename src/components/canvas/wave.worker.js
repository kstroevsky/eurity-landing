/* eslint no-restricted-globals: 0 */
import { Animation } from './animation';

let animationWorker = null;
let canvas, canvasCtx;

self.onmessage = function(e) {
  if (e.data.msg === 'init') {
    canvas = e.data.canvas;
    canvasCtx = canvas.getContext('2d');
    animationWorker = new Animation(canvasCtx);
    animationWorker.run();
  }

  return;
}