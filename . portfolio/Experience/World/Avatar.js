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
        this.actualAvatar.scale.set(0.5,0.5,0.5);
        this.actualAvatar.position.set(0,0,0);
    }
    resize() {   
    }
    update() {
    }        
};
