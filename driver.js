const Web3 = require('web3')
const web3 = new Web3(process.env.NODE_ENDPOINT);

const fs = require('fs');
const paxgImplementation = JSON.parse(fs.readFileSync('./PAXGImplementation.json'));
const myNetwork = '5777'

const paxContract = new web3.eth.Contract(
    paxgImplementation.abi,
    paxgImplementation.networks[myNetwork].address
);

var accounts; 

//Get context
const getContext = async () => {
    accounts = await web3.eth.getAccounts();
}

// Unpause the contract
const unpause = async () => {
    try {
        console.log('unpause...');
        let res = await paxContract.methods.unpause().send({from: accounts[0]});
        console.log(res)
    } catch(err) {
        if(err.message.indexOf('revert already unpaused') == -1) {
            throw err
        } else {
            console.log('previously unpaused');
        }
    }
}

// Set the supply
const increaseSupply = async () => {
    console.log('increase supply');
    let res = await paxContract.methods.increaseSupply(10000).send({from: accounts[0]});
    console.log(res);

    console.log('total supply: ');
    res = await paxContract.methods.totalSupply().call();
    console.log(res);
}

// Burn through it transfering from the owning account to the other accounts
const  randomIntFromInterval = (min, max) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}


const divideTheLoot = async () => {
    for(let i = 0; i < 1000; i++) {
        let accountIdx = randomIntFromInterval(1, accounts.length - 1);
        console.log(`send 10 to account ${accountIdx}`)
        let res = await paxContract.methods.transfer(accounts[accountIdx], 10).send({from: accounts[0]});
        console.log(res);

        res = await paxContract.methods.balanceOf(accounts[accountIdx]).call({from: accounts[0]});
        console.log(`new balanced is ${res}`);
    }
}


// Main
const main = async () => {
    await getContext();
    await unpause();
    await increaseSupply();
    await divideTheLoot();
    web3.currentProvider.connection.close();
}

main();