import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonaService } from 'src/app/service/persona.service';
import { SImageService } from 'src/app/service/s-image.service';

@Component({
  selector: 'app-editarinfo',
  templateUrl: './editarinfo.component.html',
  styleUrls: ['./editarinfo.component.css']
})
export class EditarinfoComponent implements OnInit{

  personaForm: FormGroup;
  @Input('idSeleccionado') selectedId : any = null;
  ngOnChanges(changes: SimpleChanges) {

    if(this.selectedId) {

      this.setValues();
    }

  }
  constructor(private sPersona: PersonaService,private formBuilder: FormBuilder, public imgService: SImageService) {

    this.personaForm = this.formBuilder.group({
      img: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      titulo: ['', [Validators.required]]

    });

  }

  ngOnInit(): void {

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


  setValues() {
    this.sPersona.detail(this.selectedId).subscribe(data => {
      this.personaForm.patchValue({
        img: data.img,
        nombre: data.nombre,
        apellido: data.apellido,
        descripcion: data.descripcion,
        titulo: data.titulo,
      });
    });
  }

  updatePersona() {
    this.personaForm.patchValue({'img' : this.imgService.url != '' ? this.imgService.url : this.personaForm.controls['img'].value });
    this.sPersona.update(this.selectedId, this.personaForm.value).subscribe(data => {
      alert("Persona actualizada");
      this.clearForm();
      window.location.reload();
    }, err => {
      alert("Se ha producido un error, intente nuevamente");
    });
  }

  clearForm() {
    this.personaForm.reset({});
  }

  subirImagen($event : any) {
    if($event.target.files[0]) {
      const id = this.selectedId;
      const name = 'perfil_'+id;
      const storagePath = 'acercade';
      console.log(this.imgService.subirImagen($event, name, storagePath));
    }
  }
}
