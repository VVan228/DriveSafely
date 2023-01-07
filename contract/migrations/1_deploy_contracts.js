const ConvertLib = artifacts.require("ConvertLib");
const MetaCoin = artifacts.require("MetaCoin");
const FuelStationFactory = artifacts.require("FuelStationFactory");
const CarFactory = artifacts.require("CarFactory");
const PDDLib = artifacts.require("PDDLib");
const RaceHandler = artifacts.require("RaceHandler");

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, MetaCoin);
  deployer.deploy(MetaCoin);
  deployer.deploy(FuelStationFactory);
  deployer.deploy(CarFactory);
  deployer.deploy(PDDLib);
  deployer.link(PDDLib, RaceHandler);
  deployer.deploy(RaceHandler);
};
