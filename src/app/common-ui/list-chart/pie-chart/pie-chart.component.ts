import { Component, inject, NgZone, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective,provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { draw } from 'patternomaly';
import { InputDateComponent } from "../../input-date/input-date.component";
import { DataChartService } from '../../../data/services/data-chart/data-chart.service';
import { ElectronicSales } from '../../../data/services/interfaces/electronic-sales.interface';
import dateFormat from 'dateformat';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [BaseChartDirective, InputDateComponent],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss',
  providers: [provideCharts(withDefaultRegisterables())],
})
export class PieChartComponent {
  dataService = inject(DataChartService); // Данные с бэка
  dataServices:Array<ElectronicSales> = [];
  minDate: string = "2023-01-01" // Минимальная дата в данных
  maxDate: string = "2023-12-31" // Максимальная дата
  initialDate: string = '2023-01-01' // Дефолтная дата при загрузке
  receivedDate: string | null = '2023-01-01' // Полученная дата
  @ViewChild(BaseChartDirective) chart!: BaseChartDirective; // Ссылка на график

  constructor (private ngZone: NgZone) {
    Chart.defaults.color = 'white';
    this.dataServices = this.dataService.getSalesElectronics() ?? []
    this.getData()
  }

  public getData ():void {
    const newData:Array<number> = []
    let newLabel:Array<string> = []

    if (localStorage.getItem('pieChartDate') === null) { // Если хранилище пусто
      this.receivedDate = this.initialDate

      const filteredArray = this.dataServices.filter(el => {
        return this.receivedDate === el.date
      })
      
      filteredArray.map(el => {
        newData.push(el.Клавиатуры,el.Ноутбуки,el.Телефоны,el.Телевизоры,el.Видеокарты)
      })

      newLabel = Object.keys(filteredArray[0]) 

      this.pieChartData.labels = newLabel.slice(1,6)
      this.pieChartData.datasets[0].data = newData
    } else if (localStorage.getItem('pieChartDate')) {
        this.receivedDate = localStorage.getItem('pieChartDate')

        const filteredArray = this.dataServices.filter(el => {
          return this.receivedDate === el.date
        })
        
        filteredArray.map(el => {
          newData.push(el.Клавиатуры,el.Ноутбуки,el.Телефоны,el.Телевизоры,el.Видеокарты)
        })

        newLabel = Object.keys(filteredArray[0]) 

        this.ngZone.run(() => {
          this.pieChartData.labels = newLabel.slice(1,6)
          this.pieChartData.datasets[0].data = newData
  
          if (this.chart && this.chart.chart) {
            this.chart.chart.update();
          }
    })}
  }
  
  public pieChartData: ChartConfiguration<'pie'>['data']= {
      labels: ['date1','date2','date3','date4','date5'],
      datasets: [
        {
          data: [1,2,5,6,3],
          borderColor: 'black',
          backgroundColor: [ 
            draw('line-vertical', '#1f77b4'),
            draw('diamond-box', 'red'),
            draw('zigzag', 'violet'),
            draw('dot', 'blue'),
            draw('ring', 'green'),
          ],
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

  setCurrentDate(date: Date | null) {
    if (date) {
      this.receivedDate = (dateFormat(date, "UTC:yyyy-mm-dd"));
      localStorage.setItem('pieChartDate',
        this.receivedDate) // Помещаем в local storage выбранную дату
        this.getData()
    } else {
      console.log("Дата не задана.");
    }
}
}
