import {faker} from "@faker-js/faker";
import {ethers} from 'ethers'

function importAll(r) {
    return r.keys().map(r);
}

const images = importAll(require.context('../images/cars', false, /\.(png|jpe?g|svg)$/));
const useLogging = false;

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

    constructor(model, vin, engineId, chassisId, level, mileage, winsCount, lossCount, id) {
        this.model = getDummyName(model);
        this.vin = vin;
        this.engineId = engineId
        this.chassisId = chassisId
        this.level = level
        this.mileage = mileage
        this.winsCount = winsCount
        this.lossCount = lossCount
        this.id = id;
        this.image = getCarImage(vin)
        this.hue = getHue(vin)
    }

}

export const convertCarToJsObject = async (car) => {
    /*
       0 - модель
       1 - vin
       2 - id двигателя
       3 - id шасси
       4 - уровень
       5 - миляж
       6 - победы (на уровне)
       7 - поражения (на уровне)
       8 - id машины
   */
    car = car.toString().split(",")
    useLogging && console.log("Given car:", car.toString())
    const carObject = new Car(car[0], car[1], car[2], car[3], car[4], car[5], car[6], car[7], car[8])
    useLogging && console.log("Car object:", carObject)
    return carObject
}

export const convertCarsToJsObject = async (carsArray) => {
    // console.log(carsArray)
    let convertedArray = []
    for (const car of carsArray) {
        let convertedCar = await convertCarToJsObject(car)
        convertedArray.push(convertedCar)
    }
    useLogging && console.log("Converted array:", convertedArray)
    return convertedArray;
}




export const getDummyCars = (length) => {

        let dummyCars = []
        for (let i = 0; i < length; i++) {
            dummyCars.push(new Car(
                    getDummyName(faker.vehicle.vehicle()), //название
                `${getRandomInt(100000000, 999999999)}`, //vin
                getRandomInt(100000000, 999999999), //id двигателя
                getRandomInt(100000000, 999999999), //id шасси
                getRandomInt(1, 100), //уровень
                getRandomInt(0, 9999999), //пробег
                getRandomInt(0, 90), //количество побед
                getRandomInt(0, 90),
                    i),//количество поражений
                //id
            )
        }
        return dummyCars
}


function camelCase(string) {
    let camelCased = []
    string = string;
    let stringArray = string.toLowerCase().split(" ");
    stringArray.forEach(word => {
        camelCased.push(capitalizeFirstLetter(word))
    })
    return camelCased.join(" ")
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getDummyName(name) {
    return camelCase(name.toLowerCase().split("").reverse().join(""))
}

export const addZerosToId = (id, targetLength) => {
    if (!id) {
        return null;
    }
    if (id.length < targetLength) {
        let resId = "";
        for (let i=0; i<targetLength - id.length; i++) {
            resId += '0'
        }
        return resId + id;
    }
}

export const getLevelUpCost = (currentLevel) => {
    return (parseInt(currentLevel)/10 + 1) * 0.001
}

export const getUniqueCarImage = (car) => {
    return <img
        style={{
            filter: `hue-rotate(${getHue(car.vin)}deg)`
        }}
        src={getCarImage(car.vin)}
        alt=""/>
}

export const getCarsOnLevel = (cars, minLevel) => {
    let newCars = []
    cars.forEach(car => {
        if (car.level >= minLevel) newCars.push(car)
    })
    return newCars
}
