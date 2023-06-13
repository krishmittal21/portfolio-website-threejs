import Experience from "../Experience";
import * as THREE from 'three';
import Avatar from "./Avatar.js";
import Environment from "./Environment.js";
export default class World{
    constructor(){
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene=this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera=this.experience.camera;
        this.resources=this.experience.resources;
        this.resources.on('ready',()=>{
            this.Environment = new Environment();
            this.avatar = new Avatar();
        });
        this.avatar= new Avatar();
    }
    setRenderer(){
        
    }
    resize(){
        
    }
    update(){
        
    }
        
}