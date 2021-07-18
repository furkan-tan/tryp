const printTripHistory = (object) =>
  object.tripHistory.forEach((trip) => trip.print());
const printUpcomingTrips = (object) =>
  object.upcomingTrips.forEach((trip) => trip.print());
const printCurrentTrip = (object) => object.currentTrip.print();
