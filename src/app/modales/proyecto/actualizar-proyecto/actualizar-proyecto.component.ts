import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SImageService } from 'src/app/service/s-image.service';
import { SProyectoService } from 'src/app/service/s-proyecto.service';

@Component({
  selector: 'app-actualizar-proyecto',
  templateUrl: './actualizar-proyecto.component.html',
  styleUrls: ['./actualizar-proyecto.component.css']
})
export class ActualizarProyectoComponent implements OnInit {

  proyectoForm: FormGroup;
  @Input('idSeleccionado') selectedId : any = null;
  ngOnChanges(changes: SimpleChanges) {

    if(this.selectedId) {

      this.setValues();
    }

  }
  constructor(private sProyecto: SProyectoService,private formBuilder: FormBuilder, public imgService: SImageService) {

    this.proyectoForm = this.formBuilder.group({
      imgProy: ['', [Validators.required]],
      nombreProy: ['', [Validators.required]],
      descripcionProy: ['', [Validators.required]],

    });

  }

  ngOnInit(): void {

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

  setValues() {
    this.sProyecto.detail(this.selectedId).subscribe(data => {
      this.proyectoForm.patchValue({
        nombreProy: data.nombreProy,
        descripcionProy: data.descripcionProy
      });
    });
  }

  updateProyecto() : void {
    this.proyectoForm.patchValue({'imgProy' : this.imgService.url });
    this.sProyecto.update(this.selectedId, this.proyectoForm.value).subscribe(data => {
      alert("Proyecto actualizado");
      this.clearForm();
      window.location.reload();
    }, err => {
      alert("Se ha producido un error, intente nuevamente");
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


