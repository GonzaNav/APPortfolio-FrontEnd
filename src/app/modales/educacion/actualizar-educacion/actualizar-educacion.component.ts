import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SEducacionService } from 'src/app/service/s-educacion.service';

@Component({
  selector: 'app-actualizar-educacion',
  templateUrl: './actualizar-educacion.component.html',
  styleUrls: ['./actualizar-educacion.component.css']
})
export class ActualizarEducacionComponent implements OnInit {

  educacionForm: FormGroup;
  constructor(private sEducacion: SEducacionService,private formBuilder: FormBuilder, private router : Router, private activatedRoute : ActivatedRoute, private toastr: ToastrService) {

    this.educacionForm = this.formBuilder.group({
      nombreEduc: ['', [Validators.required]],
      institucionEduc: ['', [Validators.required]],
      descripcionEduc: ['', [Validators.required]],
      fechaInicio: ['', [Validators.required]],
      fechaFin: ['', [Validators.required]],

    });

  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.sEducacion.detail(id).subscribe(data => {
      this.educacionForm.patchValue({
        nombreEduc: data.nombreEduc,
        institucionEduc: data.institucionEduc,
        descripcionEduc: data.descripcionEduc,
        fechaInicio: data.fechaInicio,
        fechaFin: data.fechaFin,
      });
    });

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

  updateEduc() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.sEducacion.update(id, this.educacionForm.value).subscribe({
      next: () => {
        this.clearForm();
        this.router.navigate(['', { outlets: { modal: null }}]);
        this.sEducacion.filter("Update click");
        this.toastr.success('Educación actualizada', 'Se actualizó correctamente');
      },
      error: () => {
        this.toastr.error('Se produjo un error', 'Intente nuevamente');
      }
    });
  }

  clearForm() {
    this.educacionForm.reset({});
  }
}
