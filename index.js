const express = require("express");
const bodyParser = require("body-parser");

const indexRouter = require("./routers/index");
const passengersRouter = require("./routers/passengers");
const driversRouter = require("./routers/drivers");
const searchRouter = require("./routers/search");
const errorRouter = require("./routers/error");
const tripsRouter = require("./routers/trips");

require("./mongo-connection");

const app = express();

app.use(bodyParser.json());

app.set("view engine", "pug");

app.use("/", indexRouter);
app.use("/passengers", passengersRouter);
app.use("/drivers", driversRouter);
app.use("/search", searchRouter);
app.use("/trips", tripsRouter);
app.use("/error", errorRouter);

app.all("*", (req, res) => {
  //res.send("Not Found... You are directing to homepage").render("index");

  res.redirect("/error");
});

app.listen(3000, () => {
  console.log("started listening port 3000");
});
