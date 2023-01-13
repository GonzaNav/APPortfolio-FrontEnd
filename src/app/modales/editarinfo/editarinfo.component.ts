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
      nombrePersona: ['', [Validators.required]],
      apellidoPersona: ['', [Validators.required]],
      descripcionPersona: ['', [Validators.required]],
      tituloPersona: ['', [Validators.required]]

    });

  }

  ngOnInit(): void {

  }

  get nombrePersona() {
    return this.personaForm.get("nombrePersona");
  }

  get apellidoPersona() {
    return this.personaForm.get("apellidoPersona");
  }

  get tituloPersona() {
    return this.personaForm.get("tituloPersona");
  }

  get descripcionPersona() {
    return this.personaForm.get("descripcionPersona");
  }


  setValues() {
    this.sPersona.detail(this.selectedId).subscribe(data => {
      this.personaForm.patchValue({
        nombrePersona: data.nombre,
        apellidoPersona: data.apellido,
        descripcionPersona: data.descripcion,
        tituloPersona: data.titulo,
      });
    });
  }

  updatePersona() {
    this.sPersona.update(this.selectedId, this.personaForm.value).subscribe(data => {
      alert("Personaeriencia actualizada");
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
    const id = this.selectedId;
    const name = 'perfil_'+id;
    this.imgService.subirImagen($event, name);
  }
}
