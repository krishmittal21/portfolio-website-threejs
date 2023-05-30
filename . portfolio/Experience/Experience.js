import * as THREE from 'three';
import Sizes from './Utils/Sizes';
import Camera from './Camera';
export default class Experience{
    static instance 
    constructor(canvas){
        if(Experience.instance){
            return Experience.instance
        }
        Experience.instance = this
        this.canvas = canvas
        this.scene = new THREE.Scene()
        this.Sizes = new Sizes()
        this.Camera = new Camera()
        console.log(this.experience,this.sizes,this.camera,this.canvas);
animate();
    }
}