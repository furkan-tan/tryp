class Card {
  constructor(name, cardNumber, expirationMonth, expirationYear, cvv, type) {
    this.name = name;
    this.cardNumber = cardNumber;
    this.expirationMonth = expirationMonth;
    this.expirationYear = expirationYear;
    this.cvv = cvv;
    this.type = type;
  }
}
module.exports = Card;
