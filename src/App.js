import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import './App.css';
import abi from './utils/WavePortal.json';
import CustomCarousel from './components/CustomCarousel';
import Balance from './components/Balance';
import CustomHeader from './components/CustomHeader';
import CustomFooter from './components/CustomFooter';
import DonationCard from './components/DonationCard';
import ExecuteDonationCard from './components/ExecuteDonationCard';
import ContractInfoCard from './components/ContractInfoCard';
import { Container, Row, Col } from "react-bootstrap";
import Sponsor from './components/Sponsor';
require('dotenv').config();

export default function App() {

 /*
  * Just a state variable we use to store our user's public wallet.
  */
  const [currentAccount, setCurrentAccount] = useState("");
  const [totalWaves, setTotalWaves] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [allWaves, setAllWaves] = useState([]);
  const [message, setMessage] = useState("");
  const [amount, setAmount] = useState(0);
  const [donationAddress, setDonationAddress] = useState("");

  
  const contractAddress = process.env.REACT_APP_SMARTCONTRACT;
  const coin = process.env.REACT_APP_COIN;

   const contractABI = abi.abi;

   const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;
      
      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      
      /*
      * Check if we're authorized to access the user's wallet
      */
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      
      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account)
        

      } else {
        console.log("No authorized account found")
      }

      displaySmartContractInfo();

    } catch (error) {
      console.log(error);
    }
  }

  /**
  * Implement your connectWallet method here
  */
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }
      
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]); 

      let chainId = await ethereum.request({ method: 'eth_chainId' });
      console.log("Connected to chain " + chainId);

      // String, hex code of the chainId of the Rinkebey test network
      const rinkebyChainId = "0x4"; 
      if (chainId !== rinkebyChainId) {
	      alert("You are not connected to the Rinkeby Test Network!");
      }

      // Setup listener! This is for the case where a user comes to our site
      // and connected their wallet for the first time.
      //displaySmartContractInfo() 

    } catch (error) {
      console.log(error)
    }
  }

   // Setup our listener.
  const displaySmartContractInfo = async () => {

    try {
      const { ethereum } = window;

      if (ethereum) {

        console.log("Contract address " + contractAddress);
        
        // Same stuff again
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

         // Get all waves
        getAllWaves();

        // Get total waves
        let countWaves = await wavePortalContract.getTotalWaves();
        console.log("Number of waves " + countWaves);
        setTotalWaves(countWaves.toNumber());

        // Get total balance donated by users
        let contractBalance = await wavePortalContract.getContractBalance();

        console.log("Address balance " + contractBalance);
        setTotalBalance(contractBalance);

      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }

 /*
  * This runs our function when the page loads.
  */
  useEffect(() => {
    //setupEventListener();
    checkIfWalletIsConnected();
 
  }, [])

  const wave = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
       
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        if (!message) {
          alert("Please write a message!")
          return
        }

        if (!amount) {
          alert("Please write the amount you will donate")
          return
        }

        let count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count...", count.toNumber());

        const waveTxn = await wavePortalContract.wave(
          message, 
          {
            value: ethers.utils.parseEther(amount.toString())
          }
        );
        console.log("Mining...", waveTxn.hash);

        await waveTxn.wait();
        console.log("Mined -- ", waveTxn.hash);

        // Update total waves
        count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count...", count.toNumber());
        setTotalWaves(count.toNumber())

        // Update smart contract balance
        let currentBalance = await wavePortalContract.getContractBalance();

        console.log("Current contract balance " + currentBalance);
        setTotalBalance(currentBalance.toNumber());
 

      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
      alert("Error: " + error.data.message)
    }
}

