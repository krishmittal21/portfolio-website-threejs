import {EventEmitter} from "events"
import Experience from "../Experience.js"
import * as THREE from "three"
export default class Resources extends EventEmitter{
    constructor(assests){
        super();
        this.experience = new Experience()
        this.renderer= this.experience.renderer
        this.assests = assests;
        console.log(this.assests)
    }
}