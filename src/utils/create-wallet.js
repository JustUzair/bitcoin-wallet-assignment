const { input, readline } = require("./cmd-input-prompt");
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

exports.CreateWallet = async () => {
  const name = await input("What's your name? ");
  if (name.length == 0) {
    console.log("Error 💥💥: Name cannot be empty!!");

    return;
  }
  const mnemonic = bip39.generateMnemonic().toString();

  const seed = bip39.mnemonicToSeedSync(mnemonic);
  const root = bip32.fromSeed(seed, bitcoin.networks.testnet);
  const walletPath = `m/44'/0'/0'/0/0`;
  const childNode = root.derivePath(walletPath);
  const keyPair = ECPair.fromPrivateKey(childNode.privateKey, {
    network: bitcoin.networks.testnet,
  });

  const { address } = bitcoin.payments.p2pkh({
    pubkey: keyPair.publicKey,
    network: bitcoin.networks.testnet,
  });
  console.log(" Wallet Address : ", address);
  console.log(" Mnemonic : ", mnemonic);

  const walletInfo = {
    mnemonic,
    address: [address],
    accounts: 1,
  };
  if (wallets[name] == undefined) {
    wallets[name] = [walletInfo];
    console.log(`Wallet created with name: ${name}`);
  } else {
    wallets[name].push(walletInfo);
    console.log(`User Exists, new wallet info pushed for user "${name}"`);
  }

  fs.writeFileSync(walletJSONPath, JSON.stringify(wallets));
};
