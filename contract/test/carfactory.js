const TokenOwnership = artifacts.require("TokenOwnership");
const EngineOwnership = artifacts.require("EngineOwnership");
const ChassisOwnership = artifacts.require("ChassisOwnership");

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

    it('get one car for this user', async () => {
        const instance = await TokenOwnership.deployed();
        const cars = await instance.getCarsByOwner(accounts[0]);
        assert.equal(cars.length, 1);
    });

    it('get id user fuel station', async () => {
        const instance = await TokenOwnership.deployed();
        const fuelStation = await instance.getFuelStationByOwner(accounts[0]);
        assert.equal(fuelStation.id, 0);
    });


    it('switch engine to another one', async () => {
        const instance = await TokenOwnership.deployed();
        const engineOw = await EngineOwnership.deployed();
        let aces = await web3.eth.getAccounts();
        await instance.createCar("car1",{from:aces[1]});

        await instance.createCustomEngine(100, 5, 100, { from: aces[0] });
        eng = await instance.getEnginesForSale();
        await engineOw.buyFromMarketplace(3, { from: aces[1], value: "100" });
        await instance.switchEngine(1, 3, { from: aces[1] });
        cars = await instance.getCarsByOwner(aces[1]);
        assert.equal(parseInt(cars[0].engineId), 3);
    });

    it('switch chassis to another one', async () => {
        const instance = await TokenOwnership.deployed();
        const chassisOw = await ChassisOwnership.deployed();
        let aces = await web3.eth.getAccounts();

        await instance.createCustomChassis(20, 30, { from: aces[0] });
        await chassisOw.buyFromMarketplace(3, { from: aces[1], value: "30" });
        await instance.switchChassis(1, 3, { from: aces[1] });
        ca = await instance.getCarsByOwner(aces[1]);
        assert.equal(parseInt(ca[0].chassisId), 3);
    });

    it('detach engine', async () => {
        const instance = await TokenOwnership.deployed();
        let aces = await web3.eth.getAccounts();

        await instance.detachEngine(1, 3, { from: aces[1] });
        cars2 = await instance.getCarsByOwner(aces[1]);
        assert.equal(cars2[0].engineId, "0");
    });

    it('detach chassis', async () => {
        const instance = await TokenOwnership.deployed();
        let aces = await web3.eth.getAccounts();

        await instance.detachChassis(1, 3, { from: aces[1] });
        const cars = await instance.getCarsByOwner(aces[1]);
        assert.equal(cars[0].chassisId, "0");
    });
});
