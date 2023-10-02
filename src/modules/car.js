export class Car {
  #maxTank;//сокрытие данных maxTank

  constructor(brand, model, maxTank) {
    this.brand = brand;
    this.model = model;
    this.#maxTank = maxTank;
    this.nowTank = Math.floor(Math.random() * maxTank);
  }

  getTitle() {
    return `${this.brand} ${this.model}`;
  }

  setModel(model) {
    this.model = model;
    return this;
  }

  get needPetrol() {
    return this.#maxTank - this.nowTank;
  }

  fillUp() {
    this.nowTank = this.#maxTank;
    return this;
  }

  get maxTank() {
    return this.#maxTank;
  }

  set maxTank(data) {
    console.log(`нельзя поменять значение на ${data}`);
  }

  static string = 'Новый автомобиль ';

  static logger(str) {
    console.log(str);
  }

  static from({brand, model, maxTank}) {
    const car = new Car(brand, model, maxTank);
    Car.logger(Car.string + car.getTitle());
    return car;
  }
}

// export const opel = new Car('Opel', 'Crossland', 45);

// const bmv = Car.from({
//   brand: 'BMV',
//   model: 'X7',
//   maxTank: 80,
// })

export class PassangerCar extends Car {
  typeCar = 'passanger';
  constructor(brand, model, maxTank, typeFuel = 'petrol') {
    super(brand, model, maxTank);
    this.typeFuel = typeFuel;
  }
}

export class Truck extends Car {
  typeCar = 'Truck';
  constructor(brand, model, maxTank, typeFuel = 'diesel') {
    super(brand, model, maxTank);
    this.typeFuel = typeFuel;
  }
}

