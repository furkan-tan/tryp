const id = require("uuid");
const { default: TripStatus } = require("./TripStatus");

class Driver {
  constructor(name, surname, email, phone, drivingLicense) {
    this.id = id.v4();
    (this.name = name),
      (this.surname = surname),
      (this.email = email),
      (this.phone = phone),
      (this.profilePicture =
        "https://readyrefrigeration.ca/sites/default/files/styles/headshot/adaptive-image/public/nobody.jpg"),
      (this.drivingLicense = drivingLicense),
      (this.ratingList = []),
      (this.rating = 0),
      (this.currentTrip = null),
      (this.upcomingTrips = []),
      (this.tripHistory = []),
      (this.vehicles = []);
  }

  addVehicle(type, brand, model, year) {
    const vehicle = null;
    if (type === "Car") {
      vehicle = new Car(brand, model, year);
    } else if (type === "Van") {
      vehicle = new Van(brand, model, year);
    } else if (type === "Motorcycle") {
      vehicle = new Motorcycle(brand, model, year);
    }
    this.vehicles.push(vehicle);
  }
  removeVehicle(vehicle) {
    const index = this.vehicles.findIndex((item) => item.id === vehicle.id);
    this.splice(index, 1);
  }

  createTrip(vehicle, tripDate, from, destination, price) {
    let trip = new Trip(this, vehicle, tripDate, from, destination, price);
    trip.status = TripStatus.AVAILABLE;
    this.upcomingTrips.push(trip);
  }

  editTrip(trip, tripDate, from, destination, price) {
    const index = this.upcomingTrips.findIndex((item) => item.id === trip.id);
    this.upcomingTrips[index].tripDate = tripDate;
    this.upcomingTrips[index].from = from;
    this.upcomingTrips[index].destination = destination;
    this.upcomingTrips[index].price = price;
  }

  cancelTrip(trip) {
    const index = this.upcomingTrips.findIndex((item) => item.id === trip.id);
    this.trips[index].status = TripStatus.CANCELLED;
    //this.upcomingTrips.filter(item=>item!==trip);
  }

  ratePassenger(trip, passenger, rate) {
    if (
      trip.passengers.find(passenger) &&
      trip.status === TripStatus.FINISHED
    ) {
      if (passenger.ratingList.length === 20) {
        passenger.ratingList.pop();
      }
      passenger.ratingList.push(rate);
    }
    passenger.rating =
      passenger.ratingList.reduce((a, b) => a + b, 0) / ratingList.length;
  }

  startTrip(trip) {
    trip.status = TripStatus.IN_PROGRESS;
    const index = this.upcomingTrips.findIndex((t) => t.id === trip.id);
    this.currentTrip = this.upcomingTrips[index];
    this.upcomingTrips.splice(index, 1);
  }

  completeTrip() {
    this.currentTrip.status = TripStatus.FINISHED;
    this.tripHistory.push(this.currentTrip);
    this.currentTrip = null;
  }
}

module.exports = Driver;
