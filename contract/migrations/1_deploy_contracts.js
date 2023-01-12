const FuelStationFactory = artifacts.require("./FuelStationFactory.sol");
const CarFactory = artifacts.require("./CarFactory.sol");
const PDDLib = artifacts.require("./PDDLib.sol");
const RaceHandler = artifacts.require("./RaceHandler.sol");
const CarHelper = artifacts.require("./CarHelper.sol");
const CarRacing = artifacts.require("./CarRacing.sol");
const TokenOwnership = artifacts.require("./TokenOwnership.sol");
const CarOwnership = artifacts.require("./CarOwnership.sol");
const ChassisOwnership = artifacts.require("./ChassisOwnership.sol");
const EngineOwnership = artifacts.require("./EngineOwnership.sol");
const PDDLibTest = artifacts.require("./PDDLibTest.sol");

async function doDeploy(deployer, network) {
  // await deployer.deploy(FuelStationFactory);
  // await deployer.deploy(CarFactory);
  // await deployer.deploy(CarHelper);
  await deployer.deploy(PDDLib);
  // await deployer.link(PDDLib, CarRacing);
  // await deployer.deploy(CarRacing);
  
  // deployOwnerships().then(() =>{
  //   return deployer.deploy(TokenOwnership, ChassisOwnership.address, EngineOwnership.address, CarFactory.address);
  // });
  await deployer.deploy(CarOwnership);
  await deployer.deploy(ChassisOwnership);
  await deployer.deploy(EngineOwnership);

  let c = await CarOwnership.deployed()
  let ch = await ChassisOwnership.deployed();
  let e = await EngineOwnership.deployed();
  
  // await deployer.deploy(TokenOwnership, ch.address, e.address, c.address);
  await deployer.deploy(TokenOwnership);
  let to = await TokenOwnership.deployed();
  await deployer.link(PDDLib, TokenOwnership);

  await deployer.deploy(PDDLibTest);
  await deployer.link(PDDLib, PDDLibTest);

  await c.init(to.address);
  await ch.init(to.address);
  await e.init(to.address);
  await to.init(ch.address,e.address,c.address);
  
};


module.exports = (deployer, network) => {
  deployer.then(async () => {
      await doDeploy(deployer, network);
  });
};

