import Experience from "../Experience.js";
import KeyDisplay from "../Utils/KeyDisplay.js";
export default class Avatar {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.avatar = this.resources.items.avatar;
        this.actualAvatar = this.avatar.scene;
        this.setModel();
        this.addKeyboardListener();
                
    }
    setModel(){
        this.scene.add(this.actualAvatar);
        this.actualAvatar.scale.set(0.5,0.5,0.5);
        this.actualAvatar.position.set(0,0,0);
        
    }
    addKeyboardListener(){
        const keysPressed = {};
        const keyDisplayQueue= new KeyDisplay();
        document.addEventListener('keydown', (event) => {
            keyDisplayQueue.down(event.key)
            (keysPressed )[event.key.toLowerCase()] = true;
        },false);
        document.addEventListener('keyup', (event) => {
            keyDisplayQueue.up(event.key)
            (keysPressed )[event.key.toLowerCase()] = false;
        },false);
    }
    resize() {}

    update() {
    }
}