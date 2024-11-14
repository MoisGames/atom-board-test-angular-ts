import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { DataChartService } from '../../../data/services/data-chart/data-chart.service';
import { TempLine } from '../../../data/services/interfaces/temp-line.interface';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { Chart, ChartConfiguration, ChartOptions } from 'chart.js';
import { InputDateComponent } from "../../input-date/input-date.component";
import dateFormat from 'dateformat';
import { secPerDay } from '../../../utils/const';
import { draw } from 'patternomaly';
import { FormattedDataService } from '../../../data/services/formatted-data/formatted-data.service';
@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [BaseChartDirective, InputDateComponent],
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
  providers: [provideCharts(withDefaultRegisterables())]
})
export class LineChartComponent {
  dataService = inject(DataChartService); // Данные с бэка
  dataServices: Array<TempLine> = [];
  formattedService = inject(FormattedDataService) // Сервис обработки даты
  minDate: string = "2023-11-12" // Минимальная дата в данных
  maxDate: string = "2024-11-12" // Максимальная дата
  currentRange: number = 1 // Выбор диапазона
  initialDate: string = '2024-10-01' // Дефолтная дата при загрузке
  receivedDate: string = '' // Полученная дата
  currentLabel: Array<string> = []
  currentData: Array<string> = []


  constructor() {
    Chart.defaults.color = 'white';
    this.dataServices = this.dataService
      .getTempLineChartData() ?? []; // Получаем из фейкового сервиса данные
    
    this.getFirstData()
  }

  public getFirstData ():void { // Рассчитать данные для графика в первый раз
    // const newLabels: Array<string> = []
    // const newData: Array<string> = []

    if (this.receivedDate === '') {
      this.receivedDate = this.initialDate

      const filteredArray = this.dataServices.filter(el => {
        return this.formattedService.formattedDate(el.dateTime) === this.receivedDate
      })

      this.lineChartData.datasets[0].data = filteredArray.map(el => {
        return el.Temp
    })

      this.lineChartData.labels = filteredArray.map(el => {
          return el.dateTime
    })
     
    } else if (this.receivedDate) {
        const filteredArray = this.dataServices.filter(el => {
          return this.formattedService.formattedDate(el.dateTime) === this.receivedDate
        })

        this.lineChartData.datasets[0].data = filteredArray.map(el => {
          return el.Temp
      })
  
        this.lineChartData.labels = filteredArray.map(el => {
            return el.dateTime
      })
    }
  }

  public lineChartData: ChartConfiguration<'line'>['data']= {
      labels: ['date1','date2','date3','date4','date5'],
      datasets: [
        {
          data: [1,2,5,6,3],
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

  setCurrentRange(data:number) { // Получаем диапазон показа
      this.currentRange = data
  }
  setCurrentDate(date:Date | null) { // Получаем дату из инпута
    if (date) {
      this.receivedDate = (dateFormat(date, "UTC:yyyy-mm-dd"));
      localStorage.setItem('lineChartDate',
        this.receivedDate) // Помещаем в local storage выбранную дату
        this.getFirstData()
    } else {
      console.log("Дата не задана.");
    }
  }
}