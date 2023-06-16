import * as THREE from "three";
import { A, D,  S, W } from "./KeyDisplay";
export const DIRECTIONS = [W, A, S, D];

export class CharacterControls {
    walkDirection = new THREE.Vector3();
    rotateAngle = new THREE.Vector3(0, 1, 0);
    rotateQuarternion = new THREE.Quaternion();
    cameraTarget = new THREE.Vector3();

    runVelocity = 5;
    walkVelocity = 2;

    constructor(model, orbitControl, camera) {
        this.model = model;
        this.orbitControl = orbitControl;
        this.camera = camera;
        this.updateCameraTarget(0, 0);
    }

    update(delta, keysPressed) {
        console.log("Delta:", delta);

        const directionPressed = DIRECTIONS.some((key) => keysPressed[key] == true);

        if (directionPressed) {
        // calculate towards camera direction
        var angleYCameraDirection = Math.atan2(
            this.camera.position.x - this.model.position.x,
            this.camera.position.z - this.model.position.z
        );
        // diagonal movement angle offset
        var directionOffset = this.directionOffset(keysPressed);

        // rotate model
        this.rotateQuarternion.setFromAxisAngle(
            this.rotateAngle,
            angleYCameraDirection + directionOffset
        );
        this.model.quaternion.rotateTowards(this.rotateQuarternion, 0.2);

        // calculate direction
        this.camera.getWorldDirection(this.walkDirection);
        this.walkDirection.y = 0;
        this.walkDirection.normalize();
        this.walkDirection.applyAxisAngle(this.rotateAngle, directionOffset);

        // run/walk velocity
        const velocity = this.walkVelocity;

        // move model & camera
        const moveX = this.walkDirection.x * velocity * delta;
        const moveZ = this.walkDirection.z * velocity * delta;
        this.model.position.x += moveX;
        this.model.position.z += moveZ;
        this.updateCameraTarget(moveX, moveZ);
        }
    }

    updateCameraTarget(moveX, moveZ) {
        console.log("Before:", this.camera.position, this.model.position);

        // move camera
        this.camera.position.x += moveX;
        this.camera.position.z += moveZ;
        console.log("After:", this.camera.position, this.model.position);

        // update camera target
        this.cameraTarget.x = this.model.position.x;
        this.cameraTarget.y = this.model.position.y + 1;
        this.cameraTarget.z = this.model.position.z;
        this.orbitControl.target = this.cameraTarget;
    }

    directionOffset(keysPressed) {
        var directionOffset = 0; // w

        if (keysPressed[W]) {
        if (keysPressed[A]) {
            directionOffset = Math.PI / 4; // w+a
        } else if (keysPressed[D]) {
            directionOffset = -Math.PI / 4; // w+d
        }
        } else if (keysPressed[S]) {
        if (keysPressed[A]) {
            directionOffset = Math.PI / 4 + Math.PI / 2; // s+a
        } else if (keysPressed[D]) {
            directionOffset = -Math.PI / 4 - Math.PI / 2; // s+d
        } else {
            directionOffset = Math.PI; // s
        }
        } else if (keysPressed[A]) {
        directionOffset = Math.PI / 2; // a
        } else if (keysPressed[D]) {
        directionOffset = -Math.PI / 2; // d
        }

        return directionOffset;
    }
}
export default CharacterControls