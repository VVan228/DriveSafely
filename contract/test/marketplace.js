const TokenOwnership = artifacts.require("TokenOwnership");
const ChassisOwnership = artifacts.require("ChassisOwnership");
const EngineOwnership = artifacts.require("EngineOwnership");
const CarOwnership = artifacts.require("CarOwnership");
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

    it("success buy token from marketplace", async () => {
        let a = await TokenOwnership.deployed();
        let b = await EngineOwnership.deployed();
        let aces = await web3.eth.getAccounts();

        await b.buyFromMarketplace(2, { from: aces[1], value: "500" });
        engines = await a.getEnginesByOwner(aces[1]);
        assert.equal(engines.length, 2);
    });

    it("try to buy with wrong eth value", async () => {
        let a = await TokenOwnership.deployed();
        let b = await EngineOwnership.deployed();
        let aces = await web3.eth.getAccounts();

        await a.putEngineOnMarketplace(2, 1000, { from: aces[1] });
        await truffleAssert.fails(
            b.buyFromMarketplace(2, { from: aces[2], value: "500" }),
            truffleAssert.ErrorType.REVERT,
            "val wrong"
        );

    });

    it("try to buy yourself token", async () => {
        let a = await TokenOwnership.deployed();
        let b = await EngineOwnership.deployed();
        let aces = await web3.eth.getAccounts();

        await truffleAssert.fails(
            b.buyFromMarketplace(2, { from: aces[1], value: "1000" }),
            truffleAssert.ErrorType.REVERT,
            "cant buy yours"
        );

    });

    it("try to buy not saling token", async () => {
        let a = await TokenOwnership.deployed();
        let b = await ChassisOwnership.deployed();
        let aces = await web3.eth.getAccounts();

        await truffleAssert.fails(
            b.buyFromMarketplace(0, { from: aces[3], value: "100" }),
            truffleAssert.ErrorType.REVERT,
            "not for sale!"
        );

    });

    it("try to transfer token without payment", async () => {
        let a = await TokenOwnership.deployed();
        let b = await EngineOwnership.deployed();
        let aces = await web3.eth.getAccounts();

        await truffleAssert.fails(
            b.transferFrom(aces[1], aces[2], 2, { from: aces[2] }),
            truffleAssert.ErrorType.REVERT,
            "you didn't pay for the token!"
        );

    });

    it("get balance of tokens for owner", async () => {
        let a = await TokenOwnership.deployed();
        let b = await EngineOwnership.deployed();
        let aces = await web3.eth.getAccounts();

        balance = await b.balanceOf(aces[1]);
        assert.equal(balance, "2");

    });

    it("get owner for token", async () => {
        let a = await TokenOwnership.deployed();
        let b = await CarOwnership.deployed();
        let aces = await web3.eth.getAccounts();

        owner = await b.ownerOf(1);
        assert.equal(owner, aces[0]);

    });

    it("get count of saling tokens", async () => {
        let a = await TokenOwnership.deployed();
        let b = await EngineOwnership.deployed();
        let c = await ChassisOwnership.deployed();
        let aces = await web3.eth.getAccounts();

        await a.createCustomCar("model Ford Mustangr", 100, 5, 100000, 12, 1000, { from: aces[0] });
        await a.createCustomCar("model Honda", 100, 5, 100000, 12, 1000, { from: aces[0] });

        await a.putChassisOnMarketplace(3, 200, { from: aces[0] });
        await a.putEngineOnMarketplace(3, 500, { from: aces[0] });
        await a.putEngineOnMarketplace(4, 700, { from: aces[0] });

        cars = await a.getCarsForSale();
        engines = await a.getEnginesForSale();
        chassis = await a.getChassisForSale();

        assert.equal(cars.length, 3);
        assert.equal(engines.length, 4);
        assert.equal(chassis.length, 1);

    });

});
