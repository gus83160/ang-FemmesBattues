import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewChild,
  ElementRef,
  ViewContainerRef, Inject
} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {DOCUMENT, formatDate} from '@angular/common';
import {GlobalVariables} from '../global/global_variables';
import {UtilService} from '../global/util.service';
import {Utilisateur} from '../../../models/utilisateur';
import {UtilisateurService} from '../../../models/utilisateur.service';
import {DialogueService} from '../dialogue/dialogue.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-facture',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.scss']
})
export class FactureComponent implements OnInit, AfterViewInit  {
  // documentPdf: ElementRef;

  pdfGenerated = false;

  @ViewChild('documentpdf', { static: false })
  set _documentPdf(value) {
    const htmlTemplate = value.nativeElement.innerHTML;
    // console.log(htmlTemplate);

    // la page est d'abord généré sans données à cause du *ngIf et du coup renvoi un html sans rien
    // au deuxième passage le html est ok
    if (htmlTemplate.length > 100 && !this.pdfGenerated) {
      if (htmlTemplate && this.variables.NoFacture) {
        this.util.GenererPDF(htmlTemplate, this.variables.NoFacture, null, null, null);
        this.pdfGenerated = true;
      }
    }
  }

  util: UtilService;
  Chauffeur: Utilisateur;
  Payeur: Utilisateur;
  MontantHT: number;
  MontantTVA: number;
  PeageHT: number;
  PeageTVA: number;
  TotalHT: number;
  TotalTTC: number;
  MontantHTAff: string;
  MontantTVAAff: string;
  MontantAff: string;
  PeageHTAff: string;
  PeageTVAAff: string;
  PeageAff: string;
  TotalHTAff: string;
  TotalTTCAff: string;
  DateDuJour: string;
  AffPeage = false;

  resp: HttpResponse<any>;

  constructor(private http: HttpClient,
              private utilisateurservice: UtilisateurService,
              public variables: GlobalVariables,
              private dialogService: DialogueService,
              private ref: ChangeDetectorRef,
              private router: Router,
              @Inject(DOCUMENT) private document) {
  }

  async ngOnInit(): Promise<void> {
    this.util = new UtilService(this.http);
    this.DateDuJour = formatDate(new Date(), 'dd/MM/yyyy', 'fr');

    await this.AdresseChauffeurPayeur();
  }

  async ngAfterViewInit(): Promise<void> {
    // const htmlTemplate = this.document.getElementById('DocumentPDF')?.outerHTML;
    // const htmlTemplate = this.documentPdf?.nativeElement?.innerHTML;

    // console.log(htmlTemplate);
    // if (htmlTemplate && this.variables.NoFacture) {
    //   await this.util.GenererPDF(htmlTemplate, this.variables.NoFacture, null, null, null);
    // }
  }

  async AdresseChauffeurPayeur(): Promise<void> {
    this.Chauffeur = await this.utilisateurservice.UtilisateurByID(this.variables.IdChauffeur);

    try {
      this.Payeur = await this.utilisateurservice.Payeur(this.variables.DepDemande);
    } catch (err) {
      await this.dialogService.confirm({message: 'Pas de payeur trouvé'});
      await this.router.navigate([this.variables.previousUrl]);
    }

    if (this.Payeur != null) {
      this.MontantHT = this.variables.Montant / 1.10;
      this.MontantHTAff = this.MontantHT.toFixed(2);
      this.MontantTVA = this.variables.Montant - this.MontantHT;
      this.MontantTVAAff = this.MontantTVA.toFixed(2);
      this.MontantAff = this.variables.Montant.toFixed(2);
      this.PeageHT = this.variables.Peage / 1.20;
      this.PeageHTAff = this.PeageHT.toFixed(2);
      this.PeageTVA = this.variables.Peage - this.PeageHT;
      this.PeageTVAAff = this.PeageTVA.toFixed(2);
      this.PeageAff = this.variables.Peage.toFixed(2);
      this.TotalHT = this.MontantHT + this.PeageHT;
      this.TotalHTAff = this.TotalHT.toFixed(2);
      this.TotalTTC = this.variables.Montant + this.variables.Peage;
      this.TotalTTCAff = this.TotalTTC.toFixed(2);

      if (this.variables.Peage > 0) {
        this.AffPeage = true;
      }
      this.ref.detectChanges();
    }
  }

  async DocumentPDF(): Promise<void> {
    const data = document.getElementById('DocumentPDF');
    await this.util.GenererPDF(data.outerHTML, this.variables.NoFacture,
      this.variables.NoDemande, this.Payeur.ut_email, this.Chauffeur.ut_email);
  }

}
