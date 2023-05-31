import Experience from "./Experience";
import * as THREE from 'three';
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
        this.perspectiveCamera = new THREE.PerspectiveCamera(35,this.sizes.aspect,0.1,1000);
        this.scene.add(this.perspectiveCamera);
    };
    createOrthographicCamera(){
        this.frustumSize = 5;
        this.orthographicCamera = new THREE.OrthographicCamera(this.frustumSize*-this.sizes.aspect/ 2,this.frustumSize*this.sizes.aspect/2,this.sizes.frustum/2,this.sizes.frustum/ -2,-100,100);
        this.scene.add(this.orthographicCamera);
    }
    resize(){
        {/* updating perspective camera on resize*/ }
        this.perspectiveCamera.aspect = this.sizes.aspect;
        this.perspectiveCamera.updateProjectionMatrix();

        this.orthographicCamera.left = -this.frustumSize*this.sizes.aspect/2;
        this.orthographicCamera.right = this.frustumSize*this.sizes.aspect/2;
        this.orthographicCamera.top = this.frustumSize/2;
        this.orthographicCamera.bottom = -this.frustumSize/2;
    }
    update(){

    }
        
}