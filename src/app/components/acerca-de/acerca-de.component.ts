import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/model/persona.model';
import { PersonaService } from 'src/app/service/persona.service';
import { TokenService } from 'src/app/service/token.service';
declare var window: any;

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {

  formModal: any;
  persona: Persona = new Persona('', '', '', '', '');

  constructor(public personaService: PersonaService, private tokenService : TokenService) {}
  isLogged = false;
  idSeleccionado : any = null;

  ngOnInit(): void {
    this.cargarPersona();
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('modal-actualizar-info')
    );
    if(this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  cargarPersona() {
    this.personaService.detail(1).subscribe(data => {
      this.persona = data;
    });
  }

  abrirModal(id: number) : void {
    this.idSeleccionado = id;
    this.formModal.show();
  }

}
