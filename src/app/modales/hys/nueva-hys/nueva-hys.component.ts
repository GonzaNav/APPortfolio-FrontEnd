import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HysService } from 'src/app/service/hys.service';

@Component({
  selector: 'app-nueva-hys',
  templateUrl: './nueva-hys.component.html',
  styleUrls: ['./nueva-hys.component.css']
})
export class NuevaHysComponent implements OnInit {

  hysForm: FormGroup;

  constructor(private sHys: HysService, private formBuilder: FormBuilder, private router : Router, private toastr: ToastrService) {

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
    return this.hysForm.get("porcentajeHys");
  }

  get tipo() {
    return this.hysForm.get("tipo");
  }


  createHys():void{
    this.sHys.save(this.hysForm.value).subscribe({
      next: () => {
        this.router.navigate(['', { outlets: { modal: null }}]);
        this.sHys.filter("Register click");
        this.toastr.success('Skill creada', 'Se creó correctamente');
      },
      error: () => {
        this.toastr.error('Se produjo un error', 'Intente nuevamente');
      }
    });
  }

  clearForm() {
    this.hysForm.reset({});
  }
  modalClose(event : any) {
    this.router.navigate(['', { outlets: { modal: null }}]);
  }
}
