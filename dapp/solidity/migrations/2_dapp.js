const dapp = artifacts.require("dapp");

module.exports = function(deployer) {
  deployer.deploy(dapp);
};
