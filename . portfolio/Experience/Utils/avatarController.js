import * as THREE from 'three';

export default class AvatarController {
    constructor(avatar) {
        this.avatar = avatar;
        this._Init();
    }

    _Init() {
        this._decceleration = new THREE.Vector3(-0.0005, -0.0001, -5.0);
        this._acceleration = new THREE.Vector3(1, 0.25, 50.0);
        this._velocity = new THREE.Vector3(0, 0, 0);
        this._position = new THREE.Vector3();

        document.addEventListener('keydown', (e) => {
        this._OnKeyDown(e);
        }, false);

        document.addEventListener('keyup', (e) => {
        this._OnKeyUp(e);
        }, false);
    }

    _OnKeyDown(event) {
        switch (event.keyCode) {
        case 87: // w
            // Move forward
            this._velocity.z = -1;
            break;
        case 65: // a
            // Move left
            this._velocity.x = -1;
            break;
        case 83: // s
            // Move backward
            this._velocity.z = 1;
            break;
        case 68: // d
            // Move right
            this._velocity.x = 1;
            break;
        }
    }

    _OnKeyUp(event) {
        switch (event.keyCode) {
        case 87: // w
        case 83: // s
            // Stop moving in the z-axis
            this._velocity.z = 0;
            break;
        case 65: // a
        case 68: // d
            // Stop moving in the x-axis
            this._velocity.x = 0;
            break;
        }
    }

    update() {
        const deltaTime = this.avatar.time.deltaTime;

        // Update position based on velocity
        this._position.copy(this.avatar.actualAvatar.position);
        this._velocity.multiplyScalar(deltaTime);
        this._position.add(this._velocity);

        // Limit the maximum movement speed
        const maxSpeed = 10;
        if (this._velocity.length() > maxSpeed) {
        this._velocity.normalize().multiplyScalar(maxSpeed);
        }

        // Apply deceleration
        const deceleration = this._decceleration.clone().multiplyScalar(deltaTime);
        this._velocity.addScaledVector(this._velocity, deceleration);

        // Apply position changes to the actual avatar
        this.avatar.actualAvatar.position.copy(this._position);
    }
}
