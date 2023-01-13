export class Proyecto {
  id?: number;
  nombreProy: string;
  descripcionProy: string;

  constructor(nombreProy: string, descripcionProy: string) {
    this.nombreProy = nombreProy;
    this.descripcionProy = descripcionProy;
  }
}
