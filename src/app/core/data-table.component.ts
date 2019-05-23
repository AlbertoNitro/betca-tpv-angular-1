import {Component, Input} from '@angular/core';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-data-table',
  templateUrl: 'data-table.component.html'
})
export class DataTableComponent {

  @Input() title = 'DataTable';
  @Input() columns: Array<String>;
  dataSource: MatTableDataSource<any>;

  @Input()
  set data(data: any[]) {
    this.dataSource = new MatTableDataSource<any>(data);
  }

}
