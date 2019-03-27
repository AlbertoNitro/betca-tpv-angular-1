import {Component, OnInit} from '@angular/core';
import {RgpdService} from './rgpd.service';
import {Rgpd} from './rgpd.model';


@Component({
  selector: 'app-rgpd',
  templateUrl: './rgpd.component.html'
})
export class RGPDComponent implements OnInit {
  static URL = 'rgpd';
  title = 'RGPD management';

  showFileUpload: boolean;
  agreementType: string;
  documentResult;
  rgpd: Rgpd;

  constructor(private rgpdService: RgpdService) {
    this.agreementType = '1';
    this.showFileUpload = false;
    console.log('Constructor Executed!');
  }

  onAgreementSelected(event: Event) {
    const input = event.target;
    const reader = new FileReader();
    reader.onload = () => {
      this.documentResult = reader.result;
      this.documentResult = window.btoa(this.documentResult);
    };
    reader.readAsBinaryString((<HTMLInputElement>input).files[0]);
    console.log('Create service to call API Rest with: ' + this.agreementType + ' and agreement ' + this.documentResult);
  }

  printAgreement() {
    this.rgpd = {agreementType: this.agreementType};
    this.rgpdService.createPrintableAgreement(this.rgpd).subscribe(data => {
      const byteCharacters = window.atob(data.printableAgreement);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], {type: 'application/pdf'});
      const fileURL = URL.createObjectURL(blob);
      window.open(fileURL, '_blank');
      this.showFileUpload = true;
    });
    console.log('Create service to call API Rest with: ' + this.agreementType + ' and get Agreement to sign.');
  }

  ngOnInit() {
    this.agreementType = '1';
    this.showFileUpload = false;
    console.log('On Init Executed!');
  }
}
