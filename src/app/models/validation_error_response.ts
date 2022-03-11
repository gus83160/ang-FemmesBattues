import {DxFormComponent} from 'devextreme-angular';

export class ValidationErrorResponse {
  constructor() {
    this.ValidationErrors = [];
  }

  ValidationErrors: ValidationErrorField[];

  applyToForm(form: DxFormComponent): string[] {
    let globalErrorMessage = [];
    for (const err of this.ValidationErrors) {
      const editor = form.instance.getEditor(err.fieldname);
      if (editor === undefined) {
        globalErrorMessage.push(...err.message);
      } else {
        //console.log(editor);
        editor.option({
          //validationError: {message: err.message, isValid: false},
          validationErrors: err.message.map((oneMessage) => {
            return { message: oneMessage, isValid: false }
          }),
          isValid: false
        });
      }
    }

    return globalErrorMessage;
  }
}

export class ValidationErrorField {
  fieldname: string;
  message: string[];

  // get FullDescription(): string {
  //   return this.Description.join(', ');
  // }
}
