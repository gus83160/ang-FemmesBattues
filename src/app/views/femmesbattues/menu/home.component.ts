// import {Component, OnInit} from '@angular/core';
// import {GlobalVariables} from '../global/global_variables';
// import {Router} from '@angular/router';
// import {UtilisateurService} from '../../../models/utilisateur.service';
// import {NavigationService} from '../../../shared/services/navigation.service';
// import {Utilisateur} from '../../../models/utilisateur';
// import {DemandeService} from '../../../services/demande.service';
// import {Demande} from '../../../models/demande';
// import {Victime} from '../../../models/victime';
// import {VictimeService} from '../../../services/victime.service';
// import {FormControl, FormGroup, Validators} from '@angular/forms';
// import {ErrorService} from '../../../services/error.service';
// import {AuthService} from '../../../shared/services/auth.service';
//
// @Component({
//   selector: 'app-menu',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css']
// })
//
// export class HomeComponent implements OnInit {
//   DemandeForm: FormGroup;
//   executing: boolean;
//
//   constructor(
//     private route: Router,
//     private victimeService: VictimeService,
//     private authService: AuthService
//     ) {
//   }
//
//   async ngOnInit(): Promise<void> {
//     await this.authService.tryLoadFromSession();
//     // this.DemandeForm = new FormGroup({
//     //   vi_nom: new FormControl('aaaa', [
//     //     Validators.required,
//     //     Validators.maxLength(50)
//     //   ]),
//     //   pe_datedemande: new FormControl(),
//     // });
//     // this.errorService = new ErrorService(this.DemandeForm);
//   }
//
//   // async CreationDemande() {
//   //   const victime: Victime = {
//   //     vi_nom: this.DemandeForm.value.vi_nom,
//   //     vi_prenom: 'test',
//   //     vi_nomusage: 'test',
//   //   } as Victime;
//   //
//   //   this.executing = true;
//   //   await this.errorService.try(async () => {
//   //     await this.victimeService.createVictime(victime);
//   //   });
//   //   this.executing = false;
//   // }
// }
