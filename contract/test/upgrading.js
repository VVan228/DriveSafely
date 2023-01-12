const TokenOwnership = artifacts.require("TokenOwnership");

const counts = 50;
const capacityCoef = 0.00001 * 10 ^ 18;

contract('Upgrading', (accounts) => {

    it('balance is changed when changing capacity', async () => {
        const instance = await TokenOwnership.deployed();
        let aces = await web3.eth.getAccounts()
        await instance.createFuelStation({ from: aces[1] });

        const counts = 20;
        sum = await instance.getCapacityUpgradeCost(0, counts);

        oldBalance = await web3.eth.getBalance(aces[0])
        await instance.upgradeCapacity(0, counts, { from: aces[1], value: sum.toString() });
        newBalance = await web3.eth.getBalance(aces[0])
        assert.equal(parseInt(newBalance) - parseInt(oldBalance), parseInt(sum));
    });
    /*
        it('balance is changed when changing production per hour', async () => {
            const instance = await TokenOwnership.deployed();
            await instance.createFuelStation({from:accounts[0]});
            const station = await instance.getFuelStationByOwner(accounts[0]);
            // checking balance
            const oldBalance = accounts[0].balance;
            const count = counts * station.productionPerHour * TokenOwnership.productionPerHourCoef;
            await instance.upgradeProductionPerHour(station.id, counts, {from:accounts[0], value:count});
        });
    
        it('horse powers is changed', async () => {
            const instance = await TokenOwnership.deployed();
            //TODO
    
    
            // upgrade horse powers
            const newHorsePowers = cars[0].horsePowers + counts;
            cars[0].upgradeHorsePowers(0, counts);
        });
    
        it('consumtion is changed', async () => {
            const instance = await TokenOwnership.deployed();
            // TODO
    
    
            // upgrade consumtion
            const newConsumtion = cars[0].consumtion + counts;
            cars[0].upgradeConsumtion(0, counts);
        });
    
        it('durability is changed', async () => {
            const instance = await TokenOwnership.deployed();
            // TODO
    
    
            // upgrade durability
            const newDurability = cars[0].durability + counts;
            cars[0].upgradeDurability(0, counts);
        });*/

    it('level increased by 1', async () => {
        const instance = await TokenOwnership.deployed();
        //await instance.createCar("car1",{from:accounts[0]});
        const cars = await instance.getCarsByOwner(accounts[0]);
        //assert.equal(cars[0].carLevel, 1);

        /*const oldBalance = accounts[0].balance;
        const count = 2 * (cars[0].carLevel/10 + 1);
        await instance.levelUp(0, {from:accounts[0], value:count});
        assert.equal(accounts[0].balance, oldBalance-count);
        // level increased by 1
        assert.equal(cars[0].carLevel, 2);
        // reset win counter
        assert.equal(cars[0].winCountOnCurrentLevel, 0);
        // reset defeat counter
        assert.equal(cars[0].lossCountOnCurrentLevel, 0);*/
    });

});