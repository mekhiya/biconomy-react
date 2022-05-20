import React, { useState, useEffect } from "react";
import './App.css';
//import "../App.css";
import Button from "@mui/material/Button";
//import Button from "@material-ui/core/Button";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import Backdrop from '@mui/material/Backdrop';
//import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
//import CircularProgress from '@material-ui/core/CircularProgress';

import { ethers } from "ethers";
import { Biconomy } from "@biconomy/mexa";

//import { makeStyles } from '@mui/styles';
//import { makeStyles } from '@material-ui/core/styles';
import Link from '@mui/material/Link';
//import Link from '@material-ui/core/Link';
import Typography from '@mui/material/Typography';
//import Typography from '@material-ui/core/Typography';
import Box from '@mui/material/Box';
//import { Box } from "@material-ui/core";
let sigUtil = require("eth-sig-util");

// let config = {
//   contract: {
//     address: "0x09Eb4a8bD3D59aA15005f30fC38BCe954635F116",
//     abi: [
//       {
//         "inputs": [
//           {
//             "internalType": "address",
//             "name": "_trustedForwarder",
//             "type": "address"
//           }
//         ],
//         "stateMutability": "nonpayable",
//         "type": "constructor"
//       },
//       {
//         "inputs": [],
//         "name": "getStorage",
//         "outputs": [
//           {
//             "internalType": "string",
//             "name": "currentQuote",
//             "type": "string"
//           },
//           {
//             "internalType": "address",
//             "name": "currentOwner",
//             "type": "address"
//           }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//       },
//       {
//         "inputs": [
//           {
//             "internalType": "address",
//             "name": "forwarder",
//             "type": "address"
//           }
//         ],
//         "name": "isTrustedForwarder",
//         "outputs": [
//           {
//             "internalType": "bool",
//             "name": "",
//             "type": "bool"
//           }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//       },
//       {
//         "inputs": [],
//         "name": "owner",
//         "outputs": [
//           {
//             "internalType": "address",
//             "name": "",
//             "type": "address"
//           }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//       },
//       {
//         "inputs": [
//           {
//             "internalType": "string",
//             "name": "_newData",
//             "type": "string"
//           }
//         ],
//         "name": "setStorage",
//         "outputs": [],
//         "stateMutability": "nonpayable",
//         "type": "function"
//       },
//       {
//         "inputs": [
//           {
//             "internalType": "address",
//             "name": "_trustedForwarder",
//             "type": "address"
//           }
//         ],
//         "name": "setTrustForwarder",
//         "outputs": [],
//         "stateMutability": "nonpayable",
//         "type": "function"
//       },
//       {
//         "inputs": [],
//         "name": "trustedForwarder",
//         "outputs": [
//           {
//             "internalType": "address",
//             "name": "",
//             "type": "address"
//           }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//       },
//       {
//         "inputs": [],
//         "name": "versionRecipient",
//         "outputs": [
//           {
//             "internalType": "string",
//             "name": "",
//             "type": "string"
//           }
//         ],
//         "stateMutability": "pure",
//         "type": "function"
//       }
//     ]
//   },
//   apiKey: {
//     test: "uh2wcgvF5.1ce5c0fe-d232-4ea9-8f4c-b43bd03d7b48",
//     prod: "uh2wcgvF5.1ce5c0fe-d232-4ea9-8f4c-b43bd03d7b48"
//   }
// } // FOR Kovan

let config = {
  contract: {
    address: "0xcB914A7991C10dc1176cBDc2843DA7513F475918",
    abi: [
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_trustedForwarder",
            "type": "address"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "inputs": [],
        "name": "getStorage",
        "outputs": [
          {
            "internalType": "string",
            "name": "currentQuote",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "currentOwner",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "forwarder",
            "type": "address"
          }
        ],
        "name": "isTrustedForwarder",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "owner",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_newData",
            "type": "string"
          }
        ],
        "name": "setStorage",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_trustedForwarder",
            "type": "address"
          }
        ],
        "name": "setTrustForwarder",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "trustedForwarder",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "versionRecipient",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "pure",
        "type": "function"
      }
    ]
  },
  apiKey: {
    test: "E0lEoCjoi.c1564ca9-aebc-451e-a315-ba34278b698f",
    prod: "E0lEoCjoi.c1564ca9-aebc-451e-a315-ba34278b698f"
  }
}//For Mumbai

