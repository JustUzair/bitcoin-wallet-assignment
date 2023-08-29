const { CreateWallet } = require("./src/utils/create-wallet");
const { ImportWallet } = require("./src/utils/import-wallet");
const { ListWallets } = require("./src/utils/list-wallets");
const { GetBalance } = require("./src/utils/get-balance");
const { GetAllWalletTx } = require("./src/utils/get-txns");
const { GenerateUnusedAddress } = require("./src/utils/generate-address");
const { input, readline } = require("./src/utils/cmd-input-prompt");

async function main() {
  while (
    choice =
    parseInt(
      await input(
        `1.Create Wallet\n2.Import Wallet\n3.List all wallets\n4.Get Balance\n5.Get Wallet TXs\n6.Generate unused wallet address\n Your choice: `
      )
    )
  ) {
    console.log(choice)
    switch (choice) {
      case 1:
        CreateWallet()
        break;
      case 2:
        ImportWallet()
        break;
      case 3:
        ListWallets()
        break;
      case 4:
        GetBalance();
        break;
      case 5:
        GetAllWalletTx();
        break;
      case 6:
        GenerateUnusedAddress()
        break;
      case 7:
        readline.close();
        return;
      default:
        console.log("Invalid choice...")
    }
  }
  readline.close();
}

main();
