import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastContainerComponent } from './toast-container/toast-container.component';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [ToastContainerComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule
  ],
  exports: [
    ToastContainerComponent
  ]
})
export class CustomControlsModule { }
