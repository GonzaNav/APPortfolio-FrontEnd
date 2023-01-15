import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PersonaService } from 'src/app/service/persona.service';
import { SImageService } from 'src/app/service/s-image.service';

@Component({
  selector: 'app-editarinfo',
  templateUrl: './editarinfo.component.html',
  styleUrls: ['./editarinfo.component.css']
})
export class EditarinfoComponent implements OnInit{
  personaForm: FormGroup;

  constructor(private sPersona: PersonaService,private formBuilder: FormBuilder, public imgService: SImageService, private router: Router, private activatedRoute: ActivatedRoute, private toastr: ToastrService) {

    this.personaForm = this.formBuilder.group({
      img: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      titulo: ['', [Validators.required]]

    });

  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.sPersona.detail(id).subscribe(data => {
      this.personaForm.patchValue({
        img: data.img,
        nombre: data.nombre,
        apellido: data.apellido,
        descripcion: data.descripcion,
        titulo: data.titulo,
      });
    });

  }

  get img() {
    return this.personaForm.get("img");
  }

  get nombre() {
    return this.personaForm.get("nombre");
  }

  get apellido() {
    return this.personaForm.get("apellido");
  }

  get titulo() {
    return this.personaForm.get("titulo");
  }

  get descripcion() {
    return this.personaForm.get("descripcion");
  }

  updatePersona() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.personaForm.patchValue({'img' : this.imgService.url != '' ? this.imgService.url : this.personaForm.controls['img'].value });
    this.sPersona.update(id, this.personaForm.value).subscribe(
      {
        next: () => {
          this.clearForm();
          this.router.navigate(['', { outlets: { modal: null }}]);
          this.sPersona.filter("Update click");
          this.toastr.success('Datos actualizados', 'Se actualizó correctamente');
        },
        error: () => {
          this.toastr.error('Se produjo un error', 'Intente nuevamente');
        }
      }
    );
  }

  clearForm() {
    this.personaForm.reset({});
  }

  subirImagen($event : any) {

    if($event.target.files[0]) {
      const id = this.activatedRoute.snapshot.params['id'];
      const name = 'perfil_'+id;
      const storagePath = 'acercade';
      console.log(this.imgService.subirImagen($event, name, storagePath));
    }
  }
}
