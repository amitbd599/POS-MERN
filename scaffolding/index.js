const app = require("./app");
const PORT = 5000;
console.warn = () => {};
console.error = () => {};
app.listen(PORT, function () {
  console.log("App Run @5000");
});
