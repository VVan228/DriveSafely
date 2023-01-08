const CarHelper = artifacts.require("CarHelper");

contract('CarHelper', (accounts) => {
    it('creates one car', async () => {
        const instance = await CarHelper.deployed();
        await instance.createCar("Lamburgeruini",{from:accounts[0]});
        const cars = await instance.getCarsByOwner(accounts[0]);
        assert.equal(cars[0].model, "Lamburgeruini");
        try{
            await instance.createCar("Luigig",{from:accounts[0]});
        }catch(e){}
    });

    it('creates car and only one', async () => {
        const instance = await CarHelper.deployed();
        try{
            await instance.createCar("Luigig",{from:accounts[0]});
        }catch(e){}
        try{
            await instance.createCar("Luigig2",{from:accounts[0]});
        }catch(e){}
        const cars = await instance.getCarsByOwner(accounts[0]);
        assert.equal(cars.length, 1);
        
    });
});
