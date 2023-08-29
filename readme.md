# bitcoin-wallet-assignment

## Authors

- [@JustUzair](https://www.github.com/JustUzair)

## Implemented Features using Programming

- Create wallet
- Import Wallet
    - If the user has multiple wallet address in the same account, import and return all the wallet addresses
- List all wallets under a particular user
- Get Balance of a given wallet address
- Get all tx in simplified form for a given wallet address
- Generate unused wallet address
    - If user already has an address in the account with no previous tx histories, return that address
    - If user has no 'tx-free' accounts, generate and add the address to the user's account


## Installation and Working of the Project

The project is developed using node version 20
To install and run this this project

```bash
    git clone https://github.com/JustUzair/bitcoin-wallet-assignment.git
    cd bitcoin-wallet-assignment
    npm install
    npm start
```

NOTE : If you encounter any issues while installing the dependencies try installing them using

```bash
    npm install --legacy-peer-deps
```


## Environment Variables

To run this project, you will need to add the following environment variables to your config.env file

### NOTE - For testing purposed, the "`config.example`" file is already provided rename it to "`config.env`" and it should work just fine

`BLOCKCYPHER_API_KEY`=`YOUR_BLOCKCYPHER_API_KEY`
