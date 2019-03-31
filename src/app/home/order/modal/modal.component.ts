import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Order } from '../order.model';
import {OrderService} from '../order.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(
    private orderService: OrderService,
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Order) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

  closeOrder(data) {
    this.orderService.closeOrder(data).subscribe(result => {
      if (result) {
        console.log(result);
      }
    });
  }

}
