import { alert } from "devextreme/ui/dialog"

export class ErrorMessage {
  public status: number;
  public message: string;

  constructor(status: number, msg: string) {
    this.status = status;
    this.message = msg;
  }

  show() {
    alert(this.message, 'Erreur');
  }
}