let walletProvider, walletSigner;
let contract, contractInterface;

// const useStyles = makeStyles((theme) => ({
//   root: {
//     '& > * + *': {
//       marginLeft: theme.spacing(2),
//     },
//   },
//   link: {
//     marginLeft: "5px"
//   },
//   backdrop: {
//     zIndex: theme.zIndex.drawer + 1,
//     color: '#fff',
//     opacity: '.85!important',
//     background: '#000'
//   },
// }));

let biconomy, userAddress;

function App() {
  //const classes = useStyles();
  const [backdropOpen, setBackdropOpen] = React.useState(true);
  const [loadingMessage, setLoadingMessage] = React.useState(" Loading Application ...");
  const [quote, setQuote] = useState("This is a default quote");
  const [owner, setOwner] = useState("Default Owner Address");
  const [newQuote, setNewQuote] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [metaTxEnabled] = useState(true);
  const [transactionHash, setTransactionHash] = useState("");

  const handleClose = () => {
    setBackdropOpen(false);
  };



  useEffect(() => {
    async function init() {
      if (
        typeof window.ethereum !== "undefined" &&
        window.ethereum.isMetaMask
      ) {
        // Ethereum user detected. You can now use the provider.
        const provider = window["ethereum"];
        await provider.enable();
        setLoadingMessage("Initializing Biconomy ...");
        // We're creating biconomy provider linked to your network of choice where your contract is deployed
        //default given in github code
        //let jsonRpcProvider = new ethers.providers.JsonRpcProvider("https://kovan.infura.io/v3/d126f392798444609246423b06116c77");

        //for kovan
        //let jsonRpcProvider = new ethers.providers.JsonRpcProvider("https://eth-kovan.alchemyapi.io/v2/hOFbbfHHyLZrzzWoEWfaU9w1o-SzePAp");

        //for Mumbai
        let jsonRpcProvider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.g.alchemy.com/v2/kwDkVGahinYBakz22FjbxKTvQ0LWmNrS");

        biconomy = new Biconomy(jsonRpcProvider, {
          walletProvider: window.ethereum,
          apiKey: config.apiKey.prod,
          debug: true
        });

        /*
          This provider is linked to your wallet.
          If needed, substitute your wallet solution in place of window.ethereum 
        */
        walletProvider = new ethers.providers.Web3Provider(window.ethereum);
        walletSigner = walletProvider.getSigner();

        userAddress = await walletSigner.getAddress()
        setSelectedAddress(userAddress);

        biconomy.onEvent(biconomy.READY, async () => {

          // Initialize your dapp here like getting user accounts etc
          contract = new ethers.Contract(
            config.contract.address,
            config.contract.abi,
            biconomy.getSignerByAddress(userAddress)
          );
          contractInterface = new ethers.utils.Interface(config.contract.abi);
          getQuoteFromNetwork();
        }).onEvent(biconomy.ERROR, (error, message) => {
          // Handle error while initializing mexa
          console.log(message);
          console.log(error);
        });
      } else {
        showErrorMessage("Metamask not installed");
      }
    }
    init();
  }, []);

  const onQuoteChange = event => {
    setNewQuote(event.target.value);
  };

  const onSubmitWithEIP712Sign = async () => {
    if (newQuote !== "" && contract) {
      setTransactionHash("");
      console.log('metaTxEnabled value is ');
      console.log(metaTxEnabled);
      if (metaTxEnabled) {
        showInfoMessage(`Getting user signature`);
        console.log('userAddress');
        console.log(userAddress);
        console.log('newQuote');
        console.log(newQuote);
        sendTransaction(userAddress, newQuote);
      } else {
        console.log("Sending normal transaction");
        let tx = await contract.setStorage(newQuote);
        //let tx = await contract.setQuote(newQuote);
        console.log("Transaction hash : ", tx.hash);
        showInfoMessage(`Transaction sent by relayer with hash ${tx.hash}`);
        let confirmation = await tx.wait();
        console.log(confirmation);
        setTransactionHash(tx.hash);

        showSuccessMessage("Transaction confirmed on chain");
        getQuoteFromNetwork();
      }
    } else {
      showErrorMessage("Please enter the quote");
    }
  };

  const onSubmitWithPrivateKey = async () => {
    if (newQuote !== "" && contract) {
      setTransactionHash("");
      try {
        if (metaTxEnabled) {
          showInfoMessage(`Getting user signature`);
          let privateKey = "bf096e6fb9754860c4c99eb336c0579db994a3ef7fb3f7db869ad2f1972fc755";
          let userAddress = "0xf7AB2d00f379167c339691c23B23111eB598B3fb";
          let userSigner = new ethers.Wallet(privateKey);
          let functionSignature = contractInterface.encodeFunctionData("setQuote", [newQuote]);

          let rawTx = {
            to: config.contract.address,
            data: functionSignature,
            from: userAddress
          };

          let signedTx = await userSigner.signTransaction(rawTx);
          // should get user message to sign for EIP712 or personal signature types
          const forwardData = await biconomy.getForwardRequestAndMessageToSign(signedTx);
          console.log(forwardData);

          // optionally one can sign using sigUtil
          const signature = sigUtil.signTypedMessage(new Buffer.from(privateKey, 'hex'), { data: forwardData.eip712Format }, 'V3');

          let data = {
            signature: signature,
            forwardRequest: forwardData.request,
            rawTransaction: signedTx,
            signatureType: biconomy.EIP712_SIGN,
          };

          let provider = biconomy.getEthersProvider();
          // send signed transaction with ethers
          // promise resolves to transaction hash
          console.log('1111 data value sent is ');
          console.log(data);
          let txHash = await provider.send("eth_sendRawTransaction", [data]);
          showInfoMessage(`Transaction sent. Waiting for confirmation ..`)
          let receipt = await provider.waitForTransaction(txHash);
          setTransactionHash(txHash);
          showSuccessMessage("Transaction confirmed on chain");
          getQuoteFromNetwork();
          console.log(receipt);
        } else {
          console.log("Sending normal transaction");
          let tx = await contract.setStorage(newQuote);
          //let tx = await contract.setQuote(newQuote);
          console.log("Transaction hash : ", tx.hash);
          showInfoMessage(`Transaction sent by relayer with hash ${tx.hash}`);
          let confirmation = await tx.wait();
          console.log(confirmation);
          setTransactionHash(tx.hash);

          showSuccessMessage("Transaction confirmed on chain");
          getQuoteFromNetwork();
        }
      } catch (error) {
        console.log(error);
        handleClose();
      }
    } else {
      showErrorMessage("Please enter the quote");
    }
  }

  const getQuoteFromNetwork = async () => {
    setLoadingMessage("Getting Quote from contact ...");
    //let result = await contract.getQuote();
    let result = await contract.getStorage();

    if (
      result &&
      result.currentQuote !== undefined &&
      result.currentOwner !== undefined
    ) {
      if (result.currentQuote === "") {
        showErrorMessage("No quotes set on blockchain yet");
      } else {
        setQuote(result.currentQuote);
        setOwner(result.currentOwner);
      }
    } else {
      showErrorMessage("Not able to get quote information from Network");
    }
    handleClose();
  };

  const showErrorMessage = message => {
    NotificationManager.error(message, "Error", 5000);
  };

  const showSuccessMessage = message => {
    NotificationManager.success(message, "Message", 3000);
  };

  const showInfoMessage = message => {
    NotificationManager.info(message, "Info", 3000);
  };

  const sendTransaction = async (userAddress, arg) => {
    if (contract) {
      try {
        let { data } = await contract.populateTransaction.setStorage(arg);
        //let { data } = await contract.populateTransaction.setQuote(arg);
        let provider = biconomy.getEthersProvider();
        // let gasLimit = await provider.estimateGas({
        //   to: config.contract.address,
        //   from: userAddress,
        //   data: data
        // });
        //console.log("Gas limit : ", gasLimit);
        let txParams = {
          data: data,
          to: config.contract.address,
          from: userAddress,
          //gasLimit: gasLimit,
          signatureType: "EIP712_SIGN"
        };
        let tx;
        try {
          console.log('Printing Nitin Params');
          console.log(txParams);
          tx = await provider.send("eth_sendTransaction", [txParams])
        }
        catch (err) {
          console.log("handle errors like signature denied here");
          console.log(err);
        }

        console.log("Transaction hash : ", tx);
        showInfoMessage(`Transaction sent. Waiting for confirmation ..`)

        //event emitter methods
        provider.once(tx, (transaction) => {
          // Emitted when the transaction has been mined
          showSuccessMessage("Transaction confirmed on chain");
          console.log(transaction);
          setTransactionHash(tx);
          getQuoteFromNetwork();
        })

      } catch (error) {
        console.log('XYZ Error reached');
        console.log('error message is : ');
        console.log(error);
      }
    }
  };

  return (
    <div className="App">
      <section className="top-row">
        <div className="top-row-item">
          <span className="label">Library </span>
          <span className="label-value">ethers.js</span>
        </div>
        <div className="top-row-item">
          <span className="label">Meta Transaction</span>
          <span className="label-value">EIP-2771</span>
        </div>
        <div className="top-row-item">
          <span className="label">Signature Type</span>
          <span className="label-value">EIP-712 Signature</span>
        </div>
      </section>
      <section className="main">
        <div className="mb-wrap mb-style-2">
          <blockquote cite="http://www.gutenberg.org/ebboks/11">
            <p>{quote}</p>
          </blockquote>
        </div>

        <div className="mb-attribution">
          <p>
            selectedAddress is {selectedAddress}
          </p>
          <p>
            owner is {owner}
          </p>
          <p className="mb-author">{owner}</p>
          {selectedAddress.toLowerCase() === owner.toLowerCase() && (
            <cite className="owner">You are the owner of the quote</cite>
          )}
          {selectedAddress.toLowerCase() !== owner.toLowerCase() && (
            <cite>You are not the owner of the quote</cite>
          )}
        </div>
      </section>
      <section>
        {transactionHash !== "" && <Box mt={2} p={2}>
          <Typography>
            Check your transaction hash
            <Link href={`https://kovan.etherscan.io/tx/${transactionHash}`} target="_blank"
            >
              here
            </Link>
          </Typography>
        </Box>}
      </section>
      <section>
        <div className="submit-container">
          <div className="submit-row">
            <input
              type="text"
              placeholder="Enter your quote"
              onChange={onQuoteChange}
              value={newQuote}
            />
            <Button variant="contained" color="primary" onClick={onSubmitWithEIP712Sign} style={{ marginLeft: "10px" }}>
              Submit
            </Button>

            <Button variant="contained" color="secondary" onClick={onSubmitWithPrivateKey} style={{ marginLeft: "10px" }}>
              Submit (Private Key)
            </Button>
          </div>
        </div>
      </section>
      <Backdrop open={backdropOpen} onClick={handleClose}>
        <CircularProgress color="inherit" />
        <div style={{ paddingLeft: "10px" }}>{loadingMessage}</div>
      </Backdrop>
      <NotificationContainer />
    </div>
  );
}

export default App;