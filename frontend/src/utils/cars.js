function importAll(r) {
    return r.keys().map(r);
}

const images = importAll(require.context('../images/cars', false, /\.(png|jpe?g|svg)$/));

const getCarImage = (vin) => {
    let sum = vin.toString().split('').reduce(function(a, b) {
        return +a + +b;
    })
    return images[sum % 8]
}

const getHue = (vin) => {
    return vin % 360;
}

export default class Car {

    constructor(model, vin, engineId, chassisId, level, mileage, winsCount, lossCount) {
        this.model = model;
        this.vin = vin;
        this.engineId = engineId;
        this.chassisId = chassisId;
        this.level = level;
        this.mileage = mileage;
        this.winsCount = winsCount;
        this.lossCount = lossCount;
        this.image = getCarImage(vin)
        this.hue = getHue(vin)
    }

}

export const convertCarToJsObject = (car) => {
    /*
       0 - модель у
       1 - vin
       2 - id двигателя
       3 - id шасси
       4 - уровень у
       5 - миляж y
       6 - победы (на уровне)
       7 - поражения (на уровне)
   */
    return new Car(car[0], car[1], car[2], car[3], car[4], car[5], car[6], car[7])
}

export const convertCarsToJsObject = (carsArray) => {
    let convertedArray = []
    carsArray.forEach(car => convertedArray.push(convertCarToJsObject(car)))
    return convertedArray;
}
