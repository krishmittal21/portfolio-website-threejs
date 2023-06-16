import * as THREE from "three"
import { A, D, DIRECTIONS, S, W } from "./KeyDisplay.js"

export class CharacterControls {
    walkDirection = new THREE.Vector3()
    rotateAngle = new THREE.Vector3(0, 1, 0)
    rotateQuarternion = new THREE.Quaternion()
    cameraTarget = new THREE.Vector3()
    runVelocity = 5
    walkVelocity = 2
    constructor(
        model,
        orbitControl,
        camera,
    ) {
        this.model = model
        this.orbitControl = orbitControl
        this.camera = camera
        this.updateCameraTarget(0, 0)
    }

    

    update(delta, keysPressed) {
        const directionPressed = DIRECTIONS.some(key => keysPressed[key] == true)

        if (directionPressed) {
            const directionOffset = this.directionOffset(keysPressed);
            this.rotateQuaternion.setFromAxisAngle(
                this.rotateAngle,
                directionOffset
            );
            this.model.quaternion.copy(this.rotateQuaternion);
            const velocity = this.walkVelocity;
            const moveX = this.walkDirection.x * velocity * delta;
            const moveZ = this.walkDirection.z * velocity * delta;
            this.model.position.x += moveX;
            this.model.position.z += moveZ;
            this.updateCameraTarget(moveX, moveZ);
        }
        }
        updateCameraTarget(moveX, moveZ) {
            this.camera.position.x += moveX;
            this.camera.position.z += moveZ;
        
            this.cameraTarget.copy(this.model.position);
            this.orbitControl.target.copy(this.cameraTarget);
        }
        directionOffset(keysPressed) {
            let directionOffset = 0;
        
            if (keysPressed[W]) {
                if (keysPressed[A]) {
                directionOffset = Math.PI / 4;
                } else if (keysPressed[D]) {
                directionOffset = -Math.PI / 4;
                }
            } else if (keysPressed[S]) {
                if (keysPressed[A]) {
                directionOffset = Math.PI / 4 + Math.PI / 2;
                } else if (keysPressed[D]) {
                directionOffset = -Math.PI / 4 - Math.PI / 2;
                } else {
                directionOffset = Math.PI;
                }
            } else if (keysPressed[A]) {
                directionOffset = Math.PI / 2;
            } else if (keysPressed[D]) {
                directionOffset = -Math.PI / 2;
            }
        
            return directionOffset;
        }
    }