import Experience from "../Experience.js";
import KeyDisplay from "../Utils/KeyDisplay.js";
import {CharacterControls, DIRECTIONS} from "../Utils/characterControls.js";
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
        this.addCharacterControls();
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
            keysPressed[event.key.toLowerCase()] = true;
        },false);
        document.addEventListener('keyup', (event) => {
            keyDisplayQueue.up(event.key)
            keysPressed[event.key.toLowerCase()] = false;
        },false);
        this.keysPressed = keysPressed;
    }
    addCharacterControls(){
        const controls = new CharacterControls(this.actualAvatar,this.experience.camera.controls,this.experience.camera.perspectiveCamera);
        this.time.on("tick", () => {
            controls.update(this.time.delta,keyPressed);
    });
    }
    resize() {
        
    }

    update() {
    }
}