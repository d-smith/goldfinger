# goldfinger

Playing around with the paxos gold contract

Set up:

* Clone the paxg contract - https://github.com/paxosglobal/paxos-gold-contract

* Set your truffle-config.js development network settings appropriately, for examle for ganache

```
module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    development: {
      host: '127.0.0.1',
      //port: 8545, // ganache-cli
      port: 7545,
      network_id: '*', // Match any network id
  //    gas: 6700000,
  //    gasPrice: 0x01
    },
```

* deploy the contract via `truffle migrate`
* copy PAXGImplementation.json from build/contracts into this project, e.g.
`cp ../paxos-gold-contract/build/contracts/PAXGImplementation.json .`
* check the network id you'll source the contract address from against the PAXGImplementation.json you just copied, true up the script as needed

* Set the NODE_ENDPOINT environment variable to point to your Ethereum node address, e.g. `export NODE_ENDPOINT=ws://localhost:7545`
* Set the network id environment variable, e.g. `export NETWORK_ID=5777`
* Set the contract json location, e.g. `export CONTRACT_JSON=../paxos-gold-contract/build/contracts/PAXGImplementation.json`
* run it, e.g. node driver.js

* The event processor can be run similarly, e.g.

```
export NODE_ENDPOINT=ws://localhost:7545
export NETWORK_ID=5777
export CONTRACT_JSON=../paxos-gold-contract/build/contracts/PAXGImplementation.json
node events.js
```



In truffle console (paxg project)

let instance = await PAXGImplementation.deployed()