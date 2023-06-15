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
        this.moveSpeed = 0.1; // Adjust the movement speed as desired
        this.keyboard = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false };
        this.addKeyboardListeners();
                
    }
    setModel(){
        this.scene.add(this.actualAvatar);
        this.actualAvatar.scale.set(0.5,0.5,0.5);
        this.actualAvatar.position.set(0,0,0);
        
    }
    addKeyboardListeners() {
        document.addEventListener("keydown", this.onKeyDown.bind(this));
        document.addEventListener("keyup", this.onKeyUp.bind(this));
    }
    
    onKeyDown(event) {
        if (event.key in this.keyboard) {
            event.preventDefault();
            this.keyboard[event.key] = true;
        }
    }
    
    onKeyUp(event) {
        if (event.key in this.keyboard) {
            event.preventDefault();
            this.keyboard[event.key] = false;
        }
    }

    

    
    

    resize() {}

    update() {
        if (this.keyboard.ArrowUp) {
            this.actualAvatar.translateZ(-this.moveSpeed);
        }
        if (this.keyboard.ArrowDown) {
            this.actualAvatar.translateZ(this.moveSpeed);
        }
        if (this.keyboard.ArrowLeft) {
            this.actualAvatar.translateX(-this.moveSpeed);
        }
        if (this.keyboard.ArrowRight) {
            this.actualAvatar.translateX(this.moveSpeed);
        }
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );

        this.actualAvatar.rotation.y = this.lerp.current;

        this.mixer.update(this.time.delta * 0.0009);
    }
}