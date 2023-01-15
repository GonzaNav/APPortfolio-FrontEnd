import { Component, OnInit } from '@angular/core';
import { Educacion } from 'src/app/model/educacion';
import { SEducacionService } from 'src/app/service/s-educacion.service';
import { TokenService } from 'src/app/service/token.service';
declare var window: any;

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  educaciones: Educacion[] = [];
  formModal: any;
  constructor(private sEducacion : SEducacionService, private tokenService : TokenService) {
    this.sEducacion.listen().subscribe({
      next: () => {
        this.cargarEducacion();
      }
    });
  }
  isLogged = false;
  idSeleccionado : any = null;
  ngOnInit(): void {
    this.cargarEducacion();
    if(this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  cargarEducacion() :void {
    this.sEducacion.lista().subscribe(
      data => {
        this.educaciones = data;
      }
    )
  }

  obtenerUnaEducacion(id: number) : void {
    this.idSeleccionado = id;
    this.formModal.show();
  }

  borrar(id: number) {
    if(id != undefined) {
      this.sEducacion.delete(id).subscribe(
        data => {
          alert("Educacion eliminada");
          this.cargarEducacion()
        }, err => alert('no se pudo eliminar')
      )
    }
  }
}
