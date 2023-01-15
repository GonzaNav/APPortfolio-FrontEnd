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

  constructor(public personaService: PersonaService, private tokenService : TokenService) {
    this.personaService.listen().subscribe({
      next: () => {
        this.cargarPersona();
      }
    });
  }
  isLogged = false;

  ngOnInit(): void {
    this.cargarPersona();
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

}
