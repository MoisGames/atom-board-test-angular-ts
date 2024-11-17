import { Component } from '@angular/core';
import { LineChartComponent } from '../../common-ui/list-chart/line-chart/line-chart.component';
import { PieChartComponent } from "../../common-ui/list-chart/pie-chart/pie-chart.component";
import { BarChartComponent } from "../../common-ui/list-chart/bar-chart/bar-chart.component";
import { radarChartComponent } from "../../common-ui/list-chart/radar-chart/radar-chart.component";
import { bubbleChartComponent } from "../../common-ui/list-chart/bubble-chart/bubble-chart.component";
import { doughnutChartComponent } from "../../common-ui/list-chart/doughnut-chart/doughnut-chart.component";


@Component({
  selector: 'app-list-chart',
  standalone: true,
  imports: [LineChartComponent, PieChartComponent, BarChartComponent, radarChartComponent, bubbleChartComponent, doughnutChartComponent],
  templateUrl: './list-chart.component.html',
  styleUrl: './list-chart.component.scss'
})
export class ListChartComponent {

}
