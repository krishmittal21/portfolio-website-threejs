import * as THREE from "three";
import Experience from "../Experience.js";

export default class walle {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.walle = this.resources.items.walle;
        this.actualwalle = this.walle.scene;
        
        this.setModel();
        
    }
    setModel(){
        this.scene.add(this.actualwalle);
        this.actualwalle.scale.set(5,5,5);
        this.actualwalle.position.set(0,-8,0);
        this.actualwalle.rotation.y = Math.PI/2;
    }

    

    
    

    resize() {}

    update() {
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );

        this.actualRoom.rotation.y = this.lerp.current;

        this.mixer.update(this.time.delta * 0.0009);
    }
}