import {DxFormComponent} from 'devextreme-angular';

export class ValidationError {
  ValidationErrors: ValidationErrorField[] = [];
  status!: number;
  message!: string;

  constructor() {
  }

  applyToForm(form: DxFormComponent): string[] {
    let globalErrorMessage: string[] = [];
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
  fieldname!: string;
  message!: string[];
}
