import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { DataChartService } from '../../../data/services/data-chart/data-chart.service';
import { TempLine } from '../../../data/services/interfaces/temp-line.interface';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { Chart, ChartConfiguration, ChartOptions } from 'chart.js';
import { InputDateComponent } from "../../input-date/input-date.component";
import dateFormat from 'dateformat';
import { secPerDay } from '../../../utils/const';
import { draw,generate } from 'patternomaly';
@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [BaseChartDirective, InputDateComponent],
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
  providers: [provideCharts(withDefaultRegisterables())]
})
export class LineChartComponent {
  dataService = inject(DataChartService);
  dataServices: Array<TempLine> = [];
  minDate: string = "2023-11-12"
  maxDate: string = "2024-11-12"
  currentRange: number = 30
  currentDate: number = Date.now()
  

  constructor() {
    Chart.defaults.color = 'white';
    this.dataServices = this.dataService.getTempLineChartData() ?? [];
    this.getFirstData()
    
  }

  public getFirstData ():void {
    const firtsLabels: Array<string> = [];
    const firstData: Array<number> = [];

    for (let i = 0; i < this.dataServices.length && i < 3; i++) {
        firtsLabels.push(this.dataServices[i].dateTime);
        firstData.push(this.dataServices[i].Temp);
    }

    this.lineChartData.labels = [...firtsLabels];
    this.lineChartData.datasets[0].data = [...firstData];
  }

  public lineChartData: ChartConfiguration<'line'>['data']= {
      labels: ['1','2'],
      datasets: [
        {
          data: [1,2],
          label: 'Temperature Krasnoyarsk 2023-2024',
          fill: true,
          tension: 0.5,
          borderColor: 'black',
          backgroundColor: [ draw('line-vertical', '#1f77b4')],
        },
    ],
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      title: {
        color: 'white',
        
      }
    }
  };

  public pushTemp():void {
    const newLabels: Array<string> = [];
    const newDataArr: Array<number> = [];

    for (let i = 0; i < this.dataServices.length && i < this.currentRange; i++) {
        newLabels.push(this.dataServices[i].dateTime);
        newDataArr.push(this.dataServices[i].Temp);
    }

    
    this.lineChartData.labels = [...newLabels]; 
    this.lineChartData.datasets[0].data = [...newDataArr];
  }

  setCurrentRange(data:number) {
      this.currentRange = data
  }
  setCurrentDate(date:Date | null) {
      console.log(typeof(date));
  }
}