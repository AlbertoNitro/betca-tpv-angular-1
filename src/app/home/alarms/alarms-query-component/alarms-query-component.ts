import {Component, EventEmitter, Output} from '@angular/core';
import {AlarmService} from './alarm.service';
import {Alarm} from './alarm.model';

@Component({
  selector: 'app-alarm-query',
  templateUrl: './alarms-query.component.html',
  styleUrls: ['./alarms-query-component/alarms-query.component.css']
})
export class AlarmsQueryComponent {

  alarm: Alarm;
  warningGreaterToZero: boolean;
  criticalGreaterToZero: boolean;
  data: Alarm[];
  @Output() emitter = new EventEmitter<Alarm[]>();

  constructor(private alarmService: AlarmService) {
    this.resetSearch();
    this.data = null;
  }

  search() {
    if (this.warningGreaterToZero && this.criticalGreaterToZero) {
      this.searchWarningAndCritical();
    } else if (this.warningGreaterToZero) {
      this.searchWarning();
    } else if (this.criticalGreaterToZero) {
      this.searchCritical();
    } else {
      this.searchAll();
    }
  }

  searchAll() {
    this.alarmService.readAll().subscribe(
      data => {
        this.data = data;
        console.log(this.data);
        this.emitter.emit(this.data);
      }
    );
  }

  searchWarningAndCritical() {
    this.alarmService.readAll().subscribe(
      data => {
        this.data = data.filter( a => (a.warning > 0) && (a.critical > 0) );
        console.log(this.data);
        this.emitter.emit(this.data);
      }
    );
  }

  searchWarning() {
    this.alarmService.readAll().subscribe(
      data => {
        this.data = data.filter( a => a.warning > 0 );
        console.log(this.data);
        this.emitter.emit(this.data);
      }
    );
  }

  searchCritical() {
    this.alarmService.readAll().subscribe(
      data => {
        this.data = data.filter( a => a.critical > 0 );
        console.log(this.data);
        this.emitter.emit(this.data);
      }
    );
  }

  resetSearch() {
    this.warningGreaterToZero = false;
    this.criticalGreaterToZero = false;
    this.alarm = {code: null, refToArticle: null, warning: null, critical: null};
  }
}
