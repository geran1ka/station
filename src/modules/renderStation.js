import {Station} from './station';

export class RenderStation extends Station {
  constructor(app, typeStation) {
    super(typeStation);
    this.app = app;
  }

  init() {
    super.init();
    super.createColumns();

    this.wrapper = document.createElement('div');
    this.wrapper.style.cssText = `
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: minmax(100px, 1fr);
      align-items: top;
      justify-content: space-between;
    `;
    this.render();
  }

  render() {
    this.wrapper.textContent = '';
    const queueList = this.createQueue();
    const columns = this.createColumns();
    this.wrapper.append(queueList, columns);
    document.querySelector(this.app).append(this.wrapper);
  }

  checkQueueToFilling() {
    super.checkQueueToFilling();
    this.render();
  }

  addCarQueue(car) {
    super.addCarQueue(car);
    this.render();
  }

  createQueue() {
    const list = document.createElement('ul');
    this.queue.forEach(car => {
      const item = document.createElement('li');
      item.textContent = `${car.getTitle()}`;
      item.classList.add(car.typeCar);
      list.append(item);
    });
    return list;
  }

  createColumns() {
    const columns = document.createElement('ul');
    columns.classList.add('columns');

    this.filling.forEach(column => {
      const itemColumn = document.createElement('li');
      itemColumn.classList.add(column.type);

      const columnAmountFuel = this.createElem('p', 'Заправлено ', itemColumn);
      this.createElem('span', column.amountFuel, columnAmountFuel);
      this.setTimer(column, columnAmountFuel, 1000);
      this.columnName(column, itemColumn);
      this.checkColumnCar(column, itemColumn);
      columns.append(itemColumn);
    });
    return columns;
  }

  createElem(tag, value, parent) {
    const elem = document.createElement(tag);
    elem.textContent = value;
    parent.append(elem);
    return elem;
  }

  setTimer(column, span, time) {
    const timerId = setInterval(() => {
      span.textContent = column.amountFuel;
      const total = column.car?.maxTank - column.car?.nowTank ?
        column.car?.maxTank - column.car?.nowTank : 0;

      if (column.car === null) {
        clearInterval(timerId);
        column.amountFuel = 0;
        span.textContent = total;
      }
    }, time);
  }

  columnName(column, parent) {
    const columnName = document.createElement('p');
    columnName.textContent = column.type;
    parent.append(columnName);

    return columnName;
  }

  checkColumnCar(column, parent) {
    if (column.car) {
      const itemCar = document.createElement('p');
      const car = column.car;
      itemCar.textContent = car.getTitle();
      itemCar.classList.add(car.typeCar);
      parent.append(itemCar);
    }
  }
}
