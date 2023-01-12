import Car from "./cars";
import chassisImage from "../images/chassises/chassis.svg"

export class Chassis {
    constructor(id, durability, resource) {
        this.id = id;
        this.durability = durability;
        this.resource = resource;
        this.hue = getHue(id);
        this.image = chassisImage
    }
}

export const convertChassisToJsObject = (chassis) => {
    /*
       0 - модель
       1 - vin
       2 - id двигателя
       3 - id шасси
       4 - уровень
       5 - миляж
       6 - победы (на уровне)
       7 - поражения (на уровне)
   */
    chassis = chassis.toString().split(",")
    return new Chassis(chassis[0], chassis[1], chassis[2])
}

export const convertChassisesToJsObject = (chassisArray) => {
    let convertedArray = []
    chassisArray.forEach(chassis => convertedArray.push(convertChassisToJsObject(chassis)))
    return convertedArray;
}

const getHue = (id) => {
    return id % 360;
}