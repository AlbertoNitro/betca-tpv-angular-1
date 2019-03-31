import {Component, OnInit} from '@angular/core';

import {MatDialog} from '@angular/material';
import {AlarmService} from './alarm.service';
import {Alarm} from './alarm.model';

@Component({
  selector: 'app-alarms',
  templateUrl: './alarm.component.html'
})
export class AlarmComponent implements OnInit {
  static URL = 'alarm';

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

}

