const CarHelper = artifacts.require("CarHelper");

contract('CarHelper', (accounts) => {

    it('capacity is changed', async () => {
        const instance = await CarHelper.deployed();
        const cars = await instance.onlyOwnerOfFuelStation(accounts[0]);
        const newCapacity = cars[0].capacity + 50;
        cars[0].upgradeCapacity(0, 50);
        assert.equal(cars[0].capacity, newCapacity);
    });

    it('production per hour is changed', async () => {
        const instance = await CarHelper.deployed();
        const cars = await instance.onlyOwnerOfFuelStation(accounts[0]);
        const newProductionPerHour = cars[0].productionPerHour + 50;
        cars[0].upgradeProductionPerHour(0, 50);
        assert.equal(cars[0].productionPerHour, newProductionPerHour);
    });

    it('horse powers is changed', async () => {
        const instance = await CarHelper.deployed();
        const cars = await instance.onlyOwnerOfEngine(accounts[0]);
        const newHorsePowers = cars[0].horsePowers + 50;
        cars[0].upgradeHorsePowers(0, 50);
        assert.equal(cars[0].horsePowers, newHorsePowers);
    });

    it('consumtion is changed', async () => {
        const instance = await CarHelper.deployed();
        const cars = await instance.onlyOwnerOfEngine(accounts[0]);
        const newConsumtion = cars[0].consumtion + 50;
        cars[0].upgradeConsumtion(0, 50);
        assert.equal(cars[0].consumtion, newConsumtion);
    });

    it('durability is changed', async () => {
        const instance = await CarHelper.deployed();
        const cars = await instance.onlyOwnerOfChassis(accounts[0]);
        const newDurability = cars[0].durability + 50;
        cars[0].upgradeDurability(0, 50);
        assert.equal(cars[0].durability, newDurability);
    });

    it('level increased by 1', async () => {
        const instance = await CarHelper.deployed();
        const cars = await instance.getCarsByOwner(accounts[0]);
        const newLevel = cars[0].carLevel+1;
        levelUp(0);
        // level increased by 1
        assert.equal(cars[0].carLevel, newLevel);
        // reset win counter
        assert.equal(cars[0].winCountOnCurrentLevel, 0);
        // reset defeat counter
        assert.equal(cars[0].lossCountOnCurrentLevel, 0);
    });

});
