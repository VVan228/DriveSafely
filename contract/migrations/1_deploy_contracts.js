const FuelStationFactory = artifacts.require("FuelStationFactory");
const CarFactory = artifacts.require("CarFactory");
const PDDLib = artifacts.require("PDDLib");
const RaceHandler = artifacts.require("RaceHandler");
const CarHelper = artifacts.require("CarHelper");

module.exports = function(deployer) {
  deployer.deploy(FuelStationFactory);
  deployer.deploy(CarFactory);
  deployer.deploy(PDDLib);
  deployer.link(PDDLib, RaceHandler);
  deployer.deploy(RaceHandler);
  deployer.deploy(CarHelper);
  
};
