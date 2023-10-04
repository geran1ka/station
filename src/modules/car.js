export class Car {
  #maxTank;//сокрытие данных maxTank

  constructor(brand, model, maxTank) {
    const proto = Object.getPrototypeOf(this);
    if(proto.constructor === Car) {
      throw new Error('Abstract class');
    }

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

  getTitle() {
    return `Автомобиль${this.brand} ${this.model}`;
  }
}

export class Truck extends Car {
  typeCar = 'Truck';
  constructor(brand, model, maxTank, typeFuel = 'diesel') {
    super(brand, model, maxTank);
    this.typeFuel = typeFuel;
  }

  getTitle() {
    return `Грузовик${this.brand} ${this.model}`;
  }
}

// console.clear();
// console.log(new PassangerCar('ВАЗ', '2101', 30));

// const singelton = () => {
//   class Singelton {
//     constructor(x) {
//       if (Singelton.instance) {
//         return Singelton.instance;
//       }

//       this.a = 5;
//       this.b = x;
//       Singelton.instance = this;
//     }
//   }
//   console.log(new Singelton(35));
// console.log(new Singelton(5));
// console.log(new Singelton(3));
// }
// singelton()



