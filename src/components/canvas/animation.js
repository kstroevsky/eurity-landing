import Wave from "./Wave";

class AnimationWaves {
    constructor(context, sizes, dpr) {
        this.context = context;
        this.sizes = sizes;
        this.width = sizes.width;
        this.height = sizes.height;
        this.dpr = dpr;

        this.callback = (context) => {
            context.fillStyle = 'white';
            context.fillRect(0, 0, this.width, this.height);
      
            this.waves.draw(context);
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
        this.waves = new Wave(this.context.canvas, {
            start: this.gradients[0][0],
            stop: this.gradients[0][1],
            lineWidth: 1,
            xSpeed: 0.007,
            amplitude: 0.26/this.dpr,
            dpr: this.dpr,
            count: 25,
        }, this.sizes);
    };

    clear() {this.waves = []}
}

export default AnimationWaves;