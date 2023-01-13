import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SExperienciaService } from 'src/app/service/s-experiencia.service';

@Component({
  selector: 'app-nueva-experiencia',
  templateUrl: './nueva-experiencia.component.html',
  styleUrls: ['./nueva-experiencia.component.css']
})
export class NuevaExperienciaComponent implements OnInit {

  experienciaForm: FormGroup;

  constructor(private sExperienciaService: SExperienciaService, private formBuilder: FormBuilder) {

    this.experienciaForm = this.formBuilder.group({
      nombreExp: ['', [Validators.required]],
      puestoExp: ['', [Validators.required]],
      descripcionExp: ['', [Validators.required]],
      fechaInicio: ['', [Validators.required]],
      fechaFin: ['', [Validators.required]],

    });
   }

  ngOnInit(): void {
  }

  get nombreExp() {
    return this.experienciaForm.get("nombreExp");
  }

  get puestoExp() {
    return this.experienciaForm.get("puestoExp");
  }

  get descripcionExp() {
    return this.experienciaForm.get("descripcionExp");
  }

  get fechaInicio() {
    return this.experienciaForm.get("fechaInicio");
  }

  get fechaFin() {
    return this.experienciaForm.get("fechaFin");
  }


  createExp():void{

    this.sExperienciaService.save(this.experienciaForm.value).subscribe(data => {
      alert("Experiencia agregada");
      this.clearForm();
      window.location.reload();
    }, err => {
      alert("Se ha producido un error, intente nuevamente");
    });
  }

  clearForm() {

    this.experienciaForm.reset({});
  }
}
