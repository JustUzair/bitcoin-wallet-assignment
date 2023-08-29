const { input, readline } = require("./cmd-input-prompt");

const path = require("path");
const wallets = require(path.join(__dirname, "../../wallets.json"));

exports.ListWallets = async () => {
  const name = await input("Enter your name associated to the wallet:  ");

  const userWallets = wallets[name];
  if (userWallets == undefined) {
    console.log("ERROR 💥💥: No wallets associated to this user were found");

    return;
  }
  // console.log(userWallets);
  userWallets.map((wallet, idx) => {
    console.log(`-------- Wallet - ${idx + 1}--------`);
    wallet.address.map((addr) => {
      console.log(`\tAddress : ${addr} `);
    });
  });
};
