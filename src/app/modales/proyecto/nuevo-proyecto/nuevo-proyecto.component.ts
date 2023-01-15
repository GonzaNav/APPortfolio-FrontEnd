import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SImageService } from 'src/app/service/s-image.service';
import { SProyectoService } from 'src/app/service/s-proyecto.service';

@Component({
  selector: 'app-nuevo-proyecto',
  templateUrl: './nuevo-proyecto.component.html',
  styleUrls: ['./nuevo-proyecto.component.css']
})
export class NuevoProyectoComponent implements OnInit {

  proyectoForm: FormGroup;

  constructor(private sProyecto: SProyectoService, private formBuilder: FormBuilder, public imgService: SImageService, private router : Router, private toastr: ToastrService) {

    this.proyectoForm = this.formBuilder.group({
      imgProy: ['', [Validators.required]],
      nombreProy: ['', [Validators.required]],
      descripcionProy: ['', [Validators.required]],

    });
   }

  ngOnInit(): void {
  }

  get imgProy() {
    return this.proyectoForm.get("imgProy");
  }

  get nombreProy() {
    return this.proyectoForm.get("nombreProy");
  }

  get descripcionProy() {
    return this.proyectoForm.get("descripcionProy");
  }

  createProyecto():void{
    this.proyectoForm.patchValue({'imgProy' : this.imgService.url });
    this.sProyecto.save(this.proyectoForm.value).subscribe({
      next: () => {
        this.router.navigate(['', { outlets: { modal: null }}]);
        this.sProyecto.filter("Register click");
        this.toastr.success('Proyecto creado', 'Se creó correctamente');
      },
      error: () => {
        this.toastr.error('Se produjo un error', 'Intente nuevamente');
      }
    });
  }

  clearForm() {
    this.proyectoForm.reset({});
  }

  subirImagen($event : any) {
    if($event.target.files[0]) {
      const name = 'proyecto_'+this.proyectoForm.get('nombreProy')?.value.toLowerCase();
      const storagePath = 'proyectos';
      this.proyectoForm.patchValue({'imgProy' : $event ? $event.target.files[0].name : '' });
      this.imgService.subirImagen($event, name.replace(/\s/g, ''), storagePath);
    }
  }

  modalClose(event : any) {
    this.router.navigate(['', { outlets: { modal: null }}]);
  }
}

