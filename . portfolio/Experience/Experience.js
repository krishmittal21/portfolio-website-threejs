import * as THREE from 'three';
import Sizes from './Utils/Sizes';
import Camera from './Camera';
import Renderer from './Renderer';
import Time from './Utils/Time';
export default class Experience{
    static instance 
    constructor(canvas){
        if(Experience.instance){
            return Experience.instance
        }
        Experience.instance = this
        this.canvas = canvas
        this.scene = new THREE.Scene()
        this.time = new Time()
        this.Sizes = new Sizes()
        this.Camera = new Camera()
        this.Renderer = new Renderer()
animate();
    }
}