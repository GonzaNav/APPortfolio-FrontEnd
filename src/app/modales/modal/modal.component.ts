import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
declare var window: any;
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  exportAs: 'modal'
})
export class ModalComponent implements AfterViewInit{
  formModal: any;
  @Output() modalClose: EventEmitter<any> = new EventEmitter<any>();

  @Input() page?: string;

  constructor(private router: Router) {}
  ngAfterViewInit() {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('modal')
    );
    this.formModal.show();
  }
  closeModal(event : any) {
    this.formModal.hide();
  }
}
