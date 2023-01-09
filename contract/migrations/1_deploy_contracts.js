const FuelStationFactory = artifacts.require("./FuelStationFactory.sol");
const CarFactory = artifacts.require("./CarFactory.sol");
const PDDLib = artifacts.require("./PDDLib.sol");
const RaceHandler = artifacts.require("./RaceHandler.sol");
const CarHelper = artifacts.require("./CarHelper.sol");
const CarRacing = artifacts.require("./CarRacing.sol");
const TokenOwnership = artifacts.require("./TokenOwnership.sol");

async function doDeploy(deployer, network) {
  await deployer.deploy(FuelStationFactory);
  await deployer.deploy(CarFactory);
  await deployer.deploy(CarHelper);
  await deployer.deploy(PDDLib);
  await deployer.link(PDDLib, CarRacing);
  await deployer.deploy(CarRacing);
  await deployer.link(PDDLib, TokenOwnership);
  await deployer.deploy(TokenOwnership);
};

module.exports = (deployer, network) => {
  deployer.then(async () => {
      await doDeploy(deployer, network);
  });
};

