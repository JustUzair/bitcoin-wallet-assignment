const { input, readline } = require("./cmd-input-prompt");

const ecc = require("tiny-secp256k1");
const bip39 = require("bip39");
const bitcoin = require("bitcoinjs-lib");
const { ECPairFactory } = require("ecpair");
const { BIP32Factory } = require("bip32");
const path = require("path");
const bip32 = BIP32Factory(ecc);
const ECPair = ECPairFactory(ecc);
const wallets = require(path.join(__dirname, "../../wallets.json"));
exports.ImportWallet = async () => {
  const userName = await input("Enter your username : ");
  if (wallets[userName] == undefined) {
    console.log("No user for that username exists, Please create a new wallet");
    return;
  }
  const mnemonic = await input("Enter your mnemonic to import the wallet: ");
  if (mnemonic.length == 0 || mnemonic.split(" ").length != 12) {
    console.log("ERROR 💥💥: Please enter a 12 word mnemonic");

    return;
  }
  const found = wallets[userName].find((wallet) => {
    return wallet.mnemonic == mnemonic;
  });
  if (found == undefined) {
    console.log(
      "ERROR 💥💥: Combination of the given username and mnemonic does not exist"
    );

    return;
  }
  // console.log(found);
  const userWalletAddresses = [];
  for (let i = 0; i < found.accounts; i++) {
    const seed = bip39.mnemonicToSeedSync(mnemonic);
    const root = bip32.fromSeed(seed, bitcoin.networks.testnet);
    const walletPath = `m/44'/0'/0'/0/${i}`;
    const childNode = root.derivePath(walletPath);
    const keyPair = ECPair.fromPrivateKey(childNode.privateKey, {
      network: bitcoin.networks.testnet,
    });

    const { address } = bitcoin.payments.p2pkh({
      pubkey: keyPair.publicKey,
      network: bitcoin.networks.testnet,
    });
    userWalletAddresses.push(address);
  }

  console.log(
    " Your Wallet Address(s) for the mnemonic: ",
    userWalletAddresses.join(", ")
  );
};
