import {Component, isDevMode, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {formatDate} from '@angular/common';
import {GlobalVariables} from '../../global/global_variables';
import {IVictime} from '../../../../models/IVictime';
import {VictimeService} from '../../../../services/victime.service';
import {IDemande} from '../../../../models/IDemande';
import {DemandeService} from '../../../../services/demande.service';
import {IPriseEnCharge} from '../../../../models/i-prise-en-charge';
import {PriseEnChargeService} from '../../../../services/prise-en-charge.service';
import {DialogueService} from '../../dialogue/dialogue.service';
import {IRetour} from '../../../../models/IRetour';
import {MotifService} from '../../../../services/motif.service';
import {IMotif} from '../../../../models/IMotif';
import {StructureRequeranteService} from '../../../../services/structurerequerante.service';
import {IStructureRequerante} from '../../../../models/i-structure-requerante';
import {ErrorService} from '../../../../services/error.service';
import {RoutesEnum} from '../../RoutesEnum';
import {IUtilisateur} from '../../../../models/IUtilisateur';
import notify from 'devextreme/ui/notify';
import {alert} from 'devextreme/ui/dialog';
import {DateAdapter, MAT_DATE_LOCALE} from '@angular/material/core';
import {CustomDateAdapter} from '../../../../helpers/custom-date-adapter';
import {Platform} from '@angular/cdk/platform';

@Component({
  selector: 'app-demande-edit',
  templateUrl: './demande-edit.component.html',
  styleUrls: ['./demande-edit.component.scss'],
})
export class DemandeEditComponent implements OnInit {
  isDevMode: boolean;
  demandeForm!: FormGroup;
  victime!: IVictime;
  victimeret!: IVictime;
  allMotifs: IMotif[] = [];
  allStructureRequerantes!: IStructureRequerante[];

  // dt: string;
  demande!: IDemande;
  priseencharge!: IPriseEnCharge;
  retour!: IRetour;
  enfantPresent!: string;
  allerRetour!: string;
  errorService!: ErrorService;
  public executing: boolean = false;
  private currentUser: IUtilisateur;

  fillValueButtonOptions = {
    icon: 'refresh',
    onClick: () => {
      this.fillValues();
    },
  };

  constructor(public dialogueService: DialogueService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private victimeService: VictimeService,
              private demandeService: DemandeService,
              private priseenchargeService: PriseEnChargeService,
              private motifService: MotifService,
              private structureRequeranteService: StructureRequeranteService,
              private variables: GlobalVariables) {

    // console.log(this.router.url);
    // const data = this.activatedRoute.snapshot.data;
    // console.log(data);
    // console.log((this.activatedRoute.data as any).value);

    if (this.activatedRoute.snapshot.data.creation === true) {
      this.variables.IdPriseEnCharge = 0;
    } else if (this.variables.IdPriseEnCharge == 0 || this.variables.IdPriseEnCharge == null) {
      notify('Pas de demande active.', 'warning', 5000);
      this.router.navigate([RoutesEnum.ROOT]).then(() => {});
    }

    this.isDevMode = isDevMode();
    if (variables.currentUser == null) {
      router.navigate([RoutesEnum.ROOT]).then(() => {});
    } else {
      this.currentUser = variables.currentUser as IUtilisateur;
    }
  }

  async ngOnInit(): Promise<void> {
    this.errorService = new ErrorService(this.demandeForm);
    await this.InitDemande();
    if (this.retour?.enfantPresent) {
      this.enfantPresent = 'O';
    } else {
      this.enfantPresent = 'N';
    }

    if (this.retour.allerRetour) {
      this.allerRetour = 'O';
    } else {
      this.allerRetour = 'N';
    }

    this.demandeForm = new FormGroup({
        pe_datedemande: new FormControl(this.retour.dateDemande, [
          Validators.required
        ]),
        idstructurerequerante: new FormControl(this.retour.idStructureRequerante, [
          Validators.required
        ]),
        pe_nomdemandeur: new FormControl(this.retour.nomDemandeur, [
          Validators.required,
          Validators.maxLength(100)
        ]),
        pe_telephone: new FormControl(this.retour.telephoneDemandeur, [
          Validators.maxLength(15)
        ]),
        pe_mail: new FormControl(this.retour.mailDemandeur, [
          Validators.email,
        ]),
        vi_nom: new FormControl(this.retour.nomVictime, [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50)
        ]),
        vi_nomusage: new FormControl(this.retour.nomUsage, [
          Validators.maxLength(50)
        ]),
        vi_prenom: new FormControl(this.retour.prenom, [
          Validators.maxLength(50)
        ]),
        vi_adresse: new FormControl(this.retour.adresse, [
          Validators.maxLength(150)
        ]),
        vi_telephone: new FormControl(this.retour.telephone, [
          Validators.maxLength(15)
        ]),
        vi_email: new FormControl(this.retour.mail, [
          Validators.email,
        ]),
        vi_age: new FormControl(this.retour.age, []),
        vi_enfantcharge: new FormControl(this.retour.enfantCharge),
        vi_infocomplementaire: new FormControl(this.retour.infoComplementaire, [
          Validators.maxLength(200)
        ]),
        de_datealler: new FormControl(this.retour.dateAller, [Validators.required]),
        de_heurealler: new FormControl(this.retour.heureAller, [Validators.required]),
        idmotif: new FormControl(this.retour.idMotif, [
          Validators.required
        ]),
        de_enfantpresent: new FormControl(this.enfantPresent),
        de_nbenfant: new FormControl(this.retour.nbEnfant
        ),
        de_ageenfant: new FormControl(this.retour.ageEnfant),
        de_particularite: new FormControl(this.retour.particularite, [
          Validators.maxLength(100)
        ]),
        de_adressedepart: new FormControl(this.retour.adresseDepart, [
          Validators.required,
          Validators.maxLength(150)
        ]),
        de_adressearrivee: new FormControl(this.retour.adresseArrivee, [
          Validators.required,
          Validators.maxLength(150)
        ]),
        de_allerretour: new FormControl(this.allerRetour),
        de_dateretour: new FormControl(this.retour.dateRetour),
        de_heureretour: new FormControl(this.retour.heureRetour),
        encadredate: new FormControl('')
      },
      // {validators: this.ControleEnfant('de_enfantpresent', 'de_nbenfant', 'de_ageenfant',
      // 'de_allerretour', 'de_dateretour', 'de_heureretour')}
    );

    {
      // Mise en place des validations supplémentaires si EnfantPresent = "O"
      const ctrlEnfantPresent = this.demandeForm.get('de_enfantpresent') as FormControl;
      const ctrlNbEnfant = this.demandeForm.get('de_nbenfant') as FormControl;
      const ctrlAgeEnfant = this.demandeForm.get('de_ageenfant') as FormControl;
      ctrlEnfantPresent.valueChanges.subscribe(value => {
        if (value === 'O') {
          ctrlNbEnfant.setValidators([Validators.required]);
          ctrlAgeEnfant.setValidators([Validators.required]);
        } else {
          ctrlNbEnfant.setValidators(null);
          ctrlAgeEnfant.setValidators(null);
        }

        ctrlNbEnfant.updateValueAndValidity();
        ctrlAgeEnfant.updateValueAndValidity();
      });
    }

    {
      // Mise en place des validations supplémentaires si allerRetour = "O"
      const ctrlAllerRetour = this.demandeForm.get('de_allerretour') as FormControl;
      const ctrlDateRetour = this.demandeForm.get('de_dateretour') as FormControl;
      const ctrlHeureRetour = this.demandeForm.get('de_heureretour') as FormControl;
      ctrlAllerRetour.valueChanges.subscribe(value => {
        if (value === 'O') {
          ctrlDateRetour.setValidators([Validators.required]);
          ctrlHeureRetour.setValidators([Validators.required]);
        } else {
          ctrlDateRetour.setValidators(null);
          ctrlHeureRetour.setValidators(null);
        }

        ctrlDateRetour.updateValueAndValidity();
        ctrlHeureRetour.updateValueAndValidity();
      });
    }

    this.victime = <IVictime>{};
    this.demande = <IDemande>{};
    this.priseencharge = <IPriseEnCharge>{};
  }

  // ControleEnfant(enfant: string, nb: string, age: string, ar: string, dretour: string, hretour: string): ValidatorFn {
  //   return (group: FormGroup): { [key: string]: boolean } | null => {
  //     const enfantPresent = group.controls[enfant];
  //     const nbEnfant = group.controls[nb];
  //     const ageEnfant = group.controls[age];
  //     const allerRetour = group.controls[ar];
  //     const dateRetour = group.controls[dretour];
  //     const heureRetour = group.controls[hretour];
  //     if (enfantPresent.value === 'O'
  //       && (nbEnfant.value == null || nbEnfant.value === 0 || nbEnfant.value === '')) {
  //       return {nbenfant: true};
  //     }
  //     if (enfantPresent.value === 'O' && (ageEnfant.value == null || ageEnfant.value === 0 || ageEnfant.value === '')) {
  //       return {ageenfant: true};
  //     }
  //     if (allerRetour.value === 'O' && (dateRetour.value == null || dateRetour.value === '')) {
  //       return {dateRetour: true};
  //     }
  //     if (allerRetour.value === 'O' && (heureRetour.value == null || heureRetour.value === '')) {
  //       return {heureRetour: true};
  //     }
  //     return null;
  //   };
  // }

  async InitDemande(): Promise<void> {
    if (this.variables.IdPriseEnCharge > 0) {
      const httpResult = await this.priseenchargeService.getPriseEnChargeDonneesModif(this.variables.IdPriseEnCharge)
        .execute(res => {
          this.retour = res;
        });
      if (!httpResult.isOk) {
        await this.router.navigate([RoutesEnum.ROOT]);
      }
      // this.retour = await this.priseenchargeService.getPriseEnChargeDonneesModif(this.variables.IdPriseEnCharge);
    } else {
      this.retour = <IRetour>{};
      this.retour.dateDemande = new Date();
      this.retour.dateAller = new Date();
      this.retour.heureAller = formatDate(Date(), 'HH:mm', 'fr');
    }
    await this.loadAllMotif();
    this.loadAllStructureRequerante();
  }

  async loadAllMotif(): Promise<void> {
    const httpResult = await this.motifService.getAllMotif()
      .execute(res => {
        this.allMotifs = res;
      });
    if (!httpResult.isOk) {
      await this.router.navigate([RoutesEnum.ROOT]);
    }
    // const res = this.motifService.getAllMotif();
    // res.subscribe(tm => {
    //   this.allMotifs = tm;
    // });
  }

  async loadAllStructureRequerante() {
    const httpResult = await this.structureRequeranteService.getAllStructureRequerante(this.currentUser.ut_typestructurerequerante)
      .execute(res => {
        this.allStructureRequerantes = res;
      });
    if (!httpResult.isOk) {
      await this.router.navigate([RoutesEnum.ROOT]);
    }

    // const res = this.structureRequeranteService.getAllStructureRequerante(this.currentUser.ut_typestructurerequerante);
    // res.subscribe(ts => {
    //   this.allStructureRequerantes = ts;
    // });
  }

  async CreationDemande(): Promise<void> {
    this.executing = true;
    try {
      await this.DoCreationDemande();
    } finally {
      // await new Promise(resolve => setTimeout(resolve, 5000));
      this.executing = false;
    }
  }

  async DoCreationDemande(): Promise<void> {
    this.demandeForm.markAllAsTouched();
    this.errorService.reset();

    if (this.demandeForm.invalid) {
      return;
    }

    const data = this.demandeForm.value;
    this.victime.vi_nom = data.vi_nom;
    this.victime.vi_nomusage = data.vi_nomusage;
    this.victime.vi_prenom = data.vi_prenom;
    this.victime.vi_adresse = data.vi_adresse;
    this.victime.vi_telephone = data.vi_telephone;
    this.victime.vi_email = data.vi_email;
    this.victime.vi_age = data.vi_age ?? 0;
    this.victime.vi_enfantcharge = data.vi_enfantcharge ?? 0;
    this.victime.vi_infocomplementaire = data.vi_infocomplementaire;

    try {
      if (this.variables.IdPriseEnCharge > 0) {
        this.victime.id = this.variables.IdVictime;
        this.victimeret = await this.victimeService.updateVictime(this.victime);
      } else {
        this.victimeret = await this.victimeService.createVictime(this.victime);
        this.variables.IdVictime = this.victimeret.id;
      }
    } catch (e) {
      this.errorService.loadError(e, this.demandeForm);
      return;
    }

    const dt = formatDate(data.de_datealler, 'yyyy-MM-ddT', 'Fr') + data.de_heurealler + ':00';
    this.demande.de_datealler = new Date(dt);

    this.demande.idmotif = data.idmotif;

    this.demande.de_enfantpresent = data.de_enfantpresent === 'O';

    this.demande.de_nbenfant = data.de_nbenfant ?? 0;
    this.demande.de_ageenfant = data.de_ageenfant;
    this.demande.de_particularite = data.de_particularite;
    this.demande.de_adressedepart = data.de_adressedepart;
    this.demande.de_adressearrivee = data.de_adressearrivee;

    if (data.de_allerretour === 'O') {
      this.demande.de_allerretour = true;
      const dt = formatDate(data.de_dateretour, 'yyyy-MM-ddT', 'Fr') + data.de_heureretour + ':00';
      this.demande.de_dateretour = new Date(dt);
    } else {
      this.demande.de_allerretour = false;
      const dt = '2001-01-01T00:00:00';
      this.demande.de_dateretour = new Date(dt);
    }

    try {
      if (this.variables.IdPriseEnCharge > 0) {
        this.demande.id = this.variables.IdDemande;
        this.demande = await this.demandeService.updateDemande(this.demande);
      } else {
        this.demande = await this.demandeService.createDemande(this.demande);
        this.variables.IdDemande = this.demande.id;
      }
    } catch (e) {
      this.errorService.loadError(e, this.demandeForm);
      return;
    }

    this.priseencharge.pe_date = data.pe_datedemande;
    this.priseencharge.idstructurerequerante = data.idstructurerequerante;
    this.priseencharge.pe_nomdemandeur = data.pe_nomdemandeur;
    this.priseencharge.pe_telephone = data.pe_telephone;
    this.priseencharge.pe_mail = data.pe_mail;

    this.priseencharge.pe_nofacture = '';
    this.priseencharge.idprescripteur = this.currentUser.id;
    this.priseencharge.idvictime = this.variables.IdVictime;
    this.priseencharge.iddemande = this.variables.IdDemande;
    this.priseencharge.idcourse = 0;

    try {
      if (this.variables.IdPriseEnCharge > 0) {
        this.priseencharge.id = this.variables.IdPriseEnCharge;
        this.priseencharge.pe_nodemande = this.variables.NoDemande;
        this.priseencharge = await this.priseenchargeService.updatePriseEnCharge(this.priseencharge);
        this.variables.IdPriseEnCharge = 0;
        await this.router.navigate([RoutesEnum.DEMANDE, RoutesEnum.DEMANDE_LIST]);
      } else {
        this.priseencharge.pe_nodemande = '';
        this.priseencharge = await this.priseenchargeService.createPriseEnCharge(this.priseencharge);
        await alert('La demande n° ' + this.priseencharge.pe_nodemande + ' a été créée.', "Création demande");
        //this.dialogueService.confirm({message: 'No de la demande : ' + this.priseencharge.pe_nodemande});
        await this.router.navigate([RoutesEnum.ROOT]);
      }
    } catch (e) {
      this.errorService.loadError(e, this.demandeForm);
      return;
    }
  }

  fillValues() {
    this.demandeForm.controls.idstructurerequerante.setValue(1);
    this.demandeForm.controls.pe_nomdemandeur.setValue('NOM DEMANDEUR');
    this.demandeForm.controls.vi_nom.setValue('NOM VICTIME');
    this.demandeForm.controls.idmotif.setValue(1);
    this.demandeForm.controls.de_adressedepart.setValue('Adresse de la prise en charge de la victime');
    this.demandeForm.controls.de_adressearrivee.setValue('Adresse de dépôt de la victime');
  }
}
