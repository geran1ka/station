export class RenderStation {
  constructor(app, station) {
    this.app = app;
    this.station = station;
    this.init();
  }

  init() {
    this.wrapper = document.createElement('div');
    this.wrapper.style.cssText = `
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: minmax(100px, 1fr);
      align-items: top;
      justify-content: space-between;
    `;

    this.renderStation();
  }

  renderStation() {
    this.wrapper.textContent = '';
    const queueList = this.createQueue();
    const columns = this.createColumns();
    this.wrapper.append(queueList, columns);
    document.querySelector(this.app).append(this.wrapper);
  }

  createQueue() {
    const list = document.createElement('ul');
    this.station.queue.forEach(car => {
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
    this.station.filling.forEach(column => {
      const itemColumn = document.createElement('li');
      itemColumn.classList.add(column.type);

      const columnAmountFuel = document.createElement('p');
      columnAmountFuel.textContent = 'Заправлено ';
      const columnAmountFuelSpan = document.createElement('span');
      columnAmountFuelSpan.textContent = column.amountFuel;
      columnAmountFuel.append(columnAmountFuelSpan);


      const timerId = setInterval(() => {
        columnAmountFuelSpan.textContent = column.amountFuel;
        const total = column.car?.maxTank - column.car?.nowTank ?
          column.car?.maxTank - column.car?.nowTank : 0;

        if (column.car === null) {
          clearInterval(timerId);
          columnAmountFuelSpan.textContent = total;
        }
      }, 1000);
      itemColumn.append(columnAmountFuel);

      const columnName = document.createElement('p');
      columnName.textContent = column.type;
      itemColumn.append(columnName);

      if (column.car) {
        const itemCar = document.createElement('p');
        const car = column.car;
        itemCar.textContent = car.getTitle();
        itemCar.classList.add(car.typeCar);
        itemColumn.append(itemCar);
      }
      columns.append(itemColumn);
    });
    return columns;
  }
}
