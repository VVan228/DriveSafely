import Car from "./cars";

export class Chassis {
    constructor(id, durability, resource) {
        this.id = id;
        this.durability = durability;
        this.resource = resource;
        this.hue = getHue(id);
    }
}

export const convertChassisToJsObject = (car) => {
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
    return new Car(car[0], car[1], car[2], car[3], car[4], car[5], car[6], car[7])
}

export const convertChassisesToJsObject = (chassisArray) => {
    let convertedArray = []
    chassisArray.forEach(chassis => convertedArray.push(convertChassisToJsObject(chassis)))
    return convertedArray;
}