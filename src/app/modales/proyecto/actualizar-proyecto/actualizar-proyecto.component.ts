import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  constructor(private sProyecto: SProyectoService,private formBuilder: FormBuilder) {

    this.proyectoForm = this.formBuilder.group({
      nombreProyecto: ['', [Validators.required]],
      descripcionProyecto: ['', [Validators.required]],

    });

  }

  ngOnInit(): void {

  }

  get nombreProyecto() {
    return this.proyectoForm.get("nombreProyecto");
  }

  get descripcionProyecto() {
    return this.proyectoForm.get("descripcionProyecto");
  }

  setValues() {
    this.sProyecto.detail(this.selectedId).subscribe(data => {
      this.proyectoForm.patchValue({
        nombreProyecto: data.nombreProy,
        descripcionProyecto: data.descripcionProy
      });
    });
  }

  updateProyecto() : void {
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


}


