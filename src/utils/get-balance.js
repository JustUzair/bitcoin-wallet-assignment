const dotenv = require("dotenv");
dotenv.config({
  path: "./config.env",
});
const axios = require("axios");
const { input, readline } = require("./cmd-input-prompt");

exports.GetBalance = async () => {
  try {
    const walletAddress = await input("Enter your wallet address:  ");
    if (
      walletAddress.length == 0 ||
      walletAddress.length < 26 ||
      walletAddress > 35
    ) {
      console.log("ERROR 💥💥: Please enter a valid wallet address");
      readline.close();
      return;
    }
    const { data } = await axios.get(
      `https://api.blockcypher.com/v1/btc/test3/addrs/${walletAddress}/balance?token=${process.env.BLOCKCYPHER_API_KEY}`
    );

    console.log(
      `Wallet Balance : ${data.balance} sathoshis or ${
        data.balance / 100000000
      } BTC`
    );
  } catch (err) {
    console.log(`Error 💥💥 : ${err.response.data.error}`);
  }
  readline.close();
};
