export default class Wave {
    constructor(canvas, options) {
        this.canvas = canvas;
        this.options = options;
        this.xMove = this.options.offset;
        this.xSpeed = this.options.xSpeed;
        this.resize()
    }

    resize() {
        this.width = this.canvas.width;
        this.height = this.canvas.height*0.8;
        this.amplitude = this.canvas.height * this.options.amplitude; // 振幅
    }

    draw(ctx) {
        this.xMove += this.xSpeed;
        ctx.beginPath();
        ctx.moveTo(0,this.canvas.height*0.5);
        var grad = ctx.createLinearGradient(0,0,this.canvas.width,0);
        grad.addColorStop(0,this.options.start);
        grad.addColorStop(1,this.options.stop);
        ctx.strokeStyle = grad; 
        ctx.lineWidth = this.options.lineWidth;
        for (let x = 0; x < this.canvas.width-this.canvas.width*0.25; x++) {  // 横坐标变化的快，但是横坐标对应的sin值变小
            const scale = (Math.sin(x / this.canvas.width * Math.PI * 2 - Math.PI * 0.5) + 1) * 0.5;  //改变波峰的范围, 振幅的改变频率是0-1-0
            const y = Math.sin(x * 0.004 + this.xMove)*this.amplitude*scale + this.canvas.height / 2;   // +this.xMove是平移每个完整宽度的波，形成动画
            ctx.lineTo(x, y);
        } 
        ctx.stroke();
        ctx.closePath();
    }
}
