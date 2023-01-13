import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Experiencia } from 'src/app/model/experiencia';
import { SExperienciaService } from 'src/app/service/s-experiencia.service';

@Component({
  selector: 'app-actualizar-experiencia',
  templateUrl: './actualizar-experiencia.component.html',
  styleUrls: ['./actualizar-experiencia.component.css']
})
export class ActualizarExperienciaComponent implements OnInit {

  experienciaForm: FormGroup;
  @Input('idSeleccionado') selectedId : any = null;
  ngOnChanges(changes: SimpleChanges) {

    if(this.selectedId) {

      this.setValues();
    }

  }
  constructor(private sExperiencia: SExperienciaService,private formBuilder: FormBuilder) {

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

  setValues() {
    this.sExperiencia.detail(this.selectedId).subscribe(data => {
      this.experienciaForm.patchValue({
        nombreExp: data.nombreExp,
        puestoExp: data.puestoExp,
        descripcionExp: data.descripcionExp,
        fechaInicio: data.fechaInicio,
        fechaFin: data.fechaFin,
      });
    });
  }

  updateExp() {
    this.sExperiencia.update(this.selectedId, this.experienciaForm.value).subscribe(data => {
      alert("Experiencia actualizada");
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
