import { alert } from "devextreme/ui/dialog"

export class HttpError {
  public status: number;
  public message: string;

  constructor(status: number, msg: string) {
    this.status = status;
    this.message = msg;
  }

  async show(): Promise<void> {
    await alert(this.message, 'Erreur');
  }
}
