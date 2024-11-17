import { Component, inject, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartOptions } from 'chart.js';
import { ElectronicSales } from '../../../data/services/interfaces/electronic-sales.interface';
import { DataChartService } from '../../../data/services/data-chart/data-chart.service';
import dateFormat from 'dateformat';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { InputDateComponent } from '../../input-date/input-date.component';
import { BubbleDataArray } from '../../../data/services/interfaces/data-company.Interface';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-bubble-chart',
  standalone: true,
  imports: [BaseChartDirective, InputDateComponent],
  templateUrl: './bubble-chart.component.html',
  styleUrl: './bubble-chart.component.scss',
  providers: [provideCharts(withDefaultRegisterables())],
})
export class bubbleChartComponent {
  dataService = inject(DataChartService); // Данные с бэка
  dataServices: BubbleDataArray = [];
  minDate: string = "2023-01-01" // Минимальная дата в данных
  maxDate: string = "2023-12-31" // Максимальная дата
  initialDate: string = '2023-01-01' // Дефолтная дата при загрузке
  receivedDate: string | null = '2023-01-01' // Полученная дата
  @ViewChild(BaseChartDirective) chart!: BaseChartDirective; // Ссылка на график

    constructor (private ngZone: NgZone) {
      Chart.defaults.color = 'white';
      this.dataServices = this.dataService.getBubbleChartData() ?? []
      
      this.getData()
    }

  public getData ():void {

    if (localStorage.getItem('bubbleChartDate') === null) {
       // Если хранилище пусто
      this.receivedDate = this.initialDate
      
      const filteredArray = Object.entries(this.dataServices[0]).filter(el => {
        return el[0] === this.receivedDate
      })

      this.ngZone.run(() => {
        this.bubbleChartData.datasets[0].data[0] = filteredArray[0][1][0]
        this.bubbleChartData.datasets[0].data[1] = filteredArray[0][1][1]
        this.bubbleChartData.datasets[0].data[2] = filteredArray[0][1][2]

        if (this.chart && this.chart.chart) {
          this.chart.chart.update();
        }
    })
      
    } else if (localStorage.getItem('bubbleChartDate')) {

      this.receivedDate = localStorage.getItem('bubbleChartDate')

      const filteredArray = Object.entries(this.dataServices[0]).filter(el => {
        return el[0] === this.receivedDate
      })    

      this.ngZone.run(() => {
        this.bubbleChartData.datasets[0].data[0] = filteredArray[0][1][0]
        this.bubbleChartData.datasets[0].data[1] = filteredArray[0][1][1]
        this.bubbleChartData.datasets[0].data[2] = filteredArray[0][1][2]

        if (this.chart && this.chart.chart) {
          this.chart.chart.update();
        }
    })
  }
}
  
  
  public bubbleChartData: ChartConfiguration<'bubble'>['data']= {
      datasets: [
        {
          "label": "Яндекс",
          "data": [
            { "x": 20, "y": 30, "r": 20 },  
            { "x": 25, "y": 25, "r": 25 },   
            { "x": 30, "y": 15, "r": 30 }  
          ],
          "backgroundColor": "rgba(255, 0, 0, 0.3)"
        },
        {
          "label": "GreenAtom",
          "data": [
            { "x": 20, "y": 30, "r": 20 },  
            { "x": 25, "y": 25, "r": 25 },   
            { "x": 30, "y": 15, "r": 30 }  
          ],
          "backgroundColor": "rgba(60, 179, 113, 0.7)"
        },
        {
          "label": "Google",
          "data": [
            { "x": 35, "y": 5, "r": 5 },     
            { "x": 30, "y": 20, "r": 12 },    
            { "x": 40, "y": 25, "r": 18 }   
          ],
          "backgroundColor": "rgba(106, 90, 205, 0.5)"
        }
      ],
  };

  public bubbleChartOptions: ChartOptions<'bubble'> = {
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
      localStorage.setItem('bubbleChartDate',
        this.receivedDate) // Помещаем в local storage выбранную дату
        this.getData()
    } else {
      console.log("Дата не задана.");
    }
}
}
