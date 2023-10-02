export class Column {
  #car = null;
  #amountFuel = 0;
  constructor(type, speed) {
    this.speed = speed;
    this.type = type;
  }

  set car(car) {
    this.#car = car;
  }

  get car() {
    return this.#car;
  }

  set amountFuel(amount) {
    this.#amountFuel = amount;
  }
  get amountFuel() {
    return this.#amountFuel;
  }
}
