"use client";
import React, { useState, useEffect } from "react";

const TransferCertModal = ({ from_, to_address, contractAddress, onSubmit, onClose }) => {
  const [wallet_address, setFrom] = useState(from_);
  const [to, setTo] = useState(to_address);
  const [contract_address, setContractAddress] = useState(contractAddress);
  const callback_url = "https://postman-echo.com/post?";

  useEffect(() => {
    setFrom(from_);
    setTo(to_address);
    setContractAddress(contractAddress);
  }, [from_, to_address, contractAddress]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ wallet_address, to, contract_address, callback_url });
  };

  return (
    <div className="fixed inset-0 z-20 bg-black bg-opacity-70 flex items-center justify-center backdrop-blur-md">
      <div className="bg-white p-8 rounded-lg shadow-lg lg:w-96 w-3/4">
        <h2 className="text-2xl font-bold mb-8">Transfer NFT</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="wallet-address" className="block mb-2">
              Owner Wallet Address
            </label>
            <input
              type="text"
              id="wallet-address"
              value={wallet_address}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="to" className="block mb-2">
              Recipient Address
            </label>
            <input
              type="text"
              id="to"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="contract-address" className="block mb-2">
              Contract Address
            </label>
            <input
              type="text"
              id="contract-address"
              value={contract_address}
              onChange={(e) => setContractAddress(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
              disabled
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 border rounded-md hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Transfer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransferCertModal;
