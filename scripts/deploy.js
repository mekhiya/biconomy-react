const hre = require("hardhat");

async function main() {
  const Greeter = await hre.ethers.getContractFactory("Greeter");
  //passign address of trusted forwarder
  //https://docs.biconomy.io/misc/contract-addresses
  //EIP2771
  const greeter = await Greeter.deploy("0xF82986F574803dfFd9609BE8b9c7B92f63a1410E");

  await greeter.deployed();

  console.log("Greeter deployed to:", greeter.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
