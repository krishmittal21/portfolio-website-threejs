export default class Sizes{
    constructor(){
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.aspectRatio = this.width / this.height
        this.resize()
        window.addEventListener('resize', this.resize.bind(this))           
    }
}