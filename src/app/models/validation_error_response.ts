export class ValidationErrorResponse {
  constructor() {
    this.ValidationErrors = [];
  }

  ValidationErrors: ValidationErrorField[];
}

export class ValidationErrorField {
  Name: string;
  Description: string[];

  // get FullDescription(): string {
  //   return this.Description.join(', ');
  // }
}
