async function main() {
    const [deployer] = await ethers.getSigners();
    const contractAddress = "0xa607466491a049Bfd19a77A63CFA100CCc7004BC"; 

    const Lock = await ethers.getContractFactory("Lock");
    const lock = await Lock.attach(contractAddress);

    // Пример вызова функции контракта
    const unlockTime = await lock.unlockTime();
    console.log("Unlock time:", unlockTime.toString());
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });


async function depositFunds() {
    const [buyer] = await ethers.getSigners();
    const contractAddress = "0xa607466491a049Bfd19a77A63CFA100CCc7004BC"; 

    const SupplyChain = await ethers.getContractFactory("SupplyChain");
    const supplyChain = await SupplyChain.attach(contractAddress);

    const tx = await supplyChain.deposit({ value: ethers.utils.parseEther("0") }); 
    await tx.wait();

    console.log("Funds deposited.");
}

depositFunds()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });


async function checkStatus() {
    const contractAddress = "0xa607466491a049Bfd19a77A63CFA100CCc7004BC"; 

    const SupplyChain = await ethers.getContractFactory("SupplyChain");
    const supplyChain = await SupplyChain.attach(contractAddress);

    const status = await supplyChain.orderStatus();
    console.log("Order status:", status);
}

checkStatus()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });



async function acceptOrder() {
    const [buyer] = await ethers.getSigners();
    const contractAddress = "0xa607466491a049Bfd19a77A63CFA100CCc7004BC"; 

    const SupplyChain = await ethers.getContractFactory("SupplyChain");
    const supplyChain = await SupplyChain.attach(contractAddress);

    const tx = await supplyChain.acceptOrder();
    await tx.wait();

    console.log("Order accepted and funds transferred.");
}

acceptOrder()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
