import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HysService } from 'src/app/service/hys.service';

@Component({
  selector: 'app-nueva-hys',
  templateUrl: './nueva-hys.component.html',
  styleUrls: ['./nueva-hys.component.css']
})
export class NuevaHysComponent implements OnInit {

  hysForm: FormGroup;

  constructor(private sHys: HysService, private formBuilder: FormBuilder) {

    this.hysForm = this.formBuilder.group({
      nombreHys: ['', [Validators.required]],
      porcentajeHys: ['', [Validators.required]],

    });
   }

  ngOnInit(): void {
  }

  get nombreHys() {
    return this.hysForm.get("nombreHys");
  }

  get porcentajeHys() {
    return this.hysForm.get("porcentajeHys");
  }


  createHys():void{
    this.sHys.save(this.hysForm.value).subscribe(data => {
      alert("Habilidad agregada");
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
