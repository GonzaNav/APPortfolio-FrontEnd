import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SImageService } from 'src/app/service/s-image.service';
import { SProyectoService } from 'src/app/service/s-proyecto.service';

@Component({
  selector: 'app-actualizar-proyecto',
  templateUrl: './actualizar-proyecto.component.html',
  styleUrls: ['./actualizar-proyecto.component.css']
})
export class ActualizarProyectoComponent implements OnInit {

  proyectoForm: FormGroup;
  constructor(private sProyecto: SProyectoService,private formBuilder: FormBuilder, public imgService: SImageService, private router: Router, private activatedRoute: ActivatedRoute, private toastr: ToastrService) {

    this.proyectoForm = this.formBuilder.group({
      imgProy: ['', [Validators.required]],
      nombreProy: ['', [Validators.required]],
      descripcionProy: ['', [Validators.required]],

    });

  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.sProyecto.detail(id).subscribe(data => {
      this.proyectoForm.patchValue({
        nombreProy: data.nombreProy,
        descripcionProy: data.descripcionProy
      });
    });

  }

  get imgProy() {
    return this.proyectoForm.get('imgProy');
  }

  get nombreProy() {
    return this.proyectoForm.get("nombreProy");
  }

  get descripcionProy() {
    return this.proyectoForm.get("descripcionProy");
  }


  updateProyecto() : void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.proyectoForm.patchValue({'imgProy' : this.imgService.url });
    this.sProyecto.update(id, this.proyectoForm.value).subscribe({
      next: () => {
        this.clearForm();
        this.router.navigate(['', { outlets: { modal: null }}]);
        this.sProyecto.filter("Update click");
        this.toastr.success('Proyecto actualizado', 'Se actualizó correctamente');
      },
      error: () => {
        this.toastr.error('Se produjo un error', 'Intente nuevamente');
      }
    });
  }

  clearForm() :void {
    this.proyectoForm.reset({});
  }

  subirImagen($event : any) {
    if($event.target.files[0]) {
      const name = 'proyecto_'+this.proyectoForm.get('nombreProy')?.value.toLowerCase();
      const storagePath = 'proyectos';
      this.imgService.subirImagen($event, name.replace(/\s/g, ''), storagePath);
    }
  }
}


