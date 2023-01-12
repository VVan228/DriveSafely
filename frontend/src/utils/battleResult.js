export default class BattleResult {
    constructor(playerAddress, isCorrect, time, carId) {
        this.playerAddress = playerAddress
        this.isCorrect = isCorrect
        this.time = time
        this.carId = carId
    }
}

export const convertToObj = (battleResult) => {
    battleResult = battleResult.toString().split(",")
    return new BattleResult(battleResult[0], battleResult[1], battleResult[2], battleResult[3])
}