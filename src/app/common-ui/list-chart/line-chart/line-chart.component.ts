import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { DataChartService } from '../../../data/services/data-chart/data-chart.service';
import { TempLine } from '../../../data/services/interfaces/temp-line.interface';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
  providers: [provideCharts(withDefaultRegisterables())]
})
export class LineChartComponent {
  dataService = inject(DataChartService);
  dataServices: Array<TempLine> = [];

  constructor() {
    this.dataServices = this.dataService.getTempLineChartData() ?? [];
    this.getFirstData()
  }

  public getFirstData () {
    const firtsLabels: Array<string> = [];
    const firstData: Array<number> = [];

    for (let i = 0; i < this.dataServices.length && i < 3; i++) {
        firtsLabels.push(this.dataServices[i].dateTime);
        firstData.push(this.dataServices[i].Temp);
    }

    this.lineChartData.labels = [...firtsLabels];
    this.lineChartData.datasets[0].data = [...firstData];
  }

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [''],
    datasets: [
      {
        data: [0],
        label: 'Temperature Krasnoyarsk',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: '#0000ff',
      },
    ],
  };

  public pushTemp() {
    const newLabels: Array<string> = [];
    const newDataArr: Array<number> = [];

    // Заполнение новыми данными
    for (let i = 0; i < this.dataServices.length && i < 20; i++) {
        newLabels.push(this.dataServices[i].dateTime);
        newDataArr.push(this.dataServices[i].Temp);
    }

    // Обновление массива с пересозданием ссылок
    this.lineChartData.labels = [...newLabels];  // Используем распаковку для создания новой ссылки
    this.lineChartData.datasets[0].data = [...newDataArr];  // То же самое здесь
}
}