import Experience from "../Experience";
import * as THREE from 'three';
import Avatar from "./Avatar.js";
export default class World{
    constructor(){
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene=this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera=this.experience.camera;
        this.resources=this.experience.resources;
        this.resources.on('ready',()=>{
            this.avatar = new Avatar();
            console.log("avatar");
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