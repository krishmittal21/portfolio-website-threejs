import * as THREE from "three";
import Experience from "../Experience.js";

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
        
    }
    setModel(){
        this.scene.add(this.actualAvatar);
        this.actualAvatar.scale.set(10,10,10);
        this.actualAvatar.position.set(0,-9,0);
        
    }
    createClickablePoints() {
        const points = [
            { position: new THREE.Vector3(10, 10,2), text: "Text for point 1" },
            { position: new THREE.Vector3(0, 0, 2), text: "Text for point 2" },
            { position: new THREE.Vector3(-5, 2, 2), text: "Text for point 3" },
            { position: new THREE.Vector3(5, 2, 3), text: "Text for point 4" },
            { position: new THREE.Vector3(-5, -2, -3), text: "Text for point 5" },
            { position: new THREE.Vector3(-2, -8, 2), text: "Text for point 6" },
            { position: new THREE.Vector3(2, -8, 2), text: "Text for point 7" },
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
                // Rotate and zoom to the clicked point
                // Apply animation and display the associated text
                console.log(clickablePoint.text);
            }
            }
        }

    

    
    

    resize() {}

    update() {
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );

        this.actualRoom.rotation.y = this.lerp.current;

        this.mixer.update(this.time.delta * 0.0009);
    }
}