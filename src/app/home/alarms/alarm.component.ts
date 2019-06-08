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
  dialogConfig: MatDialogConfig;

  constructor(private dialog: MatDialog, private alarmService: AlarmService) {
  }

  ngOnInit(): void {
  }

  updateData(data) {
    console.log(data);
    this.data = data;
  }

  create() {
    this.dialogConfig = {
      data: {
        mode: 'Create',
        alarm: {}
      }
    };

    this.dialog.open(AlarmCreateUpdateDialogComponent, this.dialogConfig).afterClosed().subscribe(
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
    this.alarmService.readOne(alarm.code).subscribe(
      res => {
        this.dialogConfig = {
          data: {
            mode: 'Update',
            alarm: res
          }
        };
        this.dialog.open(AlarmCreateUpdateDialogComponent, this.dialogConfig).afterClosed().subscribe(
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
    this.dialogConfig = {
      data: {
        message: 'The alarm will be deleted.',
        question: 'Are you sure?'
      }
    };
    this.dialog.open(CancelYesDialogComponent, this.dialogConfig).afterClosed().subscribe(
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

