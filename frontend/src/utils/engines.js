export default class Engine {
    constructor(id, horsePowers, consumption) {
        this.id = id;
        this.horsePowers = horsePowers;
        this.consumption = consumption;
        this.hue = getHue(id)
    }
}

export const convertEngineToJsObject = (engine) => {
    /*
       0 - id
       1 - horsePowers
       2 - consumption
   */
    return new Engine(engine[0], engine[1], engine[2])
}

export const convertEnginesToJsObject = (enginesArray) => {
    let convertedArray = []
    enginesArray.forEach(car => convertedArray.push(convertEngineToJsObject(car)))
    return convertedArray;
}