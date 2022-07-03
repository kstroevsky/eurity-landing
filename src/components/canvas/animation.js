import Wave from "./Wave";

export class Animation {
    constructor(context, sizes, dpr) {
        this.context = context;
        this.sizes = sizes;
        this.width = sizes.width;
        this.height = sizes.height;
        this.dpr = dpr;
        console.log(this.dpr)

        this.callback = (context) => {
            context.clearRect(0, 0, this.width, this.height);
      
            this.waves.forEach((wave) => {
              wave.draw(context);
            });
      
            // TODO: make relative
            const grd = context.createLinearGradient(500, 0, this.width, 0);
      
            grd.addColorStop(1, "white");
            grd.addColorStop(0.6, "white");
            grd.addColorStop(0.2, "rgba(255,255,255,0)");
            context.fillStyle = grd;
            
            context.fillRect(
              500,
              0,
              this.width + 400,
              this.height
            );
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
        // console.log()
        for (let i = 0; i < 25; i++) {
            const [start, stop] = this.gradients[0];

            this.waves.push(
                new Wave(this.context.canvas, {
                    start: start,
                    stop: stop,
                    lineWidth: 1,
                    xSpeed: 0.015,
                    amplitude: 0.32/this.dpr,
                    offset: i * 0.1
                }, this.sizes)
            );
        }

        console.log(this.waves[0])
    };

    clear() {this.waves = []}
}
