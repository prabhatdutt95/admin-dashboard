import { Component, TemplateRef } from '@angular/core';
import { ToastService } from "src/app/shared/services/toast.service";

@Component({
  selector: 'app-toasts',
  templateUrl: './toast-container.component.html',
  styles: [''],
  host: { "[class.ngb-toasts]": "true" }
})
export class ToastContainerComponent {

  constructor(public toastService: ToastService) { }

  isTemplate(toast) {
    return toast.textOrTpl instanceof TemplateRef;
  }
}
