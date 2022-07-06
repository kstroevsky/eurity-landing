export default class Wave {
    constructor(canvas, options, sizes) {
        this.canvas = canvas;
        this.options = options;
        this.sizes = sizes;
        this.count = this.options.count;
        this.xMove = Array.of(...new Array(this.count)).map((_, i) => 0.1*i)
        this.xSpeed = this.options.xSpeed;
        this.dpr = this.options.dpr;
        this.resize()
    }

    resize() {
        this.width = this.sizes.width;
        this.height = this.sizes.height * 0.8;
        this.amplitude = this.canvas.height * this.options.amplitude; 
    }

    draw(ctx) {
        this.xMove = this.xMove.map(waveMove => waveMove + this.xSpeed)
        ctx.beginPath();
        var grad = ctx.createLinearGradient(0, 0, this.sizes.width, 0);
        grad.addColorStop(0, this.options.start);
        grad.addColorStop(0.5, this.options.stop);
        grad.addColorStop(0.72, this.options.start);
        grad.addColorStop(1, this.options.start);
        ctx.strokeStyle = grad; 
        ctx.lineWidth = this.options.lineWidth;

        for (let i = 0; i < this.count; i++) {
            ctx.moveTo(1, 1);
            for (let x = 0; x < 2185/this.dpr; x++) {
                const scale = (Math.sin(x / this.sizes.width * Math.PI * 2 - Math.PI * 0.5) + 1) * 0.5;  
                const y = Math.sin(x * 0.004 + this.xMove[i]) * this.amplitude * scale + this.sizes.height / 2.6;
                
                ctx.lineTo(x, y);
            }
        }

        ctx.stroke();
    }

}
