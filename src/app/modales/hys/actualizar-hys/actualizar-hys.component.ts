import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HysService } from 'src/app/service/hys.service';

@Component({
  selector: 'app-actualizar-hys',
  templateUrl: './actualizar-hys.component.html',
  styleUrls: ['./actualizar-hys.component.css']
})
export class ActualizarHysComponent implements OnInit {

  hysForm: FormGroup;
  @Input('idSeleccionado') selectedId : any = null;
  ngOnChanges(changes: SimpleChanges) {

    if(this.selectedId) {

      this.setValues();
    }

  }
  constructor(private sHys: HysService,private formBuilder: FormBuilder) {

    this.hysForm = this.formBuilder.group({
      nombreHys: ['', [Validators.required]],
      porcentajeHys: ['', [Validators.required]],
      tipo: ['', [Validators.required]]

    });

  }

  ngOnInit(): void {

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

  setValues() {
    this.sHys.detail(this.selectedId).subscribe(data => {
      this.hysForm.patchValue({
        nombreHys: data.nombreHys,
        porcentajeHys: data.porcentajeHys,
        tipo: data.tipo
      });
    });
  }

  updateHys() {
    this.sHys.update(this.selectedId, this.hysForm.value).subscribe(data => {
      alert("Experiencia actualizada");
      this.clearForm();
      window.location.reload();
    }, err => {
      alert("Se ha producido un error, intente nuevamente");
    });
  }

  clearForm() {

    this.hysForm.reset({});
  }


}

