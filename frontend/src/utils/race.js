export const getCarPosition = (roadIndex, screenRatio) => {
    return {x: randInt(0, 100), y: randInt(0, 100)}
}


const randInt = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min)
}
