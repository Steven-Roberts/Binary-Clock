export default class BinaryClock {
  constructor (onTick) {
    this._hour12 = true;
    this._onTick = onTick;

    this.update();
    setInterval(this.update.bind(this), 1000);
  }

  touggleHour12 () {
    this._hour12 = !this._hour12;
    this.update();
  }

  update () {
    this.time = new Date();
    this.seconds = this.time.getSeconds();
    this.minutes = this.time.getMinutes();
    this.hours = this.time.getHours();

    if (this._hour12) {
      this.hours = (this.hours + 11) % 12 + 1;
    }

    this._onTick(this);
  }

  isCellOn (row, col) {
    let colVal;
    if (col < 2) {
      colVal = this.hours;
    } else if (col < 4) {
      colVal = this.minutes;
    } else {
      colVal = this.seconds;
    }

    if (col % 2 === 0) {
      colVal /= 10;
    } else {
      colVal %= 10;
    }

    return (colVal >>> row) & 1;
  }

  toString () {
    return this.time.toLocaleTimeString([], {
      hour12: this._hour12
    });
  }
}
