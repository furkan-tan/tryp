function printTripHistory(object) {
  object.tripHistory.forEach((trip) => trip.printTrip());
}
function printUpcomingTrips(object) {
  object.upcomingTrips.forEach((trip) => trip.printTrip());
}
function printCurrentTrip(object) {
  object.currentTrip.printTrip();
}

module.exports = { printCurrentTrip, printTripHistory, printUpcomingTrips };
