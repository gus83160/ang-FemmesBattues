import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'Facture'
})
export class FacturePipe implements PipeTransform {

  transform(montant,p1,p2,p3) {
    if (montant > 0 )
      return true;
    else
      return false;
  }

}
