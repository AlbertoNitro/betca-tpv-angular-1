import {Component, Inject, OnInit} from '@angular/core';
import {Alarm} from '../alarm.model';
import {MAT_DIALOG_DATA} from '@angular/material';
import {AlarmService} from '../alarm.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-alarm-create-update-dialog',
  templateUrl: './alarm-create-update-dialog.component.html',
  styleUrls: ['./alarm-create-update-dialog.component.css']
})

export class AlarmCreateUpdateDialogComponent implements OnInit {

  alarm: Alarm;
  alarmForm: FormGroup;
  modeDialog: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private alarmService: AlarmService) {
    this.alarm = data.alarm;
    this.modeDialog = data.mode;
  }

  ngOnInit() {
    console.log('on init dialog create update')
    this.alarmForm = new FormGroup({
      code: new FormControl(this.alarm.code),
      refToArticle: new FormControl(this.alarm.refToArticle, [Validators.required]),
      warning: new FormControl(this.alarm.warning, [Validators.min(0)]),
      critical: new FormControl(this.alarm.critical, [Validators.min(0)])
    });
  }

  createOrUpdate() {
    if (this.modeDialog === 'Create') {
      this.create();
    } else {
      this.update();
    }
  }

  create() {
    this.alarmService.create(this.alarmForm.value).subscribe(result => {
      if (result) {
        return true;
      }
    });
  }

  update() {
    this.alarmService.update(this.alarmForm.value).subscribe(result => {
      if (result) {
        return true;
      }
    });
  }
}
