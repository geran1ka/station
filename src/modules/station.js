import {Column} from './column';

export class Station {
  #queue = [];
  #filling = [];
  #ready = [];

  constructor(typeStation) {
    this.typeStation = typeStation;
  }

  checkOptionStation(obj) {
    if (!obj.count) {
      obj.count = 1;
    }

    if (!obj.speed) {
      obj.speed = 5;
    }
  }

  get filling() {
    return this.#filling;
  }

  get queue() {
    return this.#queue;
  }

  init() {
    setInterval(() => {
      this.checkQueueToFilling();
    }, 1000);
  }

  createColumns() {
    for (const optionStation of this.typeStation) {
      this.checkOptionStation(optionStation);
      for (let i = 0; i < optionStation.count; i++) {
        this.#filling.push(new Column(optionStation.type, optionStation.speed));
      }
    }
  }

  checkQueueToFilling() {
    if (this.#queue.length) {
      for (let i = 0; i < this.#queue.length; i++) {
        for (let j = 0; j < this.#filling.length; j++) {
          if (!this.#filling[j].car &&
            this.#queue[i].typeFuel === this.#filling[j].type) {
            this.#filling[j].car = this.#queue.splice(i, 1)[0];
            this.fillingGo(this.#filling[j]);
            break;
          }
        }
      }
    }
  }

  fillingGo(column) {
    const car = column.car;
    const needPetrol = car.needPetrol;
    let nowTank = car.nowTank;
    let amountOfFuelFilled = 0;
    column.amountFuel = 0;

    const timerId = setInterval(() => {
      nowTank += column.speed;
      if (amountOfFuelFilled + column.speed < needPetrol) {
        amountOfFuelFilled += column.speed;
      } else {
        amountOfFuelFilled = needPetrol;
      }

      column.amountFuel = amountOfFuelFilled;

      if (nowTank >= car.maxTank) {
        clearInterval(timerId);
        const total = needPetrol;
        car.fillUp();
        column.car = null;
        this.leaveClient({car, total});
      }
    }, 1000);
    console.log(`заправляем ${JSON.stringify(column.car)}`);
  }

  leaveClient({car, total}) {
    this.#ready.push(car);
  }

  addCarQueue(car) {
    this.#queue.push(car);
  }
}
