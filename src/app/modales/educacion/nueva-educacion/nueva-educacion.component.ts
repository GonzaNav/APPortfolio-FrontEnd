import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SEducacionService } from 'src/app/service/s-educacion.service';

@Component({
  selector: 'app-nueva-educacion',
  templateUrl: './nueva-educacion.component.html',
  styleUrls: ['./nueva-educacion.component.css']
})
export class NuevaEducacionComponent {


  educacionForm: FormGroup;


  constructor(private sEducacionService: SEducacionService, private formBuilder: FormBuilder, private router: Router, private toastr: ToastrService) {

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

    this.sEducacionService.save(this.educacionForm.value).subscribe({
      next: () => {
        this.router.navigate(['', { outlets: { modal: null }}]);
        this.sEducacionService.filter("Update click");
        this.toastr.success('Educación creada', 'Se creó correctamente');
      },
      error: () => {
        this.toastr.error('Se produjo un error', 'Intente nuevamente');
      }
    });
  }

  clearForm() {
    this.educacionForm.reset({});
  }

  modalClose(event : any) {
    this.router.navigate(['', { outlets: { modal: null }}]);
  }

}
