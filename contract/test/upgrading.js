const TokenOwnership = artifacts.require("TokenOwnership");

const counts = 5;
const counts2 = 20;
const capacityCoef = 0.00001 * 10 ^ 18;

contract('Upgrading', (accounts) => {

    it('balance is changed when changing capacity', async () => {
        const instance = await TokenOwnership.deployed();
        // get list accounts
        let aces = await web3.eth.getAccounts();
        await instance.createFuelStation({ from: aces[1] });

        sum = await instance.getCapacityUpgradeCost(0, counts);

        oldBalance = await web3.eth.getBalance(aces[0])
        await instance.upgradeCapacity(0, counts, { from: aces[1], value: sum.toString() });
        newBalance = await web3.eth.getBalance(aces[0])
        console.log(oldBalance + " " + newBalance)
        assert.equal(parseInt(newBalance) - parseInt(oldBalance), parseInt(sum));
    });

    it('Capacity is changed', async () => {
        const instance = await TokenOwnership.deployed();
        let aces = await web3.eth.getAccounts();

        sum = await instance.getCapacityUpgradeCost(0, counts);
        station = await instance.getFuelStationByOwner(aces[1]);
        const oldCapacity = station.capacity;
        await instance.upgradeCapacity(0, counts, { from: aces[1], value: sum.toString() });
        station = await instance.getFuelStationByOwner(aces[1]);
        assert.equal(station.capacity, parseInt(oldCapacity) + parseInt(counts));
    });
    
    it('balance is changed when changing production per hour', async () => {
        const instance = await TokenOwnership.deployed();
        let aces = await web3.eth.getAccounts()

        sum = await instance.getProductionPerHourUpgradeCost(0, counts);

        oldBalance = await web3.eth.getBalance(aces[0])
        await instance.upgradeProductionPerHour(0, counts, { from: aces[1], value: sum.toString() });
        newBalance = await web3.eth.getBalance(aces[0])
        assert.equal(parseInt(newBalance) - parseInt(oldBalance), parseInt(sum));
    });

    it('Production per hour is changed', async () => {
        const instance = await TokenOwnership.deployed();
        let aces = await web3.eth.getAccounts();

        sum = await instance.getProductionPerHourUpgradeCost(0, counts);
        station = await instance.getFuelStationByOwner(aces[1]);
        const oldPrPerHour = station.productionPerHour;
        await instance.upgradeProductionPerHour(0, counts, { from: aces[1], value: sum.toString() });
        station = await instance.getFuelStationByOwner(aces[1]);
        assert.equal(station.productionPerHour, parseInt(oldPrPerHour) + parseInt(counts));
    });
    
    it('balance is changed when changing horse powers', async () => {
        const instance = await TokenOwnership.deployed();
        let aces = await web3.eth.getAccounts();
        await instance.createCar("car1",{ from: aces[1] });

        sum2 = await instance.getHorsePowersUpgradeCost(1, counts);

        oldBalance = await web3.eth.getBalance(aces[0])
        await instance.upgradeHorsePowers(1, counts, { from: aces[1], value: sum2.toString() });
        newBalance = await web3.eth.getBalance(aces[0])
        assert.equal(parseInt(newBalance), parseInt(oldBalance)+parseInt(sum2));
    });

    it('Horse powers are changed', async () => {
        const instance = await TokenOwnership.deployed();
        let aces = await web3.eth.getAccounts();

        const sum = await instance.getHorsePowersUpgradeCost(1, counts);
        engines = await instance.getEnginesByOwner(aces[1]);
        const oldHorsePowers = engines[0].horsePowers;
        await instance.upgradeHorsePowers(1, counts, { from: aces[1], value: sum.toString() });
        engines = await instance.getEnginesByOwner(aces[1]);
        assert.equal(engines[0].horsePowers, parseInt(oldHorsePowers) + parseInt(counts));
    });
    
    it('balance is changed when changing consumtion', async () => {
        const instance = await TokenOwnership.deployed();
        let aces = await web3.eth.getAccounts();

        const sum = await instance.getConsumtionUpgradeCost(1);
        oldBalance = await web3.eth.getBalance(aces[0])
        await instance.upgradeConsumtion(1, { from: aces[1], value: sum.toString() });
        newBalance = await web3.eth.getBalance(aces[0])
        assert.equal(parseInt(newBalance) - parseInt(oldBalance), parseInt(sum));
    });

    it('Consumtion is changed', async () => {
        const instance = await TokenOwnership.deployed();
        let aces = await web3.eth.getAccounts();

        const sum = await instance.getConsumtionUpgradeCost(1);
        engines = await instance.getEnginesByOwner(aces[1]);
        const oldConsumtion = parseInt(engines[0].consumtion);
        await instance.upgradeConsumtion(1, { from: aces[1], value: sum.toString() });
        engines = await instance.getEnginesByOwner(aces[1]);
        assert.equal(engines[0].consumtion, oldConsumtion - 1);
    });
    
    it('balance is changed when changing durability', async () => {
        const instance = await TokenOwnership.deployed();
        let aces = await web3.eth.getAccounts();

        const sum = await instance.getDurabilityUpgradeCost(1, counts);

        oldBalance = await web3.eth.getBalance(aces[0])
        await instance.upgradeDurability(1, counts, { from: aces[1], value: sum.toString() });
        newBalance = await web3.eth.getBalance(aces[0])
        assert.equal(parseInt(newBalance), parseInt(oldBalance)+parseInt(sum));
    });

    it('Durability is changed', async () => {
        const instance = await TokenOwnership.deployed();
        let aces = await web3.eth.getAccounts();

        const sum = await instance.getDurabilityUpgradeCost(1, counts);
        chassis = await instance.getChassisByOwner(aces[1]);
        const oldDurability = chassis[0].durability;
        await instance.upgradeDurability(1, counts, { from: aces[1], value: sum.toString() });
        chassis = await instance.getChassisByOwner(aces[1]);
        assert.equal(parseInt(chassis[0].durability), parseInt(oldDurability) + parseInt(counts));
    });

    it('balance is changed when level increased by 1', async () => {
        const instance = await TokenOwnership.deployed();
        let aces = await web3.eth.getAccounts();

        const sum = await instance.getLevelUpCost(1, counts);

        oldBalance = await web3.eth.getBalance(aces[0]);
        await instance.levelUp(0, { from: aces[1], value: sum.toString() });
        newBalance = await web3.eth.getBalance(aces[0]);
        assert.equal(parseInt(newBalance) - parseInt(oldBalance), parseInt(sum));
    });

    it('level increased by 1', async () => {
        const instance = await TokenOwnership.deployed();
        let aces = await web3.eth.getAccounts();

        const sum = await instance.getLevelUpCost(1, counts);
        cars = await instance.getCarsByOwner(aces[1]);
        console.log(cars)
        const oldLevel = parseInt(cars[0].carLevel);
        await instance.upgradeConsumtion(1, counts, { from: aces[1], value: sum.toString() });
        cars = await instance.getCarsByOwner(aces[1]);
        assert.equal(parseInt(cars[0].carLevel), oldLevel+1);
    });
});