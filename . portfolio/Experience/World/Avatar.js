import * as THREE from "three";
import Experience from "../Experience.js";
import { GSAP } from "gsap";
export default class Avatar {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.avatar = this.resources.items.avatar;
        this.actualAvatar = this.avatar.scene;
        this.clickablePoints = [];
        this.setModel();
        this.createClickablePoints();
        this.scene.addEventListener("click", this.onClick.bind(this));
        this.targetPoint = null;
        this.camera=this.experience.camera;
        this.lerp = {  
            current: 0,
            target: 0,
            ease: 0.1,
        };
        this.mixer = new THREE.AnimationMixer(this.actualAvatar);
        
    }
    setModel(){
        this.scene.add(this.actualAvatar);
        this.actualAvatar.scale.set(10,10,10);
        this.actualAvatar.position.set(0,-9,0);
        
    }
    createClickablePoints() {
        const points = [
            { position: new THREE.Vector3(0, 8.5,1.5), text: "1" },
            { position: new THREE.Vector3(0, 2, 1.5), text: "2" },
            { position: new THREE.Vector3(-4.7, 1, 1.5), text: "3" },
            { position: new THREE.Vector3(4.7, 1, 1.5), text: "4" },
            { position: new THREE.Vector3(0, 2, -1.5), text: "5" },
            { position: new THREE.Vector3(1.5, -8.5, 2.5), text: "6" },
            { position: new THREE.Vector3(-1.5, -8.5, 2.5), text: "7" },
        ];
    
        const holeRadius = 0.2;
        const holeDepth = 0.01;
        const holeColor = 0xffffff;
    
        const holeGeometry = new THREE.CylinderGeometry(
            holeRadius,
            holeRadius,
            holeDepth,
            32
        );
        const holeMaterial = new THREE.MeshBasicMaterial({ color: holeColor });
    
        points.forEach((point) => {
            const holeMesh = new THREE.Mesh(holeGeometry, holeMaterial);
            holeMesh.position.copy(point.position);
            holeMesh.rotation.x = -Math.PI / 2;
            this.scene.add(holeMesh);
        
            holeMesh.userData = { text: point.text };
        
            holeMesh.addEventListener("mouseenter", () => {
            this.experience.canvas.style.cursor = "pointer";
            });
    
            holeMesh.addEventListener("mouseleave", () => {
            this.experience.canvas.style.cursor = "auto";
            });
            this.clickablePoints.push(holeMesh);
        });
        }
        
        onClick(event) {
            // Get the clicked object
            const clickedObject = event.intersections[0].object;
        
            if (clickedObject.type === "Mesh") {
            // Check if the clicked object is one of the clickable points
            const clickablePoint = this.clickablePoints.find(
                (point) => point.position.equals(clickedObject.position)
            );
        
            if (clickablePoint) {
                this.targetPoint = clickablePoint;
            }
            }
        }
        onSeparateButtonPress() {
            if (this.targetPoint) {
                // Rotate and zoom to the clicked point
                const targetPosition = this.targetPoint.position.clone();
                const targetDistance = 15;
                // Animate the camera position and look at the clicked point
                GSAP.to(this.camera.position, {
                    x: targetPosition.x,
                    y: targetPosition.y,
                    z: targetPosition.z + targetDistance,
                    duration: 1,
                    ease: "power2.out",
                });
                this.camera.lookAt(targetPosition);
            }
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