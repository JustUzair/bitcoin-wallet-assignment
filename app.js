const { CreateWallet } = require("./src/utils/create-wallet");
const { ImportWallet } = require("./src/utils/import-wallet");
const { ListWallets } = require("./src/utils/list-wallets");
const { GetBalance } = require("./src/utils/get-balance");
const { GetAllWalletTx } = require("./src/utils/get-txns");
const { GenerateUnusedAddress } = require("./src/utils/generate-address");
const { input, readline } = require("./src/utils/cmd-input-prompt");

async function main() {
  const choice = parseInt(
    await input(
      `\n\n1.Create Wallet\n2.Import Wallet\n3.List all wallets\n4.Get Balance\n5.Get Wallet TXs\n6.Generate unused wallet address\n7.Exit\nYour choice: `
    )
  );
  if (choice < 1 || choice > 7) console.log("Invalid choice...");

  if (choice == 7) {
    readline.close();
    return;
  }

  if (choice == 1) await CreateWallet();
  else if (choice == 2) await ImportWallet();
  else if (choice == 3) await ListWallets();
  else if (choice == 4) await GetBalance();
  else if (choice == 5) await GetAllWalletTx();
  else if (choice == 6) await GenerateUnusedAddress();

  await main();
}

main();
