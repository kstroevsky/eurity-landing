import Wave from "./Wave";

export class Animation {
    constructor(context) {
        this.context = context;
        this.width = context.canvas.width;
        this.height = context.canvas.height;

        this.callback = (context) => {
            context.clearRect(0, 0, this.width, this.height);
      
            this.waves.forEach((wave) => {
              wave.draw(context);
            });
      
            const grd = context.createLinearGradient(0, 0, 2000, 0);
      
            grd.addColorStop(1, "white");
            grd.addColorStop(0.6, "white");
            grd.addColorStop(0.4, "rgba(255,255,255,0)");
            context.fillStyle = grd;
            
            context.fillRect(
              this.width,
              0,
              this.width - 800,
              this.height
            );
        }

        this.gradients = [
            ["white", "black"],
            ["white", "black"],
            ["white", "black"],
            ["white", "black"],
            ["white", "black"],
            ["white", "black"]
        ];
        
        this.waves = [];

        this.init()

        this.boundAnimate = this.run.bind(this);
    }

    run() {
        requestAnimationFrame(this.boundAnimate);
        this.callback(this.context);
    };
  
    init() {
        this.waves = [];
        for (let i = 0; i < 25; i++) {
            const [start, stop] = this.gradients[
                Math.floor(Math.random() * this.gradients.length)
            ];

            this.waves.push(
                new Wave(this.context.canvas, {
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
}
