import { Component, OnInit } from '@angular/core';
import { Hys } from 'src/app/model/hys';
import { HysService } from 'src/app/service/hys.service';
import { TokenService } from 'src/app/service/token.service';
import { ToastrService } from 'ngx-toastr';
declare var window: any;

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  formModal: any;
  softSkills : Hys[] = [];
  hardSkills : Hys[] = [];
  constructor(private sHys : HysService, private tokenService : TokenService, private toastr: ToastrService) {}

  isLogged = false;
  idSeleccionado : any = null;
  ngOnInit() : void {
    this.cargarHabilidadesBlandas();
    this.cargarHabilidadesFuertes();
    /* this.formModal = new window.bootstrap.Modal(
      document.getElementById('modal-actualizar-habilidad')
    ); */
    if(this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  cargarHabilidadesBlandas() : void {
    this.sHys.listaBlandas().subscribe( data => this.softSkills = data)
  }

  cargarHabilidadesFuertes() : void {
    this.sHys.listaFuertes().subscribe( data => this.hardSkills = data)
  }

  obtenerUnaHabilidad(id: number) : void {
    this.idSeleccionado = id;
    this.formModal.show();
  }

  borrar(id: number) {
    if(id != undefined) {
      this.sHys.delete(id).subscribe(
        data => {
          this.toastr.success('Skill eliminada', 'Se eliminó correctamente');
          this.cargarHabilidadesBlandas();
          this.cargarHabilidadesFuertes();
        }, err => alert('no se pudo eliminar')
      )
    }
  }
}
