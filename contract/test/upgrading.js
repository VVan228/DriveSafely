const CarHelper = artifacts.require("CarHelper");

const counts = 50;

contract('CarUpgrade', (accounts) => {

    it('capacity is changed', async () => {
        const instance = await CarHelper.deployed();
        await instance.createCar("car1",{from:accounts[0]});
        const cars = await instance.getCarsByOwner(accounts[0]);
        const stations = await instance.getFuelStationByOwner(accounts[0]);
        // checking balance
        // not enough balance
        const oldBalance = counts * stations[0].capacity * CarHelper.capacityCoef;
        assert.equal(accounts[0].balance < oldBalance, true); // TODO???

        // upgrade capacity
        const newCapacity = cars[0].capacity + counts;
        cars[0].upgradeCapacity(0, counts);
        assert.equal(cars[0].capacity, newCapacity);
    });

    it('production per hour is changed', async () => {
        const instance = await CarHelper.deployed();
        await instance.createCar("car1",{from:accounts[0]});
        const cars = await instance.getCarsByOwner(accounts[0]);


        // upgrade production per hour
        const newProductionPerHour = cars[0].productionPerHour + counts;
        cars[0].upgradeProductionPerHour(0, counts);
        assert.equal(cars[0].productionPerHour, newProductionPerHour);
    });

    it('horse powers is changed', async () => {
        const instance = await CarHelper.deployed();
        await instance.createCar("car1",{from:accounts[0]});
        const cars = await instance.getCarsByOwner(accounts[0]);


        // upgrade horse powers
        const newHorsePowers = cars[0].horsePowers + counts;
        cars[0].upgradeHorsePowers(0, counts);
        assert.equal(cars[0].horsePowers, newHorsePowers);
    });

    it('consumtion is changed', async () => {
        const instance = await CarHelper.deployed();
        await instance.createCar("car1",{from:accounts[0]});
        const cars = await instance.getCarsByOwner(accounts[0]);


        // upgrade consumtion
        const newConsumtion = cars[0].consumtion + counts;
        cars[0].upgradeConsumtion(0, counts);
        assert.equal(cars[0].consumtion, newConsumtion);
    });

    it('durability is changed', async () => {
        const instance = await CarHelper.deployed();
        await instance.createCar("car1",{from:accounts[0]});
        const cars = await instance.getCarsByOwner(accounts[0]);


        // upgrade durability
        const newDurability = cars[0].durability + counts;
        cars[0].upgradeDurability(0, counts);
        assert.equal(cars[0].durability, newDurability);
    });

    it('level increased by 1', async () => {
        const instance = await CarHelper.deployed();
        await instance.createCar("car1",{from:accounts[0]});
        const cars = await instance.getCarsByOwner(accounts[0]);
        levelUp(0);
        // level increased by 1
        assert.equal(cars[0].carLevel, 1);
        // reset win counter
        assert.equal(cars[0].winCountOnCurrentLevel, 0);
        // reset defeat counter
        assert.equal(cars[0].lossCountOnCurrentLevel, 0);
    });

});
