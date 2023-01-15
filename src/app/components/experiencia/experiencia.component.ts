import { Component, OnInit } from '@angular/core';
import { Experiencia } from 'src/app/model/experiencia';
import { SExperienciaService } from 'src/app/service/s-experiencia.service';
import { TokenService } from 'src/app/service/token.service';
declare var window: any;

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

  formModal: any;
  experiencias : Experiencia[] = [];
  constructor(private sExperiencia : SExperienciaService, private tokenService : TokenService) {}

  isLogged = false;
  idSeleccionado : any = null;
  ngOnInit() : void {
    this.cargarExperiencias();
    /* this.formModal = new window.bootstrap.Modal(
      document.getElementById('modal-actualizar-experiencia')
    ); */
    if(this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  cargarExperiencias() : void {
    this.sExperiencia.lista().subscribe(
      data => this.experiencias = data
    )
  }

  obtenerUnaExperiencia(id: number) : void {
    this.idSeleccionado = id;
    this.formModal.show();
  }

  borrar(id: number) {
    if(id != undefined) {
      this.sExperiencia.delete(id).subscribe(
        data => {
          alert("Experiencia eliminada");
          this.cargarExperiencias()
        }, err => alert('no se pudo eliminar')
      )
    }
  }
}
