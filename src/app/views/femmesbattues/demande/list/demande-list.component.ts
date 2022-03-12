import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {GlobalVariables} from '../../global/global_variables';
import {UtilService} from '../../global/util.service';
import {Retour} from '../../../../models/retour';
import {PriseEnCharge} from '../../../../models/PriseEnCharge';
import {PriseEnChargeService} from '../../../../services/PriseEnCharge.service';
import {DemandeService} from '../../../../services/demande.service';
import {VictimeService} from '../../../../services/victime.service';
import {DialogueService} from '../../dialogue/dialogue.service';
import {SupprimerComponent} from '../../dialogue/supprimer.component';
import {RoutesEnum} from '../../RoutesEnum';
import DataSource from 'devextreme/data/data_source';
import {DxDataGridComponent} from 'devextreme-angular';
import {DemandeListFilterComponent} from './filter/demande-list-filter.component';
import {formatDate} from 'devextreme/localization';
import {DateService} from '../../../../services/date.service';
import {JsonService} from '../../../../services/json.service';
import {ViewPdfComponent} from '../../view-pdf/view-pdf.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-demande-list',
  templateUrl: './demande-list.component.html',
  styleUrls: ['./demande-list.component.scss']
})
export class DemandeListComponent implements OnInit, AfterViewInit {
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;
  @ViewChild(DemandeListFilterComponent, { static: false }) filterComponent: DemandeListFilterComponent;
  @ViewChild(ViewPdfComponent, { static: false }) viewPdf: ViewPdfComponent;

  rows = [];
  filterData: any = {};

  bPrescripteur: boolean;
  bChauffeur: boolean;
  bAdmin: boolean;
  ret: Retour;
  retFacture: Retour;
  // ret2: Retour = new Retour();
  // nbRetour = 0;
  priseencharge: PriseEnCharge;
  buttonColSize: number;
  showGeneratingPDF: boolean;

  dataSource: DataSource;
  filterText: string;

  constructor(public dialogueService: DialogueService,
              private router: Router,
              private dialog: MatDialog,
              private utilService: UtilService,
              private priseenchargeservice: PriseEnChargeService,
              private demandeservice: DemandeService,
              private victimeservice: VictimeService,
              private variables: GlobalVariables,
              private jsonService: JsonService,
              private dateService: DateService) {
  }

  ngOnInit(): void {
    // console.log('DemandeListComponent');
    // console.log(this.variables.currentUser);
    this.bPrescripteur = (this.variables.currentUser.idtypeutilisateur === this.variables.TypePrescripteur);
    this.bChauffeur = (this.variables.currentUser.idtypeutilisateur === this.variables.TypeChauffeur);
    this.bAdmin = (this.variables.currentUser.idtypeutilisateur === this.variables.TypeAdmin);

    if (this.bPrescripteur) {
      this.buttonColSize = 170;
    } else {
      if (this.bChauffeur) {
        this.buttonColSize = 210;
      } else {
        this.buttonColSize = 130;
      }
    }
    this.variables.IdPriseEnCharge = 0;

    const filterDataJson = sessionStorage.getItem('demande_filterData');
    if (filterDataJson) {
      this.filterData = this.jsonService.parse(filterDataJson);
    } else {
      const now = new Date();
      this.filterData.du = this.dateService.getLundi(now);
      this.filterData.au = this.dateService.getDimanche(now);
    }

    this.loadAllPriseEnCharge();
  }

  ngAfterViewInit(): void {
  }

  loadAllPriseEnCharge() {
    const store = this.priseenchargeservice.getAllPriseEnChargeStore(this.variables.currentUser.idtypeutilisateur, this.variables.currentUser.id);
    this.dataSource = new DataSource({
      store: store,
    });

    const filter = this.createFilter(this.filterData)
    this.dataSource.filter(filter);

    // const res = this.priseenchargeservice.getAllPriseEnCharge(this.variables.currentUser.idtypeutilisateur, this.variables.currentUser.id);
    // res.subscribe(ret => {
    //   if (ret) {
    //     this.rows = ret;
    //     // this.ret2.montant = ret[this.nbRetour].montant;
    //     // this.nbRetour++;
    //   }
    // });
  }

  async modifierLaCourse(numDemande: string) {
    await this.router.navigate([RoutesEnum.COURSE, RoutesEnum.COURSE_SAISIE], {queryParams: { numDemande: numDemande, returnUrl: this.router.url }});
  }

