import Web3 from './web3.min';
import {insuranceABI, billABI, billFactoryABI, coverableCases} from './contracts';

var web3 = new Web3(Web3.givenProvider || "ws://localhost:8546");

var billFactory = new web3.eth.Contract(billFactoryABI, "0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84");

// TEST

const testPrivateKey = "";
var tx = {
    from: "0x465EF6e3e3316968792a9a448bdDa70455aAF36b",
    to: "0x00c31293153d95f14FaC87a7EF2D45Bd18DeB4e2",
    value: 10000000000000,
    gas: 0
}

web3.eth.accounts.signTransaction(tx, testPrivateKey).then(web3.eth.sendSignedTransaction)


