const { input, readline } = require("./cmd-input-prompt");
const dotenv = require("dotenv");
dotenv.config({
  path: "./config.env",
});
const axios = require("axios");

exports.GetAllWalletTx = async () => {
  const address = await input("Enter your wallet address :  ");

  try {
    //   const url = `https://api.blockcypher.com/v1/btc/test3/addrs/${address}/full?token=${process.env.BLOCKCYPHER_API_KEY}`;
    const url = `https://api.blockcypher.com/v1/btc/test3/addrs/${address}/full?token=${process.env.BLOCKCYPHER_API_KEY}`;
    const response = await axios.get(url);

    if (response.status === 200) {
      // console.log("Transactions:", response.data.txs);

      const { txs } = response.data;
      if (txs.length == 0) {
        console.log(`No TX found on ${address} address`);
        readline.close();
        return;
      }
      txs.map((tx) => {
        // console.log(tx);
        console.log(
          "---------------------------------------------------------------"
        );
        console.log(`TX Hash : ${tx.hash}`);
        console.log(`TX Fee : ${tx.fees}`);

        console.log(
          `TX received at: ${new Date(tx.received).toLocaleString()}`
        );
        console.log(
          `TX confirmed at: ${new Date(tx.confirmed).toLocaleString()}`
        );
        console.log(`TX preference : ${tx.preference}`);
        console.log(`TX block confirmations : ${tx.confirmations}`);

        console.log(
          "---------------------------------------------------------------"
        );
      });
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
  readline.close();
};
