export class Map {

  x: number;
  y: number;
  r: number;

  constructor(x: number, y: number, r: number) {
    this.x = x;
    this.y = y;
    this.r = r;
  }

  get X() {
    return this.x;
  }

  set X(x: number) {
    this.x = x;
  }

  get Y() {
    return this.y;
  }

  set Y(y: number) {
    this.y = y;
  }

  get R() {
    return this.r;
  }

  set R(r: number) {
    this.r = r;
  }
}
