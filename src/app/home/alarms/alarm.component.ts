import {Component, OnInit} from '@angular/core';

import {MatDialog, MatDialogConfig} from '@angular/material';

@Component({
  selector: 'app-articles',
  templateUrl: './alarm.component.html'
})
export class AlarmComponent implements OnInit {
  static URL = 'alarm';

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

}

