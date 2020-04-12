var HealthcareRecord = artifacts.require("./HealthcareRecord.sol");

module.exports = function(deployer) {
  deployer.deploy(HealthcareRecord);
};