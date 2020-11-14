import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { sUSDaddr } from './consts';
import { minErc20 } from './abi';
import Web3 from 'web3';

function App() {
  //let web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
  //const contract = web3.eth.contract(minErc20).at(sUSDaddr);
  const [account, setAccount] = useState('');
  const [balance, setBallance] = useState('');
  const [decimals, setDecimals] = useState('');
  const web3 = new Web3(Web3.givenProvider);
  
  
  const handleConnect = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(accounts[0]);
  }

  const getBalance = async () => {
    let contract = new web3.eth.Contract(minErc20, sUSDaddr);
    contract.methods.balanceOf(account).call().then(balance => {
      setBallance(balance);
    })
    contract.methods.decimals().call().then(decimals => {
      setDecimals(decimals)
    })
  }

  useEffect(() => {
    if (account !== '') {
      getBalance();
    }
  }, [account])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Address: {account}</p>
        <p>
          balance: {balance / (10**decimals)} sUSD
        </p>
        <button
          className="App-link"
          onClick = {handleConnect}
        >
          Connect Wallet
        </button>
      </header>
    </div>
  );
}

export default App;
