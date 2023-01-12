import factoryImage from "../images/factories/factory.svg"

export default class Factory {

    constructor(id, capacity, productionPerHour, currentFullness) {
        this.id = id
        this.capacity = capacity
        this.productionPerHour = productionPerHour
        this.currentFullness = currentFullness
        this.hue = getHue(id)
        this.image = factoryImage
    }

}


export const convertFactoryToJsObject = (factory) => {
    factory = factory.toString().split(",")
    return new Factory(factory[0], factory[1], factory[2], factory[3])
}


export const getDummyFactory = () => {
    let capacity = getRandomInt(60, 200)
    return new Factory(
        getRandomInt(0, 360),
        capacity,
        getRandomInt(5,10),
        getRandomInt(0, capacity)
        )
}

const getHue = (id) => {
    return id % 360;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

export const getBarWidth = (factory) => {
    return (factory.currentFullness / factory.capacity) * 100
}

export const getHours = (factory) => {
    return (factory.capacity - factory.currentFullness) / factory.productionPerHour;
}

export const getTime = (factory) => {
    return `${parseInt(getHours(factory)/60)} ч ${getHours(factory) * 60} мин`
}
