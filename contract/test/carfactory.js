const TokenOwnership = artifacts.require("TokenOwnership");


contract('CarHelper', (accounts) => {
    it('creates one car', async () => {
        const instance = await TokenOwnership.deployed();
        await instance.createCar("Lamburgeruini",{from:accounts[0]});
        const cars = await instance.getCarsByOwner(accounts[0]);
        assert.equal(cars[0].model, "Lamburgeruini");
    });

    it('creates car and only one', async () => {
        const instance = await TokenOwnership.deployed();
        try{
            await instance.createCar("Luigig",{from:accounts[0]});
        }catch(e){}
        try{
            await instance.createCar("Luigig2",{from:accounts[0]});
        }catch(e){}
        const cars = await instance.getCarsByOwner(accounts[0]);
        assert.equal(cars.length, 1);
    });

    it('chassis and engine are default', async () => {
        const instance = await TokenOwnership.deployed();
        const cars = await instance.getCarsByOwner(accounts[0]);
        const chassisId = cars[0].chassisId;
        const engineId = cars[0].engineId;
        const engine = await instance.engines(engineId);
        const chassis = await instance.chassis(chassisId);
        assert.equal(engine.consumtion, 10);
        assert.equal(chassis.resource >= 100000, true);
        assert.equal(chassis.resource <= 120001, true);
    });

    it('fuel station is default', async () => {
        const instance = await TokenOwnership.deployed();
        await instance.createFuelStation({from:accounts[0]});
        const station = await instance.getFuelStationByOwner(accounts[0]);
        assert.equal(station.capacity, 60);
        assert.equal(station.productionPerHour, 5);

    });

    it('get engines (owner, length)', async () => {
        const instance = await TokenOwnership.deployed();
        const engines = await instance.getEnginesByOwner(accounts[0]);
        const cars = await instance.getCarsByOwner(accounts[0]);
        assert.equal(engines[0].id, cars[0].engineId);
        assert.equal(engines.length, 1);
    });

    it('get chassis (owner, length)', async () => {
        const instance = await TokenOwnership.deployed();
        const chassis = await instance.getChassisByOwner(accounts[0]);
        const cars = await instance.getCarsByOwner(accounts[0]);
        assert.equal(chassis[0].id, cars[0].chassisId);
        assert.equal(chassis.length, 1);
    });
});
