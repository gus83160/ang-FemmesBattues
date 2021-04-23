import { Pipe, PipeTransform } from '@angular/core';
import { Variables } from './global/variables';

@Pipe({
  name: 'LibelleTypeUtilisateur'
})
export class LibelleTypeUtilisateurPipe implements PipeTransform {
    variables: Variables = new Variables();

  transform(id) {
  switch (id) {
     case this.variables.TypePrescripteur: return this.variables.LibellePrescripteur;
     case this.variables.TypeChauffeur:    return this.variables.LibelleChauffeur;
     case this.variables.TypeAssociation:  return this.variables.LibelleAssociation;
     case this.variables.TypeAdmin:        return this.variables.LibelleAdmin;
   }
    return "";
  }

}
