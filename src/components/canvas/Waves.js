export default class Waves {
    constructor(canvas, options, sizes) {
        this.canvas = canvas;
        this.options = options;
        this.sizes = sizes;
        this.count = this.options.count;
        this.xMove = this.options.offset;
        this.xSpeed = this.options.xSpeed;
        console.log(this.sizes.width - this.sizes.width * 0.05)
        this.resize()
    }

    // get points() {
    //     const points = []
    //     for (let i = 0; i < this.count; i++) {
    //         this.xMove += this.xSpeed;
    //         points.push([])

    //         for (let x = 0; x < this.sizes.width - this.sizes.width * 0.05; x++) {
    //             const scale = (Math.sin(x / this.sizes.width * Math.PI * 2 - Math.PI * 0.5) + 1) * 0.5;  
    //             const y = Math.sin(x * 0.004 + this.xMove) * this.amplitude * scale + this.sizes.height / 2.6;
    //         } 
    //     }

    //     return points;
    // }

    resize() {
        this.width = this.sizes.width;
        this.height = this.sizes.height * 0.8;
        this.amplitude = this.canvas.height * this.options.amplitude; 
    }

    draw(ctx) {
        this.xMove += this.xSpeed;
        ctx.beginPath();
        var grad = ctx.createLinearGradient(0, 0, this.sizes.width, 0);
        grad.addColorStop(0, this.options.start);
        grad.addColorStop(0.5, this.options.stop);
        grad.addColorStop(0.72, this.options.start);
        grad.addColorStop(1, this.options.start);
        ctx.strokeStyle = grad; 
        ctx.lineWidth = this.options.lineWidth;
        
        for (let x = 0; x < this.sizes.width - this.sizes.width * 0.05; x++) {
            const scale = (Math.sin(x / this.sizes.width * Math.PI * 2 - Math.PI * 0.5) + 1) * 0.5;  
            const y = Math.sin(x * 0.004 + this.xMove) * this.amplitude * scale + this.sizes.height / 2.6;
            ctx.lineTo(x, y);
        } 
        ctx.stroke();
    }

}
