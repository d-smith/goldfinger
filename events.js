const Web3 = require('web3')
const web3 = new Web3("ws://localhost:7545");

const fs = require('fs');
const paxgImplementation = JSON.parse(fs.readFileSync('./PAXGImplementation.json'));
const myNetwork = '5777'

const paxContract = new web3.eth.Contract(
    paxgImplementation.abi,
    paxgImplementation.networks[myNetwork].address
);


paxContract.events.allEvents({
    fromBlock: 0
  }, function (error, event) {
    if (error) console.log(error)
    console.log(event)
  })