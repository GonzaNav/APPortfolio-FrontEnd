import { Component, OnInit } from '@angular/core';
import { Proyecto } from 'src/app/model/proyecto';
import { SProyectoService } from 'src/app/service/s-proyecto.service';
import { TokenService } from 'src/app/service/token.service';
declare var window: any;

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit {

  formModal: any;
  proyectos : Proyecto[] = [];
  constructor(private sProyecto : SProyectoService, private tokenService : TokenService) {}

  isLogged = false;
  idSeleccionado : any = null;
  ngOnInit() : void {
    this.cargarProyectos();
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('modal-actualizar-proyecto')
    );
    if(this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  cargarProyectos() : void {
    this.sProyecto.lista().subscribe(
      data => this.proyectos = data
    )
  }

  obtenerUnProyecto(id: number) : void {
    this.idSeleccionado = id;
    this.formModal.show();
  }

  borrar(id: number) {
    if(id != undefined) {
      this.sProyecto.delete(id).subscribe(
        data => {
          alert("Proyecto eliminado");
          this.cargarProyectos()
        }, err => alert('no se pudo eliminar')
      )
    }
  }
}
