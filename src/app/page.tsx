"use client";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Link from "next/link";
import Image from "next/image";

const contractAddress = "0x535d36EcAfED6C03a61F9492760E054E9F52ABc2";

const contractABI = [
  {
    inputs: [],
    name: "deposit",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "ship",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "confirmDelivery",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "acceptOrder",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "orderStatus",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const HomePage = () => {
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      console.log("MetaMask is installed!");
    } else {
      alert("Please install MetaMask!");
    }
  }, []);

  const init = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask!");
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    return contract;
  };

  const depositFunds = async () => {
    console.log("Deposit Funds function called");
    try {
      const contract = await init();
      if (contract) {
        const amountToDeposit = ethers.utils.parseEther("0.0001");
        console.log("Amount to deposit:", amountToDeposit.toString());

        // Проверка текущего состояния
        const status = await contract.orderStatus();
        if (status !== "Awaiting payment") {
          setStatus("Error: Cannot deposit funds at this stage.");
          return;
        }

        const tx = await contract.deposit({
          value: amountToDeposit,
          gasLimit: ethers.BigNumber.from("3000000"),
        });
        console.log("Transaction sent:", tx);
        await tx.wait();
        console.log("Transaction confirmed");
        setStatus("Funds deposited.");
      }
    } catch (error: any) {
      if (error.message.includes("Invalid state")) {
        setStatus("Error: Cannot deposit funds at this stage.");
      } else if (error.message.includes("CALL_EXCEPTION")) {
        setStatus(
          "Error: Transaction failed. Please check the contract state and parameters."
        );
      } else {
        console.error("Error depositing funds:", error);
        setStatus("Error depositing funds: " + error.message);
      }
    }
  };

  const shipOrder = async () => {
    try {
      const contract = await init();
      if (contract) {
        // Проверка текущего состояния
        const status = await contract.orderStatus();
        if (status !== "Awaiting shipment") {
          setStatus("Error: Cannot ship order at this stage.");
          return;
        }

        const tx = await contract.ship({
          gasLimit: ethers.BigNumber.from("3000000"),
        });
        console.log("Transaction sent:", tx);
        await tx.wait();
        console.log("Transaction confirmed");
        setStatus("Order shipped.");
      }
    } catch (error: any) {
      if (error.message.includes("Invalid state")) {
        setStatus("Error: Cannot ship order at this stage.");
      } else if (error.message.includes("Sender must be the seller")) {
        setStatus("Error: Only the seller can ship the order.");
      } else {
        console.error("Error shipping order:", error);
        setStatus("Error shipping order: " + error.message);
      }
    }
  };

  const confirmDelivery = async () => {
    try {
      const contract = await init();
      if (contract) {
        // Проверка текущего состояния
        const status = await contract.orderStatus();
        if (status !== "In transit") {
          setStatus("Error: Cannot confirm delivery at this stage.");
          return;
        }

        const tx = await contract.confirmDelivery({
          gasLimit: ethers.BigNumber.from("3000000"),
        });
        console.log("Transaction sent:", tx);
        await tx.wait();
        console.log("Transaction confirmed");
        setStatus("Order delivered.");
      }
    } catch (error: any) {
      if (error.message.includes("Invalid state")) {
        setStatus("Error: Cannot confirm delivery at this stage.");
      } else if (error.message.includes("Sender must be the courier")) {
        setStatus("Error: Only the courier can confirm delivery.");
      } else {
        console.error("Error confirming delivery:", error);
        setStatus("Error confirming delivery: " + error.message);
      }
    }
  };

  const acceptOrder = async () => {
    try {
      const contract = await init();
      if (contract) {
        // Проверка текущего состояния
        const status = await contract.orderStatus();
        if (status !== "Delivered") {
          setStatus("Error: Cannot accept order at this stage.");
          return;
        }

        const tx = await contract.acceptOrder({
          gasLimit: ethers.BigNumber.from("3000000"),
        });
        console.log("Transaction sent:", tx);
        await tx.wait();
        console.log("Transaction confirmed");
        setStatus("Order accepted and funds transferred.");
      }
    } catch (error: any) {
      if (error.message.includes("Invalid state")) {
        setStatus("Error: Cannot accept order at this stage.");
      } else if (error.message.includes("Sender must be the buyer")) {
        setStatus("Error: Only the buyer can accept the order.");
      } else {
        console.error("Error accepting order:", error);
        setStatus("Error accepting order: " + error.message);
      }
    }
  };

//   const acceptOrder = async () => {
//     try {
//       const contract = await init();
//       if (contract) {
//         const tx = await contract.acceptOrder();
//         await tx.wait();
//         setStatus("Order accepted and funds transferred.");
//       }
//     } catch (error: any) {
//       console.error("Error accepting order:", error);
//       setStatus("Error accepting order: " + error.message);
//     }
//   };

  const checkStatus = async () => {
    try {
      const contract = await init();
      if (contract) {
        const status = await contract.orderStatus();
        setStatus("Order status: " + status);
      }
    } catch (error: any) {
      console.error("Error checking status:", error);
      setStatus("Error checking status: " + error.message);
    }
  };

  return (
    <div>
      <header className="bg-gray-800 text-white p-4">
        <nav className="container mx-auto flex justify-between">
          <div className="flex items-center">
            <Image src="/next.svg" alt="Next.js Logo" width={50} height={50} />
            <h1 className="ml-2 text-2xl font-bold">My Website</h1>
          </div>
          <div className="flex items-center">
            <Link
              href="/about-us"
              className="ml-4 text-white hover:text-gray-400"
            >
              About Us
            </Link>
            <Link href="/users" className="ml-4 text-white hover:text-gray-400">
              Products
            </Link>
          </div>
        </nav>
      </header>
      <main className="container mx-auto py-16">
        <section className="text-center">
          <h2 className="text-4xl font-bold mb-4">Welcome to My Website</h2>
          <p className="text-xl mb-8">Explore the world of Next.js with us!</p>
          <div className="flex justify-center mb-8">
            <Image
              src="/next.svg"
              alt="Next.js Hero Image"
              width={500}
              height={500}
            />
          </div>
          <div className="mb-4">
            <button
              onClick={depositFunds}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Deposit Funds
            </button>
          </div>
          <div className="mb-4">
            <button
              onClick={shipOrder}
              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            >
              Ship Order
            </button>
          </div>
          <div className="mb-4">
            <button
              onClick={confirmDelivery}
              className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
            >
              Confirm Delivery
            </button>
          </div>
          <div className="mb-4">
            <button
              onClick={acceptOrder}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Accept Order
            </button>
          </div>
          <div className="mb-4">
            <button
              onClick={checkStatus}
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
            >
              Check Status
            </button>
          </div>
          <p id="status">{status}</p>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
