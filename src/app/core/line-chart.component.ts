import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-line-chart',
  templateUrl: 'line-chart.component.html'
})
export class LineChartComponent {

  @Input() autoScale = false;
  @Input() colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  @Input() data: any[];
  @Input() gradient = false;
  @Input() showLegend = true;
  @Input() showXAxis = true;
  @Input() showXAxisLabel = true;
  @Input() showYAxis = true;
  @Input() showYAxisLabel = true;
  @Input() view: undefined;
  @Input() xAxisLabel: string;
  @Input() yAxisLabel: string;

 constructor() {}

}
