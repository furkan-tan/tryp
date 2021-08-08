const app = require("../index");
const request = require("supertest")(app);

const { createDriver, createCar } = require("../lib/testMethods/testUtilities");

test.skip("Create new driver", async () => {
  const response = await createDriver();

  console.log(response);
});

test("Create new car with a new driver", async () => {
  const response2 = await createCar();

  console.log(response2);
});
