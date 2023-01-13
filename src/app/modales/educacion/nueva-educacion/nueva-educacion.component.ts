import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SEducacionService } from 'src/app/service/s-educacion.service';

@Component({
  selector: 'app-nueva-educacion',
  templateUrl: './nueva-educacion.component.html',
  styleUrls: ['./nueva-educacion.component.css']
})
export class NuevaEducacionComponent {


  educacionForm: FormGroup;


  constructor(private sEducacionService: SEducacionService, private formBuilder: FormBuilder) {

    this.educacionForm = this.formBuilder.group({
      nombreEduc: ['', [Validators.required]],
      institucionEduc: ['', [Validators.required]],
      descripcionEduc: ['', [Validators.required]],
      fechaInicio: ['', [Validators.required]],
      fechaFin: ['', [Validators.required]],
    })
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


  crearExp():void{

    this.sEducacionService.save(this.educacionForm.value).subscribe(data => {
      alert("Educacion agregada");
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
