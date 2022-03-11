const Web3 = require('web3')
const web3 = new Web3("ws://localhost:7545");
const util = require('util');

const fs = require('fs');
const paxgImplementation = JSON.parse(fs.readFileSync('./PAXGImplementation.json'));
const myNetwork = '5777'

const paxContract = new web3.eth.Contract(
    paxgImplementation.abi,
    paxgImplementation.networks[myNetwork].address
);

const doIt = async () => {
    let a = await web3.eth.getAccounts();
    //console.log(a);
    //console.log(contract.abi);
    //console.log(contract.networks);

    
    //console.log(paxContract.methods.symbol.call())
    let r = await paxContract.methods.symbol().call();
    console.log(r)

    let r2 = await paxContract.methods.balanceOf(a[0]).call({from: a[0]});
    console.log(r2)

    let r3 = await paxContract.methods.transfer(a[1], 10).send({from: a[0]});
    console.log(r3);

    let r4 = await paxContract.methods.balanceOf(a[0]).call({from: a[0]});
    console.log(r4)
}


const main = async () => {
    await doIt();
    web3.currentProvider.connection.close();
}

main();


    