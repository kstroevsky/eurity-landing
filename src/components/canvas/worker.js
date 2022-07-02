import insideWorker from "offscreen-canvas/inside-worker";
import Wave from "./Wave";

const worker = insideWorker((e) => {
  if (e.data.canvas) {
    const context = e.data.canvas.getContext("2d");

    const run = (callback) => {
      window.requestAnimationFrame(() => {
        run(callback);
      });

      callback(context);
    };

    const gradients = [
      ["white", "black"],
      ["white", "black"],
      ["white", "black"],
      ["white", "black"],
      ["white", "black"],
      ["white", "black"]
    ];

    let waves = [];

    const init = () => {
      waves = [];
      for (let i = 0; i < 25; i++) {
        const [start, stop] = gradients[
          Math.floor(Math.random() * gradients.length)
        ]; //解构赋值，数组的解构赋值
        waves.push(
          new Wave(e.data.canvas, {
            start: start,
            stop: stop,
            lineWidth: 1,
            xSpeed: 0.005,
            amplitude: 0.3,
            offset: i * 0.1
          })
        );
      }
    };

    init();

    run((context) => {
      context.clearRect(0, 0, e.data.canvas.width, e.data.canvas.height);

      waves.forEach((wave) => {
        wave.draw(context);
      });

      const grd = context.createLinearGradient(0, 0, 2000, 0);

      grd.addColorStop(1, "white");
      grd.addColorStop(0.6, "white");
      grd.addColorStop(0.4, "rgba(255,255,255,0)");
      context.fillStyle = grd;
      
      context.fillRect(
        e.data.canvas.width - 900,
        0,
        e.data.canvas.width - 800,
        e.data.canvas.height
      );

    });

  } else if (e.data.message === "run") {
    // Messages from main thread
  }
});

worker.onmessage = (event) => {
  const { drawingSurface: canvas, width, height, pixelRatio } = event.data;
}