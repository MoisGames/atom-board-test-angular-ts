import { Component } from '@angular/core';
import { LineChartComponent } from "./line-chart/line-chart.component";

@Component({
  selector: 'app-list-chart',
  standalone: true,
  imports: [LineChartComponent],
  templateUrl: './list-chart.component.html',
  styleUrl: './list-chart.component.scss'
})
export class ListChartComponent {

}
