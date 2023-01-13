import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SProyectoService } from 'src/app/service/s-proyecto.service';

@Component({
  selector: 'app-nuevo-proyecto',
  templateUrl: './nuevo-proyecto.component.html',
  styleUrls: ['./nuevo-proyecto.component.css']
})
export class NuevoProyectoComponent implements OnInit {

  proyectoForm: FormGroup;

  constructor(private sProyecto: SProyectoService, private formBuilder: FormBuilder) {

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


  createProyecto():void{
    this.sProyecto.save(this.proyectoForm.value).subscribe(data => {
      alert("Proyecto agregado");
      this.clearForm();
      window.location.reload();
    }, err => {
      alert("Se ha producido un error, intente nuevamente");
    });
  }

  clearForm() {
    this.proyectoForm.reset({});
  }
}

