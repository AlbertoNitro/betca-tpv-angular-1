import {Component} from '@angular/core';
import {RgpdService} from './rgpd.service';
import {Rgpd} from './rgpd.model';


@Component({
  selector: 'app-rgpd',
  templateUrl: './rgpd.component.html'
})
export class RGPDComponent {
  static URL = 'rgpd';
  title = 'RGPD management';

  acceptedRgpd: boolean;
  showFileUpload: boolean;
  agreementType: string;
  documentResult;
  rgpd: Rgpd;

  constructor(private rgpdService: RgpdService) {
    this.rgpdService.getUserAgreement().subscribe(data => {
      this.acceptedRgpd = data.accepted;
      this.rgpd = data;
    });
    this.agreementType = '1';
    this.showFileUpload = false;
  }

  onAgreementSelected(event: Event) {
    const input = event.target;
    const reader = new FileReader();
    reader.onload = () => {
      this.documentResult = reader.result;
      this.documentResult = window.btoa(this.documentResult);
      this.rgpd.printableAgreement = this.documentResult;
      this.rgpd.agreementType = this.agreementType;
      this.rgpdService.createUserAgreement(this.rgpd).subscribe(data => {
        this.acceptedRgpd = data.accepted;
        this.agreementType = data.agreementType;
        this.rgpd = data;
      }, (error => {
        console.log(error);
      }));
    };
    reader.readAsBinaryString((<HTMLInputElement>input).files[0]);
  }

  printAgreement() {
    this.rgpd = {agreementType: this.agreementType};
    this.rgpdService.createPrintableAgreement(this.rgpd).subscribe(data => {
      this.openBase64EncodedPdf(data.printableAgreement);
      this.showFileUpload = true;
    });
  }

  showUserAgreement() {
    this.openBase64EncodedPdf(this.rgpd.printableAgreement);
  }

  revokeUserAgreement() {
    this.rgpdService.deleteUserAgreement().subscribe(() => {
      this.acceptedRgpd = false;
      this.showFileUpload = false;
      this.agreementType = '1';
    });
  }

  openBase64EncodedPdf(content) {
    const byteCharacters = window.atob(content);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], {type: 'application/pdf'});
    const fileURL = URL.createObjectURL(blob);
    window.open(fileURL, '_blank');
  }
}
