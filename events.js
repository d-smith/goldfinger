const Web3 = require('web3')
const web3 = new Web3(process.env.NODE_ENDPOINT);

const fs = require('fs');
const paxgImplementation = JSON.parse(fs.readFileSync(process.env.CONTRACT_JSON));
const myNetwork = process.env.NETWORK_ID;


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