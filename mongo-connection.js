const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/tryp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("useFindAndModify", false);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("we are connected to mongodb!");
});
