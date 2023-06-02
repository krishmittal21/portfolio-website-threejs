import Experience from "../Experience";
import * as THREE from 'three';
import Tree from "./Tree.js";
export default class World{
    constructor(){
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene=this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera=this.experience.camera;
        this.tree= new Tree();
    }
    setRenderer(){
        
    }
    resize(){
        
    }
    update(){
        
    }
        
}