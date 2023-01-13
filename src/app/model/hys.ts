export class Hys {
  id?:number;
  nombreHys:string;
  porcentajeHys: number;
  tipo: string;

  constructor(nombre:string, porcentaje:number, tipo: string) {
    this.nombreHys = nombre;
    this.porcentajeHys = porcentaje;
    this.tipo = tipo;
  }
}
