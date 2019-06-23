import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Order, orderClose} from '../order.model';
import {OrderService} from '../order.service'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  displayedColumns: string[] = ['description', 'requiredAmount', 'finalAmount'];
  dataSource = this.data;
  title = this.data.description;
  constructor(
    private orderService: OrderService,
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: orderClose) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

  closeOrder(data) {
    console.log("data enviada");
    console.log(data);
    this.orderService.closeOrder(data).subscribe(result => {
      if (result) {
        console.log(result);
      }
    });
  }

}
