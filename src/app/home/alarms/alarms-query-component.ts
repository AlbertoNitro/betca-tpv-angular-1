import {Component, EventEmitter, Output} from '@angular/core';

import {AlarmService} from './alarm.service';
import {Alarm} from './alarm.model';

@Component({
  selector: 'app-alarm-query',
  templateUrl: './alarms-query.component.html',
  styleUrls: ['./alarms-query.component.css']
})
export class AlarmsQueryComponent {

  alarm: Alarm;
  data: Alarm[];
  @Output() emitter = new EventEmitter<Alarm[]>();

  constructor(private alarmService: AlarmService) {
    this.resetSearch();
    this.data = null;
  }

  search() {
    this.alarmService.readAll().subscribe(
      data => {
        this.data = data;
        console.log(this.data);
        this.emitter.emit(this.data);
      }
    );
  }

  resetSearch() {
    this.alarm = {code: null, refToArticle: null, warning: null, critical: null};
  }
}
