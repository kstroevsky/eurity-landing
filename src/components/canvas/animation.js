import {default as Wave} from "./Waves";

export class AnimationWaves {
    constructor(context, sizes, dpr) {
        this.context = context;
        this.sizes = sizes;
        this.width = sizes.width;
        this.height = sizes.height;
        this.dpr = dpr;

        this.callback = (context) => {
            context.fillStyle = 'white';
            context.fillRect(0, 0, this.width, this.height);
      
            this.waves.forEach((wave) => {
              wave.draw(context);
            });
        }

        this.gradients = [
            ["white", "gray"],
        ];
        
        this.waves = [];

        this.boundAnimate = this.run.bind(this);
    }

    run() {
        requestAnimationFrame(this.boundAnimate);
        this.callback(this.context);
    };
  
    init() {
        for (let i = 0; i < 25; i++) {
            const [start, stop] = this.gradients[0];

            this.waves.push(
                new Wave(this.context.canvas, {
                    start: start,
                    stop: stop,
                    lineWidth: 1,
                    xSpeed: 0.011,
                    amplitude: 0.32/this.dpr,
                    offset: i * 0.1
                }, this.sizes)
            );
        }

        console.log(this.waves[0])
    };

    clear() {this.waves = []}
}
