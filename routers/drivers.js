const router = require("express").Router();
const driverDatabase = require("../database/driver-database");

router.get("/", async (req, res) => {
  const drivers = await driverDatabase.load();
  res.render("drivers", { drivers });
});

router.get("/:driverId", async (req, res) => {
  const driver = await driverDatabase.findBy("id", req.params.driverId);
  res.render("driver", { driver });
});

router.post("/:driverId", async (req,res)=>{
    
})

module.exports = router;
