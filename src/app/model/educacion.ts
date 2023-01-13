export class Educacion {

  id?: number;
  nombreEduc: string;
  institucionEduc: string;
  descripcionEduc: string;
  fechaInicio: string;
  fechaFin: string;

  constructor(nombreEduc: string,institucionEduc: string, descripcionEduc: string, fechaInicio: string, fechaFin: string) {
    this.nombreEduc = nombreEduc;
    this.institucionEduc = institucionEduc;
    this.descripcionEduc = descripcionEduc;
    this.fechaInicio = fechaInicio;
    this.fechaFin = fechaFin;
  }
}