const donate = async () => {
  try {
    const { ethereum } = window;

    if (ethereum) {
     
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

      if (!donationAddress) {
        alert("Please write a wallet address to transfer the coins!")
        return
      }

      console.log("Donation address " + donationAddress)
      const waveTxn = await wavePortalContract.donate(
        donationAddress
      );
      console.log("Mining...", waveTxn.hash);

      await waveTxn.wait();
      console.log("Mined -- ", waveTxn.hash);

      // Update smart contract balance
      let currentBalance = await wavePortalContract.getContractBalance();

      console.log("Current contract balance " + currentBalance);
      setTotalBalance(currentBalance.toNumber());


    } else {
      console.log("Ethereum object doesn't exist!");
    }
  } catch (error) {
    console.log(error)
  }
}

  /*
   * Create a method that gets all waves from your contract
   */
  const getAllWaves = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        /*
         * Call the getAllWaves method from your Smart Contract
         */
        const waves = await wavePortalContract.getAllWaves();
        

        /*
         * We only need address, timestamp, and message in our UI so let's
         * pick those out
         */
        let wavesCleaned = [];
        waves.forEach(wave => {
          wavesCleaned.push({
            address: wave.waver,
            timestamp: new Date(wave.timestamp * 1000),
            message: wave.message,
            amount: wave.amount,
          });
        });

        /*
         * Store our data in React State
         */
        setAllWaves(wavesCleaned);

        // THIS IS THE MAGIC SAUCE.
        // This will essentially "capture" our event when our contract throws it.
        // If you're familiar with webhooks, it's very similar to that!
        wavePortalContract.on("NewWave", (from, timestamp, message, amount) => {
          console.log("NewWave", from, timestamp, message, amount);

          setAllWaves(prevState => [...prevState, {
            address: from,
            timestamp: new Date(timestamp * 1000),
            message: message,
            amount: amount
          }]);

        });

      } else {
        console.log("Ethereum object doesn't exist!")
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
  

    <Container fluid>
 
        <Row>
          <Col>
              <Sponsor/>
              <CustomHeader/>
          </Col>
        </Row>
 
        <Row>
          <Col>
            <CustomCarousel
              allWaves = {allWaves}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Balance
              totalBalance = {ethers.utils.formatEther(totalBalance)}
              />
          </Col>
        </Row>
        <Row>
          <Col sm>
            <DonationCard
              currentAccount = {currentAccount}
              message = {message}
              amount = {amount}
              setMessage = {setMessage}
              setAmount = {setAmount}
              wave = {wave}
              connectWallet = {connectWallet}
              />
          </Col>
          <Col sm>
            <ContractInfoCard
              currentAccount = {currentAccount}
              contractAddress = {contractAddress}
              totalWaves = {totalWaves}
              totalBalance = {ethers.utils.formatEther(totalBalance)}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <ExecuteDonationCard
                currentAccount = {currentAccount}
                donationAddress = {donationAddress}
                setDonationAddress = {setDonationAddress}
                donate = {donate}
                />
          </Col>
        </Row>
        <Row>
          <Col>
            <CustomFooter/>
          </Col>
        </Row>

       {/*
        * If there is no currentAccount render this button
     
        <div className="mainContainer">
          <div className="dataContainer">
            
          
            {currentAccount && (
              <div className="main_form">
                <label>Message</label>
                <input value={message} type="text" onInput={e => setMessage(e.target.value)}/>
                <label>Amount to be donated (minimum 0.00015 ETH)</label>
                <input value={amount} type="number" type="number" min="0" step="any" onInput={e => setAmount(e.target.value)}/>
                <button className="waveButton" onClick={wave}>
                  Leave a message
                </button>
              </div>
            )}
            
            
         
            {!currentAccount && (
              <div className="main_content">
              <button className="waveButton" onClick={connectWallet}>
                Connect Wallet
              </button>
              </div>
            )}

            {currentAccount && (
            <div className="main_content">
            <table>
            <caption>SmartContract information</caption>
            <thead>
            <tr>
            <th scope="col">Total messages</th>
            <th scope="col">Total balance (ETH)</th>
            </tr>
            </thead>
            <tbody>
              <tr>
                <td>{totalWaves}</td>
                <td>{ethers.utils.formatEther(totalBalance)}</td>
              </tr>
            </tbody>
            </table>
            <p className="link"><strong>Contract address:</strong>  {contractAddress}</p>
            <p className="link">Check transactions in <a href="https://rinkeby.etherscan.io/address/0x172b30fa35aF715405Cc134E16Eda45d0763Bc8B">Etherscan</a>.</p>
            <table>
            <caption>Users donations</caption>
            <thead>
            <tr>
            <th scope="col">Message</th>
            <th scope="col">Donated (ETH)</th>
            <th scope="col">User</th>
            <th scope="col">Time</th>
            </tr>
            </thead>
            <tbody>
            {allWaves.map((wave, index) => {
              return (
                <tr key={index}>
                  <td>{wave.message}</td>
                  <td>{ethers.utils.formatEther(wave.amount.toNumber())}</td>
                  <td>{wave.address.substring(0,5) + ' ... ' + wave.address.substring(wave.address.length - 5 ,wave.address.length)}</td>
                  <td>{wave.timestamp.toLocaleString("en-US")}</td>
                
                </tr>)
            })}

            </tbody>
            </table>
            </div>

            )}

            
          </div>
        </div>
     */}
    </Container>
  );
}
