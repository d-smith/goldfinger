const Web3 = require('web3')
const web3 = new Web3("ws://localhost:7545");

web3.eth.getAccounts()
    .then(a=> {
        console.log(a)
        web3.currentProvider.connection.close();
    })
    .catch(err => console.error(err));

    