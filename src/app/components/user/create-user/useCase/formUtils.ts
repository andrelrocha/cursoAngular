import { FormGroup } from "@angular/forms";

export class FormUtils {
  static cancel(userForm: FormGroup): void {
    userForm.reset();
    alert('Operação cancelada!');
  }
}
