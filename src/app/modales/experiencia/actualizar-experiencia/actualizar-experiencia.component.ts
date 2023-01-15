import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SExperienciaService } from 'src/app/service/s-experiencia.service';

@Component({
  selector: 'app-actualizar-experiencia',
  templateUrl: './actualizar-experiencia.component.html',
  styleUrls: ['./actualizar-experiencia.component.css']
})
export class ActualizarExperienciaComponent implements OnInit {

  experienciaForm: FormGroup;
  constructor(private sExperiencia: SExperienciaService,private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute, private toastr: ToastrService) {

    this.experienciaForm = this.formBuilder.group({
      nombreExp: ['', [Validators.required]],
      puestoExp: ['', [Validators.required]],
      descripcionExp: ['', [Validators.required]],
      fechaInicio: ['', [Validators.required]],
      fechaFin: ['', [Validators.required]],

    });

  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.sExperiencia.detail(id).subscribe(data => {
      this.experienciaForm.patchValue({
        nombreExp: data.nombreExp,
        puestoExp: data.puestoExp,
        descripcionExp: data.descripcionExp,
        fechaInicio: data.fechaInicio,
        fechaFin: data.fechaFin,
      });
    });

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

  updateExp() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.sExperiencia.update(id, this.experienciaForm.value).subscribe({
      next: () => {
        this.clearForm();
        this.router.navigate(['', { outlets: { modal: null }}]);
        this.sExperiencia.filter("Update click");
        this.toastr.success('Experiencia actualizada', 'Se actualizó correctamente');
      },
      error: () => {
        this.toastr.error('Se produjo un error', 'Intente nuevamente');
      }
    });
  }

  clearForm() {
    this.experienciaForm.reset({});
  }

}
