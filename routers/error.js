const router = require("express").Router();

router.get("/", (req, res) => {
  let counter = 5;

  res.render("error", { counter });
});

module.exports = router;
