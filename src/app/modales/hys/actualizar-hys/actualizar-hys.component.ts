import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HysService } from 'src/app/service/hys.service';

@Component({
  selector: 'app-actualizar-hys',
  templateUrl: './actualizar-hys.component.html',
  styleUrls: ['./actualizar-hys.component.css']
})
export class ActualizarHysComponent implements OnInit {

  hysForm: FormGroup;
  constructor(private sHys: HysService,private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute, private toastr: ToastrService) {

    this.hysForm = this.formBuilder.group({
      nombreHys: ['', [Validators.required]],
      porcentajeHys: ['', [Validators.required]],
      tipo: ['', [Validators.required]]

    });

  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.sHys.detail(id).subscribe(data => {
      this.hysForm.patchValue({
        nombreHys: data.nombreHys,
        porcentajeHys: data.porcentajeHys,
        tipo: data.tipo
      });
    });

  }

  get nombreHys() {
    return this.hysForm.get("nombreHys");
  }

  get porcentajeHys() {
    return this.hysForm.get("puestoHys");
  }

  get tipo() {
    return this.hysForm.get("tipo");
  }

  updateHys() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.sHys.update(id, this.hysForm.value).subscribe({
      next: () => {
        this.clearForm();
        this.router.navigate(['', { outlets: { modal: null }}]);
        this.sHys.filter("Update click");
        this.toastr.success('Skill actualizada', 'Se actualizó correctamente');
      },
      error: () => {
        this.toastr.error('Se produjo un error', 'Intente nuevamente');
      }
    });
  }

  clearForm() {
    this.hysForm.reset({});
  }


}