  async facturerLaCourse(id: number) {
    this.ret = await this.priseenchargeservice.PriseEnChargeAllDonnees(id);
    if (this.ret != null) {
      if (this.ret.montant > 0) {
        if ((this.ret.noFacture == '' || this.ret.noFacture == null)) {
          this.retFacture = await this.priseenchargeservice.GetNoFacture(id);
          this.ret.noFacture = this.retFacture.noFacture;
          this.ret.dateFacture = this.retFacture.dateFacture;
        }
        this.variables.IdPriseEnCharge = this.ret.idPriseEnCharge;
        this.variables.IdPrescripteur = this.ret.idPrescripteur;
        this.variables.IdDemande = this.ret.idDemande;
        this.variables.IdVictime = this.ret.idVictime;
        this.variables.IdChauffeur = this.ret.idChauffeur;
        this.variables.IdCourse = this.ret.idCourse;
        this.variables.NoDemande = this.ret.noDemande;
        this.variables.NoFacture = this.ret.noFacture;
        this.variables.DateFacture = this.ret.dateFacture;
        this.variables.DateDemande = this.ret.dateDemande;
        this.variables.DateDemandeVisu = this.ret.dateDemandeVisu;
        this.variables.DepDemande = this.ret.depDemande;
        this.variables.NomChauffeur = this.ret.nomChauffeur;
        this.variables.PrenomChauffeur = this.ret.prenomChauffeur;
        this.variables.StructureRequerante = this.ret.structureRequerante;
        this.variables.NomDemandeur = this.ret.nomDemandeur;
        this.variables.TelephoneDemandeur = this.ret.telephoneDemandeur;
        this.variables.MailDemandeur = this.ret.mailDemandeur;
        this.variables.NomVictime = this.ret.nomVictime;
        this.variables.NomVictimeComplet = this.ret.nomVictimeComplet;
        this.variables.NomUsage = this.ret.nomUsage;
        this.variables.NomUsageComplet = this.ret.nomUsageComplet;
        this.variables.Prenom = this.ret.prenom;
        this.variables.PrenomComplet = this.ret.prenomComplet;
        this.variables.Adresse = this.ret.adresse;
        this.variables.Telephone = this.ret.telephone;
        this.variables.Mail = this.ret.mail;
        this.variables.Age = this.ret.age;
        this.variables.EnfantCharge = this.ret.enfantCharge;
        this.variables.InfoComplementaire = this.ret.infoComplementaire;
        this.variables.Motif = this.ret.motif;
        this.variables.EnfantPresent = this.ret.enfantPresent;
        this.variables.NbEnfant = this.ret.nbEnfant;
        this.variables.AgeEnfant = this.ret.ageEnfant;
        this.variables.Particularite = this.ret.particularite;
        this.variables.AdresseDepart = this.ret.adresseDepart;
        this.variables.AdresseArrivee = this.ret.adresseArrivee;
        this.variables.AllerRetour = this.ret.allerRetour;
        this.variables.DateCourse = this.ret.dateCourse;
        this.variables.HeureCourseDebut = this.ret.heureCourseDebut;
        this.variables.HeureCourseFin = this.ret.heureCourseFin;
        this.variables.DateCourseVisu = this.ret.dateCourseVisu;
        this.variables.HeureCourseDebutVisu = this.ret.heureCourseDebutVisu;
        this.variables.HeureCourseFinVisu = this.ret.heureCourseFinVisu;
        this.variables.Montant = this.ret.montant;
        this.variables.Peage = this.ret.peage;
        await this.router.navigate([RoutesEnum.FACTURE]);
      } else {
        this.dialogueService.confirm({message: 'Le montant de le course n\'a pas été transmis'});
      }
    } else {
      console.log('Detail ERREUR ');
    }

  }

  async modifier(id: number) {
    this.ret = await this.priseenchargeservice.PriseEnChargeDonneesModif(id);
    if (this.ret != null) {
      if (this.ret.idCourse > 0) {
        this.dialogueService.confirm({message: 'La course a été effectuée, vous ne pouvez pas la  modifier'});
      } else {
        this.variables.IdPriseEnCharge = this.ret.idPriseEnCharge;
        this.variables.IdPrescripteur = this.ret.idPrescripteur;
        this.variables.IdDemande = this.ret.idDemande;
        this.variables.IdVictime = this.ret.idVictime;
        this.variables.NoDemande = this.ret.noDemande;
        this.variables.DateDemande = this.ret.dateDemande;

        await this.router.navigate([RoutesEnum.DEMANDE, RoutesEnum.DEMANDE_EDIT]);
      }
    } else {
      console.log('Detail ERREUR ');
    }

  }

