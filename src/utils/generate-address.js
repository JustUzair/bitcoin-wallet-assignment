const ecc = require("tiny-secp256k1");
const bip39 = require("bip39");
const bitcoin = require("bitcoinjs-lib");
const path = require("path");
const fs = require("fs");
const { ECPairFactory } = require("ecpair");
const { BIP32Factory } = require("bip32");

const bip32 = BIP32Factory(ecc);
const ECPair = ECPairFactory(ecc);
const wallets = require(path.join(__dirname, "../../wallets.json"));
const walletJSONPath = path.join(__dirname, "../../wallets.json");
const dotenv = require("dotenv");
dotenv.config({
  path: "./config.env",
});
const axios = require("axios");
const { input, readline } = require("./cmd-input-prompt");

async function findAsync(arr, asyncCallback) {
  const promises = arr.map(asyncCallback);
  const results = await Promise.all(promises);
  const index = results.findIndex((result) => result);
  return arr[index];
}

async function createAccountFromMnemonic(mnemonic, userName, index) {
  const seed = bip39.mnemonicToSeedSync(mnemonic);
  const root = bip32.fromSeed(seed, bitcoin.networks.testnet);
  const walletPath = `m/44'/0'/0'/0/${wallets[userName][index].accounts}`;
  const childNode = root.derivePath(walletPath);
  const keyPair = ECPair.fromPrivateKey(childNode.privateKey, {
    network: bitcoin.networks.testnet,
  });

  const { address } = bitcoin.payments.p2pkh({
    pubkey: keyPair.publicKey,
    network: bitcoin.networks.testnet,
  });
  wallets[userName][index].address.push(address);
  wallets[userName][index].accounts += 1;
  console.log("New Wallet Address with no prev tx: ", address);
  fs.writeFileSync(walletJSONPath, JSON.stringify(wallets));
  return;
}
exports.GenerateUnusedAddress = async () => {
  const userName = await input("Enter your username : ");
  if (wallets[userName] == undefined) {
    console.log("No user for that username exists, Please create a new wallet");
    return;
  }
  const mnemonic = await input("Enter your mnemonic to import the wallet: ");
  const userWallets = wallets[userName];
  const userWalletsLength = userWallets.length;

  userWallets.map(async (wallet, index) => {
    if (wallet.mnemonic == mnemonic) {
      //   console.log(wallet.address);
      const unusedAddress = await findAsync(
        wallet.address,
        async function (addr) {
          const url = `https://api.blockcypher.com/v1/btc/test3/addrs/${addr}/full?token=${process.env.BLOCKCYPHER_API_KEY}`;
          const response = await axios.get(url);

          const { txs } = await response.data;

          //   console.log(`TX LENGTH : `, txs.length);
          return txs.length <= 0;
        }
      );
      if (unusedAddress == undefined) {
        createAccountFromMnemonic(mnemonic, userName, index);
      } else {
        console.log("Un-used address found, please use it : ", unusedAddress);
      }
    }
  });
  readline.close();
};
