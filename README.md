# BICONOMY Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Steps:

1) create react app
```
npx create-react-app biconomy-react
```

2) install ether and hardhat dependencies
```
npm install ethers hardhat @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers
```

3) install hardhat sample project
```
npx hardhat
```

4) hardhat.config.js

5) compile to create contract abi inside artifact folder
```
npx hardhat compile
```

6) start node
```
npx hardhat node
```

7) install env 
```
npm i @symblox/hardhat-dotenv
```

8) for verifying contract 
```
npm install @nomiclabs/hardhat-etherscan
```


For GSN
```
yarn add @opengsn/contracts
```


import "@opengsn/contracts/src/BaseRelayRecipient.sol";

can also try importing
import "github.com/opengsn/forwarder/blobl/master/contracts/BaseRelayReceipient.sol";



is BaseRelayRecipient


Installing clientside sdk for biconomy
```
npm install @biconomy/mexa
```

npm i ethereumjs-util

npm i stream-browserify

npm i eth-sig-util

npm i cipher-base


npm i @material-ui/core

below both didnt help
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/material @mui/styled-engine-sc styled-components

$ yarn add @material-ui/core@next