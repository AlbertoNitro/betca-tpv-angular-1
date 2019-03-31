import {Component, OnInit} from '@angular/core';

import {MatDialog, MatDialogConfig} from '@angular/material';
import {AlarmService} from './alarm.service';
import {Alarm} from './alarm.model';
import {CancelYesDialogComponent} from '../../core/cancel-yes-dialog.component';
import {AlarmCreateUpdateDialogComponent} from './alarm-create-update-dialog/alarm-create-update-dialog.component';

@Component({
  selector: 'app-alarms',
  templateUrl: './alarm.component.html'
})
export class AlarmComponent implements OnInit {
  static URL = 'alarm';

  alarm: Alarm;

  title = 'Alarm Management';
  columns = ['code', 'refToArticle', 'warning', 'critical'];
  data: Alarm[];

  constructor(private dialog: MatDialog, private alarmService: AlarmService) {
  }

  ngOnInit(): void {
  }

  updateData(data) {
    console.log(data);
    this.data = data;
  }

  create() {
    const dialogConfig: MatDialogConfig = {
      data: {
        mode: 'Create',
        alarm: {}
      }
    };

    this.dialog.open(AlarmCreateUpdateDialogComponent, dialogConfig).afterClosed().subscribe(
      response => {
        if (response) {
          this.alarmService.readAll().subscribe(
            alarmList => this.data = alarmList
          );
        }
      }
    );
  }

  update(alarm: Alarm) {

    let dialogConfig: MatDialogConfig = null;

    this.alarmService.readOne(alarm.code).subscribe(
      res => {
        dialogConfig = {
          data: {
            mode: 'Update',
            alarm: res
          }
        };

        this.dialog.open(AlarmCreateUpdateDialogComponent, dialogConfig).afterClosed().subscribe(
          response => {
            if (response) {
              this.alarmService.readAll().subscribe(
                alarmList => this.data = alarmList
              );
            }
          }
        );
      }
    );

  }

  delete(alarm: Alarm) {
    this.dialog.open(CancelYesDialogComponent).afterClosed().subscribe(
      result => {
        if (result) {
          this.alarmService.delete(alarm.code).subscribe(
            response => {
              if (response) {
                this.alarmService.readAll().subscribe(
                  alarmList => this.data = alarmList
                );
              }
            });
        }
      }
    );
  }

}

