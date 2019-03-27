import {Component, OnInit} from '@angular/core';


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

  constructor() {
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
    this.showFileUpload = true;
    console.log('Create service to call API Rest with: ' + this.agreementType + ' and get Agreement to sign.');
  }

  ngOnInit() {
    this.agreementType = '1';
    this.showFileUpload = false;
    console.log('On Init Executed!');
  }
}
