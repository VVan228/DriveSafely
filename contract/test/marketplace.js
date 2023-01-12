const TokenOwnership = artifacts.require("TokenOwnership");
const ChassisOwnership = artifacts.require("ChassisOwnership");
const truffleAssert = require('truffle-assertions');


contract('TokenOwnership', (accounts) => {

    it("can't put last Chassis token on marketpalce", async () => {
        let a = await TokenOwnership.deployed();
        let aces = await web3.eth.getAccounts();

        await a.createCar("car1", { from: aces[1] });

        await truffleAssert.fails(
            a.putChassisOnMarketplace(1, 200, { from: aces[1] }),
            truffleAssert.ErrorType.REVERT,
            "you can't sale last chassis!"
        );
    });

    it("can't put last Engine token on marketpalce", async () => {
        let a = await TokenOwnership.deployed();
        let aces = await web3.eth.getAccounts();

        await truffleAssert.fails(
            a.putEngineOnMarketplace(1, 500, { from: aces[1] }),
            truffleAssert.ErrorType.REVERT,
            "you can't sale last engine!"
        );
    });


    it("can't put last Car token on marketpalce", async () => {
        let a = await TokenOwnership.deployed();
        let aces = await web3.eth.getAccounts();

        await truffleAssert.fails(
            a.putCarOnMarketplace(0, 1000, { from: aces[1] }),
            truffleAssert.ErrorType.REVERT,
            "you can't sale last car!"
        );
    });

    it("can't put the token on marketpalce if it isn't yours", async () => {
        let a = await TokenOwnership.deployed();
        let aces = await web3.eth.getAccounts();

        await a.createCustomCar("model car", 100, 5, 100000, 12, 1000, { from: aces[0] });

        await truffleAssert.fails(
            a.putEngineOnMarketplace(2, 1000, { from: aces[1] }),
            truffleAssert.ErrorType.REVERT,
            "you're not owner for this Engine!"
        );
    });


    it("put owner's tokens on marketplace with correct prices", async () => {
        let a = await TokenOwnership.deployed();
        let aces = await web3.eth.getAccounts();

        await a.putChassisOnMarketplace(2, 200);
        await a.putEngineOnMarketplace(2, 500);

        let priceCar = await a.carToPrice(1);
        let priceEngine = await a.engineToPrice(2);
        let priceChassis = await a.chassisToPrice(2);
        assert.equal(priceCar, 1000);
        assert.equal(priceEngine, 500);
        assert.equal(priceChassis, 200);

    });

    it("success remove token from marketplace", async () => {
        let a = await TokenOwnership.deployed();
        let aces = await web3.eth.getAccounts();

        await a.removeChassisFromMarketplace(2, { from: aces[0] });
        let priceChassis = await a.chassisToPrice(2);

        assert.equal(priceChassis, "0");
    });

    it("can't remove the token from the marketpalce if it isn't yours", async () => {
        let a = await TokenOwnership.deployed();
        let aces = await web3.eth.getAccounts();

        await truffleAssert.fails(
            a.removeEngineFromMarketplace(2, { from: aces[1] }),
            truffleAssert.ErrorType.REVERT,
            "you're not owner for this Engine!"
        );

    });





    // it("remove token from marketplace", async () => {
    //     let a = await TokenOwnership.deployed();
    //     let aces = await web3.eth.getAccounts();

    //     await a.createCustomEngine( 100, 5, 1000, { from: aces[0] });

    //     let saleEngines = await a.getCarsForSale();
    //     assert.equal(saleEngines[0].horsePowers, 100);

    // });

    // it("put token on market place with correct price", async () => {
    //     let a = await TokenOwnership.deployed();
    //     let aces = await web3.eth.getAccounts();

    //     a.createCar({from: aces[1]});
    //     a.createCustomCar


    //     await a.createCustomEngine(100, 5, 300, { from: aces[0] });

    //     let price = await a.engineToPrice[1];
    //     assert.equal(price, 300);

    // });



});
