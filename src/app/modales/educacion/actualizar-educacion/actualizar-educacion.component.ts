import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SEducacionService } from 'src/app/service/s-educacion.service';

@Component({
  selector: 'app-actualizar-educacion',
  templateUrl: './actualizar-educacion.component.html',
  styleUrls: ['./actualizar-educacion.component.css']
})
export class ActualizarEducacionComponent implements OnInit {

  educacionForm: FormGroup;
  @Input('idSeleccionado') selectedId : any = null;
  ngOnChanges(changes: SimpleChanges) {

    if(this.selectedId) {

      this.setValues();
    }

  }
  constructor(private sEducacion: SEducacionService,private formBuilder: FormBuilder) {

    this.educacionForm = this.formBuilder.group({
      nombreEduc: ['', [Validators.required]],
      institucionEduc: ['', [Validators.required]],
      descripcionEduc: ['', [Validators.required]],
      fechaInicio: ['', [Validators.required]],
      fechaFin: ['', [Validators.required]],

    });

  }

  ngOnInit(): void {

  }

  get nombreEduc() {
    return this.educacionForm.get("nombreEduc");
  }

  get institucionEduc() {
    return this.educacionForm.get("institucionEduc");
  }

  get descripcionEduc() {
    return this.educacionForm.get("descripcionEduc");
  }

  get fechaInicio() {
    return this.educacionForm.get("fechaInicio");
  }

  get fechaFin() {
    return this.educacionForm.get("fechaFin");
  }

  setValues() {
    this.sEducacion.detail(this.selectedId).subscribe(data => {
      this.educacionForm.patchValue({
        nombreEduc: data.nombreEduc,
        institucionEduc: data.institucionEduc,
        descripcionEduc: data.descripcionEduc,
        fechaInicio: data.fechaInicio,
        fechaFin: data.fechaFin,
      });
    });
  }

  updateEduc() {
    this.sEducacion.update(this.selectedId, this.educacionForm.value).subscribe(data => {
      alert("Educacion actualizada");
      this.clearForm();
      window.location.reload();
    }, err => {
      alert("Se ha producido un error, intente nuevamente");
    });
  }

  clearForm() {

    this.educacionForm.reset({});
  }
}
