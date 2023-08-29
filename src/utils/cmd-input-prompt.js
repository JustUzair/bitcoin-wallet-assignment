const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

exports.readline = readline;

exports.input = function (prompt) {
  return new Promise((callbackFn, errorFn) => {
    readline.question(
      prompt,
      (uinput) => {
        callbackFn(uinput);
      },
      () => {
        errorFn();
        readline.close();
      }
    );
  });
};
