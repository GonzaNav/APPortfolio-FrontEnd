import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SExperienciaService } from 'src/app/service/s-experiencia.service';

@Component({
  selector: 'app-nueva-experiencia',
  templateUrl: './nueva-experiencia.component.html',
  styleUrls: ['./nueva-experiencia.component.css']
})
export class NuevaExperienciaComponent implements OnInit {

  experienciaForm: FormGroup;

  constructor(private sExperienciaService: SExperienciaService, private formBuilder: FormBuilder, private router : Router, private toastr: ToastrService) {

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
    this.sExperienciaService.save(this.experienciaForm.value).subscribe({
      next: () => {
        this.router.navigate(['', { outlets: { modal: null }}]);
        this.sExperienciaService.filter("Register click");
        this.toastr.success('Experiencia creada', 'Se creó correctamente');
      },
      error: () => {
        this.toastr.error('Se produjo un error', 'Intente nuevamente');
      }
    });
  }

  clearForm() {
    this.experienciaForm.reset({});
  }

  modalClose(event : any) {
    this.router.navigate(['', { outlets: { modal: null }}]);
  }
}
