export class Experiencia {

  id?: number;
  nombreExp : string;
  puestoExp: string;
  descripcionExp : string;
  fechaInicio: string;
  fechaFin: string;

  constructor(nombreExp: string, puestoExp: string, descripcionExp: string, fechaInicio: string, fechaFin: string) {
      this.nombreExp = nombreExp;
      this.puestoExp = puestoExp;
      this.descripcionExp = descripcionExp;
      this.fechaInicio = fechaInicio;
      this.fechaFin = fechaFin;
  }
}
