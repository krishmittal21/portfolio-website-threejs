import Experience from "../Experience";
import * as THREE from 'three';
export default class Avatar{
    constructor(){
        this.experience = new Experience();
        this.scene=this.experience.scene;
        this.resources=this.experience.resources;
        this.avatar=this.resources.items.avatar;
        this.actualAvatar = this.avatar.scene;
        this.setModel();
        
    }
    setModel(){
        this.scene.add(this.actualAvatar);
    }
    setRenderer(){
        
    }
    resize(){
        
    }
    update(){
        
    }
        
}