import Wave from './Wave'

// function points() {
//     const waves = {}
    
//     for (let i = 0; i < this.count; i++) {
//         let xMove = i * 0.1;
//         waves[i] = [];

//         for (let x = 0; x < 2185 / this.dpr; x++) {
//             waves[i].push(
//                 Math.sin(
//                     x * 0.004 + xMove
//                 ) 
//                 * this.amplitude 
//                 * (Math.sin(x / this.sizes.width * Math.PI * 2 - Math.PI * 0.5) + 1) * 0.5 
//                 + this.sizes.height / 2.6
//             )
//         } 
//     }

//     return waves;
// }

export default class Waves {
    constructor(canvas, options, sizes) {
        this.a = canvas;
        // this.frame = new Wave(canvas, options, sizes);
        // Object.definePropertiy(this.frame, 'points', {get: points});
    }
}