const TokenOwnership = artifacts.require("TokenOwnership");
const ChassisOwnership = artifacts.require("ChassisOwnership");


contract('TokenOwnership', (accounts) => {
    it('???', async () => {
        let a = await TokenOwnership.deployed()
        let b = await ChassisOwnership.deployed()
        //let accounts = await web3.eth.getAccounts()
        await a.createCar("biba", {from:accounts[0]})
        await a.putChassisOnMarketplace(1,200000000, {from:accounts[0]})
        
        await b.buyFromMarketplace(1,{value: "200000000", from:accounts[1]})

        let res = await a.getChassisByOwner(accounts[1]);
        assert.equal(res.length, 1);
    });

});
