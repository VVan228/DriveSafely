const TokenOwnership = artifacts.require("TokenOwnership");

const counts = 50;

contract('Upgrading', (accounts) => {

    // it('balance is changed when changing capacity', async () => {
    //     const instance = await TokenOwnership.deployed();
    //     await instance.createFuelStation({from:accounts[0]});
    //     //await instance.createCar("jojo",{from:accounts[0]});
    //     const station = await instance.getFuelStationByOwner(accounts[0]);
    //     // checking balance
    //     // not enough balance
        
    //     const oldBalance = await web3.eth.getBalance(accounts[0]);
    //     cpc = 0.001;
    //     //console.log(await TokenOwnership.capacityCoef);
    //     //c = await web3.eth.TokenOwnership.getCapacityCoef();
        
    //     const count = counts * station.capacity * cpc;
    //     await instance.upgradeCapacity(station.id, counts, {from:accounts[0], value:count});
    //     const newBalance = await web3.eth.getBalance(accounts[0]);
    //     assert.equal(newBalance, oldBalance-count);
    // });
    // it('balance is changed when changing capacity', async () => {
    //     const instance = await TokenOwnership.deployed();
    //     await instance.createFuelStation({from:accounts[0]});
    //     //await instance.createCar("jojo",{from:accounts[0]});
    //     const station = await instance.getFuelStationByOwner(accounts[0]);
    //     // checking balance
    //     // not enough balance
    //     const oldBalance = accounts[0].balance;
    //     const count = counts * station.capacity * TokenOwnership.capacityCoef;
    //     await instance.upgradeCapacity(station.id, counts, {from:accounts[0], value:count});
    //     assert.equal(accounts[0].balance, oldBalance-count);
    // });

    // it('production per hour is changed', async () => {
    //     const instance = await TokenOwnership.deployed();
    //     await instance.createCar("car1",{from:accounts[0]});
    //     const cars = await instance.getCarsByOwner(accounts[0]);


    //     // upgrade production per hour
    //     const newProductionPerHour = cars[0].productionPerHour + counts;
    //     cars[0].upgradeProductionPerHour(0, counts);
    //     assert.equal(cars[0].productionPerHour, newProductionPerHour);
    // });

    // it('horse powers is changed', async () => {
    //     const instance = await TokenOwnership.deployed();
    //     await instance.createCar("car1",{from:accounts[0]});
    //     const cars = await instance.getCarsByOwner(accounts[0]);


    //     // upgrade horse powers
    //     const newHorsePowers = cars[0].horsePowers + counts;
    //     cars[0].upgradeHorsePowers(0, counts);
    //     assert.equal(cars[0].horsePowers, newHorsePowers);
    // });

    // it('consumtion is changed', async () => {
    //     const instance = await TokenOwnership.deployed();
    //     await instance.createCar("car1",{from:accounts[0]});
    //     const cars = await instance.getCarsByOwner(accounts[0]);


    //     // upgrade consumtion
    //     const newConsumtion = cars[0].consumtion + counts;
    //     cars[0].upgradeConsumtion(0, counts);
    //     assert.equal(cars[0].consumtion, newConsumtion);
    // });

    // it('durability is changed', async () => {
    //     const instance = await TokenOwnership.deployed();
    //     await instance.createCar("car1",{from:accounts[0]});
    //     const cars = await instance.getCarsByOwner(accounts[0]);


    //     // upgrade durability
    //     const newDurability = cars[0].durability + counts;
    //     cars[0].upgradeDurability(0, counts);
    //     assert.equal(cars[0].durability, newDurability);
    // });

    // it('level increased by 1', async () => {
    //     const instance = await TokenOwnership.deployed();
    //     await instance.createCar("car1",{from:accounts[0]});
    //     const cars = await instance.getCarsByOwner(accounts[0]);
    //     levelUp(0);
    //     // level increased by 1
    //     assert.equal(cars[0].carLevel, 2);
    //     // reset win counter
    //     assert.equal(cars[0].winCountOnCurrentLevel, 0);
    //     // reset defeat counter
    //     assert.equal(cars[0].lossCountOnCurrentLevel, 0);
    // });

});