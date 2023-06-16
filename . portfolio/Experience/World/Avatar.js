import * as THREE from 'three';
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
    mousePosition(){
        const mouse = new THREE.Vector2();
        window.addEventListener('mousemove',function(e) {
            mousePosition.x=(e.clientX/window.innerWidth)*2-1;
            mousePosition.y=-(e.clientY/window.innerHeight)*2+1;
        })
        const planeGeo = new THREE.PlaneGeometry(25,25);
        const planeMat = new THREE.MeshBasicMaterial({visible:false});
        const planeMesh = new THREE.Mesh(planeGeo,planeMat);
        planeMesh.rotation.x =-0.5 * -Math.PI/2;
        this.scene.add(planeMesh);
        planeMesh.name = 'plane';
        const raycaster = new THREE.Raycaster();
        window.addEventListener('click',function(){
            raycaster.setFromCamera(mousePosition,camera);
            const intersects = raycaster.intersectObjects(this.scene.children);
            for(let i=0; i<intersects.length;i++){
                if(intersects[i].object.name === 'plane'){
                    target.position.set(intersects[i].point.x,0,intersects[i].point.z)
                }
            }
            
        })
    }
    resize() {   
    }
    update() {
    }        
};
