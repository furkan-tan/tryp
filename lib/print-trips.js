const colors = require("colors");

function printTrip(trip) {
  console.log(
    `${colors.magenta(
      trip.driver.name
    )} drives from ${colors.bgYellow.bold.white(
      trip.from
    )} to ${colors.bgBlue.bold.white(trip.destination)}.`
  );
  console.log(`Passengers for this trip:`);
  if (trip.passengers.length === 0) {
    console.log("Nobody has booked this trip yet.".yellow);
  }
  trip.passengers.forEach((item, index) =>
    console.log(`${index + 1}-${colors.red(item.name)}`)
  );
}

function printTripHistory(object) {
  if (object.tripHistory.length === 0) {
    return console.log(
      `${colors.magenta(object.name)} has not completed any trip yet`
    );
  }
  object.tripHistory.forEach(printTrip);
}
function printUpcomingTrips(object) {
  if (object.upcomingTrips.length === 0) {
    if (object.hasOwnProperty("cards")) {
      return console.log(
        `${colors.red(object.name)} has not booked any trip yet`
      );
    } else {
      return console.log(
        `${colors.magenta(object.name)} has not created any trip yet`
      );
    }
  }
  object.upcomingTrips.forEach(printTrip);
}
function printCurrentTrip(object) {
  if (object.currentTrip === null) {
    return console.log(`${colors.magenta(object.name)} is not in a trip now`);
  }
  console.log(`${colors.magenta(object.name)} is in a trip right now:`);
  printTrip(object.currentTrip);
}

module.exports = { printCurrentTrip, printTripHistory, printUpcomingTrips };
