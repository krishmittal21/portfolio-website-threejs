import Experience from "./Experience";
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
export default class Camera{
        constructor(){
            this.experience = new Experience();
            this.sizes = this.experience.sizes;
            this.scene=this.experience.scene;
            this.canvas = this.experience.canvas;
            this.createPerspectiveCamera();
            this.createOrthographicCamera();
            this.setOrbitControls();
    }
    createPerspectiveCamera(){
        this.perspectiveCamera = new THREE.PerspectiveCamera(35,this.sizes.aspect,0.1,1000);
        this.scene.add(this.perspectiveCamera);
        this.perspectiveCamera.position.x = 29;
        this.perspectiveCamera.position.y = 14;
        this.perspectiveCamera.position.z = 12;
    };
    createOrthographicCamera(){
        this.orthographicCamera = new THREE.OrthographicCamera(this.frustumSize*-this.sizes.aspect/ 2,this.frustumSize*this.sizes.aspect/2,this.sizes.frustum/2,this.sizes.frustum/ -2,-50,100);
        this.scene.add(this.orthographicCamera);
        
        
    };
    setOrbitControls() {
        this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);
        this.controls.enableDamping = true;
        this.controls.enableZoom = false;
    }

    resize(){
        {/* updating perspective camera on resize*/ }
        this.perspectiveCamera.aspect = this.sizes.aspect;
        this.perspectiveCamera.updateProjectionMatrix();

        this.orthographicCamera.left =(-this.sizes.aspect * this.sizes.frustrum) / 2;
        this.orthographicCamera.right =(this.sizes.aspect * this.sizes.frustrum) / 2;
        this.orthographicCamera.top = this.sizes.frustrum / 2;
        this.orthographicCamera.bottom = -this.sizes.frustrum / 2;
        this.orthographicCamera.updateProjectionMatrix();
    }
    update(){

    }
        
}