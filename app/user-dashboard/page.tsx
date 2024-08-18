"use client";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MintAssetModal from "../components/Mint-asset";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import TransferCertModal from "../components/Transfer-Cert";

  const UserDashboard = () => {
    const [wallet_address, setWalletAddress] = useState("");

  const [isMintAssetModalOpen, setIsMintAssetModalOpen] = useState(false);
  const [isTransferCertModalOpen, setIsTransferCertModalOpen] = useState(false);
  const [assetContracts, setAssetContracts] = useState(null);
  const [mintedCerts, setMintedCerts] = useState(null);
  const [marketPlacemintedCerts, setMarketPlacemintedCerts] = useState(null);
  const [selectedContractAddress, setSelectedContractAddress] = useState(null); // Store selected contract address
  const [activeSection, setActiveSection] = useState("All Assets"); // New state for active section
  const marketplaceAddress = "0xF0fd8E0F74955Ce9166ffF8F251eE8576c4F3870";

  const openMintAssetModal = (contractAddress) => {
    setSelectedContractAddress(contractAddress); // Set the selected contract address
    setIsMintAssetModalOpen(true);
  };

  const closeMintAssetModal = () => {
    setIsMintAssetModalOpen(false);
    setSelectedContractAddress(null);
  };

  const openTransferCertModal = (contractAddress) => {
    setSelectedContractAddress(contractAddress); // Set the selected contract address
    setIsTransferCertModalOpen(true);
  };

  const closeTransferCertModal = () => {
    setIsTransferCertModalOpen(false);
    setSelectedContractAddress(null);
  };

  const fetchAssetContractList = async (data) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/certificate/get-smart-contract`,
        {
          method: "GET",
          headers: {
            client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
            client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch smart contract list");
      }

      const result = await response.json();
      const smartContractList = result.result;

      if (!smartContractList) {
        throw new Error("Assset contract list not found in the response");
      }
      setAssetContracts(smartContractList);
    } catch (error) {
      console.error("Error fetching asset contract list :", error);
      toast.error("🦄 Error fetching asset contract list", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const mintCertificate = async (certificateData) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/certificate/mint-certificate`,
        certificateData,
        {
          headers: {
            client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
            client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
            'content-type': 'multipart/form-data',
          }
        }
      );
      if (!response.data) {
        toast.error("🦄 You must be the asset owner!", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.success(`🦄 Certificate Minted successfully!`, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.error("Error minting certificate:", error);
      toast.error("🦄 Error minting certificate", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      throw error;
    }
  };

  const fetchMintedCerts = async (data) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/certificate/get-certificate`,
        {
          method: "GET",
          headers: {
            client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
            client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch smart contract list");
      }

      const result = await response.json();
      const mintedCerts = result.result;

      const mintToMarketCerts = mintedCerts.filter(
        (cert) => cert.to_wallet === marketplaceAddress
      );
      
      setMarketPlacemintedCerts(mintToMarketCerts);

      if (!mintedCerts) {
        throw new Error("Minted Certs not found in the response");
      }
      setMintedCerts(mintedCerts);
    } catch (error) {
      console.error("Error fetching minted certs :", error);
      toast.error("🦄 Error fetching minted certs", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const transferCertificate = async (data) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/certificate/owner-transfer`,
        {
          method: "POST",
          headers: {
            client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
            client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to transfer certificate");
      } else {
        toast.success(`🦄 NFT Transfer successful!`, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }

      const result = await response.json();
      const mintedCerts = result.result;
      if (!mintedCerts) {
        throw new Error("Certs not found in the response");
      }
      setMintedCerts(mintedCerts);
      closeTransferCertModal();
    } catch (error) {
      console.error("Error transferring cert ownership :", error);
      toast.error("🦄 Error transferring cert ownership", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  useEffect(() => {
    const walletAddress = sessionStorage.getItem("walletAddress");
    if (walletAddress) {
      setWalletAddress(walletAddress);
      fetchAssetContractList(walletAddress);
      fetchMintedCerts(walletAddress);
    }
  }, []);

  return (
    <div className="flex">
      <aside
        id="default-sidebar"
        className="z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto border-r-2">
          <ul className="space-y-2 font-medium">
            <li>
              <button
                onClick={() => setActiveSection("All Assets")}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:hover:bg-gray-300 group"
              >
                <span className="ms-3">All Assets</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection("NFT Minting Transaction")}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:hover:bg-gray-300 group"
              >
                <span className="ms-3">NFT Minting Transaction</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection("Marketplace")}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:hover:bg-gray-300 group"
              >
                <span className="ms-3">Marketplace</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection("Rental Income")}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:hover:bg-gray-300 group"
              >
                <span className="ms-3">Rental Income</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>

      <div className="p-4 flex-grow">
        {activeSection === "All Assets" && (
          <div>
            <h2 className="flex text-xl font-bold items-center justify-center pb-2">
              All Assets
            </h2>
            <main className="flex flex-col items-center justify-center">
              <div className="overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                    <tr>
                      <th scope="col" className="px-4 py-3">
                        Contract Address
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Contract Name
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Name
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Symbol
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Transaction Hash
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {assetContracts &&
                      assetContracts.map((assetContract, index) => (
                        <tr
                          key={index}
                          className="odd:bg-white even:bg-gray-50 border-b"
                        >
                          <td className="px-4 py-3">{`${assetContract.contract_address.slice(
                            0,
                            6
                          )}...${assetContract.contract_address.slice(
                            -4
                          )}`}</td>
                          <td className="px-4 py-3">
                            {assetContract.contract_name}
                          </td>
                          <td className="px-4 py-3">{assetContract.name}</td>
                          <td className="px-4 py-3">{assetContract.symbol}</td>
                          <td className="px-4 py-3">{`${assetContract.transactionHash.slice(
                            0,
                            6
                          )}...${assetContract.transactionHash.slice(-4)}`}</td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() =>
                                openMintAssetModal(
                                  assetContract.contract_address
                                )
                              }
                              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            >
                              Mint NFTs
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </main>
          </div>
        )}
        {activeSection === "NFT Minting Transaction" && (
          <div>
            <div>
              <h2 className="flex text-xl font-bold items-center justify-center pb-2">
                NFT Minting Transaction
              </h2>
              <main className="flex flex-col items-center justify-center">
                <div className="overflow-x-auto shadow-md sm:rounded-lg">
                  <table className="w-full text-sm rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                      <tr>
                        <th scope="col" className="px-4 py-3">
                          Block Number
                        </th>
                        <th scope="col" className="px-4 py-3">
                          From
                        </th>
                        <th scope="col" className="px-4 py-3">
                          To
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Mint
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Certificate
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Created At
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Transaction Hash
                        </th>
                        <th scope="col" className="px-4 py-3">
                          NFT Id
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Token Contract Address
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Token Name
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Token Symbol
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {mintedCerts &&
                        mintedCerts.map((mintedCert, index) => (
                          <tr
                            key={index}
                            className="odd:bg-white even:bg-gray-50 border-b"
                          >
                            <td className="px-4 py-3">
                              {mintedCert.blockNumber}
                            </td>
                            <td className="px-4 py-3">{`${mintedCert.from_wallet.slice(
                              0,
                              6
                            )}...${mintedCert.from_wallet.slice(-4)}`}</td>
                            <td className="px-4 py-3">{`${mintedCert.to_wallet.slice(
                              0,
                              6
                            )}...${mintedCert.to_wallet.slice(-4)}`}</td>
                            <td className="px-4 py-3">
                              {mintedCert.is_mint ? "YES" : "NO"}
                            </td>
                            <td className="px-4 py-3">
                              <a
                                href={mintedCert.certificate_file}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                              >
                                View
                              </a>
                            </td>
                            <td className="px-4 py-3">
                              {new Date(
                                mintedCert.created_at
                              ).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-3">{`${mintedCert.transactionHash.slice(
                              0,
                              6
                            )}...${mintedCert.transactionHash.slice(-4)}`}</td>
                            <td className="px-4 py-3">
                              {mintedCert.nft_token_id
                                ? mintedCert.nft_token_id
                                : "N/A"}
                            </td>
                            <td className="px-4 py-3">{`${mintedCert.token.contract_address.slice(
                              0,
                              6
                            )}...${mintedCert.token.contract_address.slice(
                              -4
                            )}`}</td>
                            <td className="px-4 py-3">
                              {mintedCert.token.name}
                            </td>
                            <td className="px-4 py-3">
                              {mintedCert.token.symbol}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </main>
            </div>
          </div>
        )}
        {activeSection === "Marketplace" && (
          <div>
            <h2 className="flex text-xl font-bold items-center justify-center pb-2">
                Marketplace
              </h2>
              <main className="flex flex-col items-center justify-center">
                <div className="overflow-x-auto shadow-md sm:rounded-lg">
                  <table className="w-full text-sm rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                      <tr>
                        <th scope="col" className="px-4 py-3">
                          Block Number
                        </th>
                        <th scope="col" className="px-4 py-3">
                          From
                        </th>
                        <th scope="col" className="px-4 py-3">
                          To
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Mint
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Certificate
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Created At
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Transaction Hash
                        </th>
                        <th scope="col" className="px-4 py-3">
                          NFT Id
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Token Contract Address
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Token Name
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Token Symbol
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {marketPlacemintedCerts &&
                        marketPlacemintedCerts.map((mintedCert, index) => (
                          <tr
                            key={index}
                            className="odd:bg-white even:bg-gray-50 border-b"
                          >
                            <td className="px-4 py-3">
                              {mintedCert.blockNumber}
                            </td>
                            <td className="px-4 py-3">{`${mintedCert.from_wallet.slice(
                              0,
                              6
                            )}...${mintedCert.from_wallet.slice(-4)}`}</td>
                            <td className="px-4 py-3">
                              {mintedCert.to_wallet == marketplaceAddress? "Marketplace" : mintedCert.to_wallet}
                            </td>
                            <td className="px-4 py-3">
                              {mintedCert.is_mint ? "YES" : "NO"}
                            </td>
                            <td className="px-4 py-3">
                              <a
                                href={mintedCert.certificate_file}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                              >
                                View
                              </a>
                            </td>
                            <td className="px-4 py-3">
                              {new Date(
                                mintedCert.created_at
                              ).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-3">{`${mintedCert.transactionHash.slice(
                              0,
                              6
                            )}...${mintedCert.transactionHash.slice(-4)}`}</td>
                            <td className="px-4 py-3">
                              {mintedCert.nft_token_id
                                ? mintedCert.nft_token_id
                                : "N/A"}
                            </td>
                            <td className="px-4 py-3">{`${mintedCert.token.contract_address.slice(
                              0,
                              6
                            )}...${mintedCert.token.contract_address.slice(
                              -4
                            )}`}</td>
                            <td className="px-4 py-3">
                              {mintedCert.token.name}
                            </td>
                            <td className="px-4 py-3">
                              {mintedCert.token.symbol}
                            </td>
                            <td className="px-4 py-3">
                            <button
                              onClick={() =>
                                openTransferCertModal(
                                  mintedCert.token.contract_address
                                )
                              }
                              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            >
                              Transfer NFT
                            </button>
                          </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </main>
          </div>
        )}
        {activeSection === "Rental Income" && (
          <div>
            <h2 className="text-2xl font-bold">Rental Income</h2>
            <p className="mt-2">To be continued...</p>
          </div>
        )}
      </div>
      <AnimatePresence>
        {isMintAssetModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            <MintAssetModal
              contractAddress={selectedContractAddress}
              onSubmit={mintCertificate}
              onClose={closeMintAssetModal}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isTransferCertModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            <TransferCertModal
              from_={marketplaceAddress}
              to_address={wallet_address}
              contractAddress={selectedContractAddress}
              onSubmit={transferCertificate}
              onClose={closeTransferCertModal}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default UserDashboard;
