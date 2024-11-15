import { Component } from '@angular/core';
import { Chart, ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective,provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { draw } from 'patternomaly';
import { InputDateComponent } from "../../input-date/input-date.component";
@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [BaseChartDirective, InputDateComponent],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss',
  providers: [provideCharts(withDefaultRegisterables())],
})
export class PieChartComponent {
    constructor () {
      Chart.defaults.color = 'white';
    }

    public pieChartData: ChartConfiguration<'pie'>['data']= {
      labels: ['date1','date2','date3','date4','date5'],
      datasets: [
        {
          data: [1,2,5,6,3],
          label: 'Temperature Krasnoyarsk 2023-2024',
          borderColor: 'black',
          backgroundColor: [ draw('line-vertical', '#1f77b4')],
        },
    ],
  };

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      title: {
        color: 'white',
        
      }
    }
  };
}
