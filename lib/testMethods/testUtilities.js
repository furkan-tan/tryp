const app = require("../../index");
const request = require("supertest")(app);
const faker = require("faker");

async function createDriver() {
  const driverToCreate = {
    name: faker.name.firstName(),
    surname: faker.name.lastName(),
    email: `Test${faker.internet.email()}`,
    phone: `+1 ${faker.phone.phoneNumber("(!##)-!## ####")}`,
    drivinglicense: "4564564456",
  };

  console.log("Driver Test Data Created:", driverToCreate);

  const response = await request
    .post("/drivers")
    .send(driverToCreate)
    .expect(200);

  return response.body;
}

async function createTrip() {
  const tripToCreate = {
    //TODO
  };
}

async function createCar() {
  const driverToCreate = {
    name: faker.name.firstName(),
    surname: faker.name.lastName(),
    email: `Test${faker.internet.email()}`,
    phone: `+1 ${faker.phone.phoneNumber("(!##)-!## ####")}`,
    drivinglicense: "4564564456",
  };

  console.log("Driver Test Data Created:", driverToCreate);

  const response = await request
    .post("/drivers")
    .send(driverToCreate)
    .expect(200);

  const driverId = response.body._id;

  const carToCreate = {
    type: "Car",
    brand: "Volvo",
    model: "X60",
    year: "2012",
  };

  console.log("Car Test Data Created:", carToCreate);

  const response2 = await request
    .post(`/drivers/${driverId}/vehicles`)
    .send(carToCreate)
    .expect(200);

  return response2.body;
}

module.exports = { createDriver, createCar };
