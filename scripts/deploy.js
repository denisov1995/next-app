
import pkg from "hardhat";
const {ethers} = pkg;

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  
  const buyer = process.env.NEXT_PUBLIC_BUYER_ADRESS; // Адрес покупателя (замените на настоящий адрес)
  const seller = process.env.NEXT_PUBLIC_SELLER_ADRESS; // Адрес продавца (используем адрес деплояера)
  const courier = "0x0000000000000000000000000000000000000021"; // Адрес курьера (замените на настоящий адрес)
  const amount = ethers.utils.parseEther("0.0001"); // Сумма в ETH

  const Lock = await ethers.getContractFactory("Lock");
  const lock = await Lock.deploy(buyer, seller, courier, amount); // Передача всех 4 аргументов в конструктор

  console.log("Contract deployed to:", lock.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });