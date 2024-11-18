export interface IPosition {
  x: number;
  y: number;
}

export class Position implements IPosition {
  constructor(public x: number, public y: number) {
  }

  static fromEvent(e: MouseEvent | TouchEvent, el: any = null): Position | null {
    if (this.isMouseEvent(e)) {
      return new Position(e.clientX, e.clientY);
    } else {
      if (el === null || e.changedTouches.length === 1) {
        return new Position(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
      }

      for (let i: number = 0; i < e.changedTouches.length; i++) {
        if (e.changedTouches[i].target === el) {
          return new Position(e.changedTouches[i].clientX, e.changedTouches[i].clientY);
        }
      }
    }
    return null;
  }

  static isMouseEvent(e: MouseEvent | TouchEvent): e is MouseEvent {
    return Object.prototype.toString.apply(e).indexOf('MouseEvent') === 8;
  }

  subtract(p: IPosition) {
    this.x -= p.x;
    this.y -= p.y;
    return this;
  }

  reset() {
    this.x = 0;
    this.y = 0;
    return this;
  }

  set(p: IPosition) {
    this.x = p.x;
    this.y = p.y;
    return this;
  }
}
