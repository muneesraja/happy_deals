import { EventEmitter } from '@angular/core';
export class dealEmitters {
  static deals = new EventEmitter<any>(false);
}
export class storeEmitters {
  static store = new EventEmitter<any>(false);
}
export class percentageEmitters {
  static percentage = new EventEmitter<any>(false);
}
