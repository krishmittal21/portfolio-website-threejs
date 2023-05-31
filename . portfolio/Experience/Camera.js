import Experience from "./Experience";
export default class Camera{
    constructor(){
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene=this.experience.scene;
        this.canvas = this.experience.canvas;
        this.createPerspectiveCamera();
        this.createOrthographicCamera();
    }
    createPerspectiveCamera(){
        this.perspectiveCamera = new THREE.PerspectiveCamera(75,this.sizes.width/this.sizes.height,0.1,100);
        this.perspectiveCamera.position.z = 3;
        this.scene.add(this.perspectiveCamera);
    }
}