import Experience from "../Experience.js";

export default class Avatar {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.avatar = this.resources.items.avatar;
        this.actualAvatar = this.avatar.scene;
        this.setModel();
                
    }
    setModel(){
        this.scene.add(this.actualAvatar);
        this.actualAvatar.scale.set(10,10,10);
        this.actualAvatar.position.set(0,-9,0);
        
    }
    

    

    
    

    resize() {}

    update() {
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );

        this.actualAvatar.rotation.y = this.lerp.current;

        this.mixer.update(this.time.delta * 0.0009);
    }
}