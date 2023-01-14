export class Proyecto {
  id?: number;
  nombreProy: string;
  descripcionProy: string;
  imgProy: string;

  constructor(nombreProy: string, descripcionProy: string, imgProy:string) {
    this.nombreProy = nombreProy;
    this.descripcionProy = descripcionProy;
    this.imgProy = imgProy;
  }
}
