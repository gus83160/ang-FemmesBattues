import {Pipe, PipeTransform} from '@angular/core';
import {GlobalVariables} from './global/global_variables';

@Pipe({
  name: 'LibelleTypeUtilisateur'
})
export class LibelleTypeUtilisateurPipe implements PipeTransform {
  constructor(private variables: GlobalVariables) {
  }

  transform(id: number) {
    switch (id) {
      case this.variables.TypePrescripteur:
        return this.variables.LibellePrescripteur;
      case this.variables.TypeChauffeur:
        return this.variables.LibelleChauffeur;
      case this.variables.TypeAssociation:
        return this.variables.LibelleAssociation;
      case this.variables.TypeAdmin:
        return this.variables.LibelleAdmin;
    }
    return '';
  }

}