  async supprimer(id: number) {
    const dialogRef = this.dialog.open(SupprimerComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'oui') {
        this.deleteDemande(id);
      }
    });
  }

  async deleteDemande(id: number) {
    this.priseencharge = await this.priseenchargeservice.PriseEnChargeById(id);
    if (this.priseencharge != null) {
      if (this.priseencharge.idcourse > 0) {
        this.dialogueService.confirm({message: 'La course a été effectuée, vous ne pouvez pas la supprimer'});
      } else {
        await this.demandeservice.deleteDemande(this.priseencharge.iddemande);
        await this.victimeservice.deleteVictime(this.priseencharge.idvictime);
        await this.priseenchargeservice.deletePriseEnCharge(this.priseencharge.id);

        this.dataGrid.selectedRowKeys = [];
        await this.dataSource.reload();
        //this.route.navigate([RoutesEnum.ROOT]);
      }
    } else {
      console.log('Detail ERREUR ');
    }
  }

  async PdfVisuFacture(id: number): Promise<void> {
    this.priseencharge = await this.priseenchargeservice.PriseEnChargeById(id);
    if (this.priseencharge != null) {
      if (this.priseencharge.pe_nofacture === '' || this.priseencharge.pe_nofacture == null) {
        this.dialogueService.confirm({message: 'La course n\'est pas facturée.'});
      } else {
        this.viewPdf.showPdf(this.priseencharge.pe_nofacture);
        //await this.utilservice.openFileInNewWindow(this.priseencharge.pe_nofacture);
      }
    } else {
      console.log('Detail ERREUR ');
    }
  }

  // async PdfVisuDemande(id: number): Promise<void> {
  //   this.priseencharge = await this.priseenchargeservice.PriseEnChargeById(id);
  //   if (this.priseencharge != null) {
  //     const rep = this.utilservice.GenererPDF(null, null, this.priseencharge.pe_nodemande, null, null);
  //     rep.then(async (result) => {
  //       await this.utilservice.DownloadFile(this.priseencharge.pe_nodemande);
  //     });
  //   } else {
  //     console.log('Detail ERREUR ');
  //   }
  // }

  async PdfVisuDemande(id: number): Promise<void> {
    this.priseencharge = await this.priseenchargeservice.PriseEnChargeById(id);
    if (this.priseencharge != null) {
      this.showGeneratingPDF = true;
      const rep = this.utilService.GenererPDF(null, null, this.priseencharge.pe_nodemande, null, null);
      this.showGeneratingPDF = false;
      rep.then(async (result) => {
        this.viewPdf.showPdf(this.priseencharge.pe_nodemande);
      });
    } else {
      console.log('Detail ERREUR ');
    }
  }

  ExportExcel() {
    const rep = this.utilService.CSV('export');
    rep.then(result => {
      this.utilService.DownloadFileCSV('export');
    });
  }

  refreshDataGrid(e) {
    this.dataGrid.instance.refresh();
  }

  test() {
  }

  openFilter() {
    this.filterComponent!.showFiltre();
  }

  onApplyFilter(e: any) {
    sessionStorage.setItem('demande_filterData', this.jsonService.stringify(e));
    this.dataSource.filter(this.createFilter(e));
    this.dataSource.reload();
  }

  createFilter(e: any): any[] {
    let filter = [];
    this.filterText = '';

    if (e.numDemande) {
      filter = [ "noDemande", "contains", e.numDemande ];
      this.filterText = 'N° de demande contient : ' + e.numDemande;
    } else if (e.du || e.au) {
      if (e.du && e.au) {
        filter = [
          [ "dateDemande", ">=", e.du ],
          "and",
          [ "dateDemande", "<=", e.au ],
        ]
        this.filterText = 'du ' + formatDate(e.du, 'dd/MM/yyyy') + ' au ' + formatDate(e.au, 'dd/MM/yyyy');
      } else if (e.du) {
        filter = [ "dateDemande", ">=", e.du ];
        this.filterText = 'à partir du ' + formatDate(e.du, 'dd/MM/yyyy');
      } else {
        filter = [ "dateDemande", "<=", e.au ];
        this.filterText = 'jusqu\'au ' + formatDate(e.au, 'dd/MM/yyyy');
      }
    }
    return filter;
  }
}
