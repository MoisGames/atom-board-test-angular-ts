import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { DataChartService } from '../../../data/services/data-chart/data-chart.service';
import { TempLine } from '../../../data/services/interfaces/temp-line.interface';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { Chart, ChartConfiguration, ChartOptions } from 'chart.js';
import { InputDateComponent } from "../../input-date/input-date.component";
import dateFormat from 'dateformat';
import { SEC_PER_DAY } from '../../../utils/const';
import { draw } from 'patternomaly';
import { FormattedDataService } 
  from '../../../data/services/formatted-data/formatted-data.service';
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
  days: number = 1 // Выбор диапазона
  initialDate: string = '2024-10-01' // Дефолтная дата при загрузке
  receivedDate: string | null = '' // Полученная дата

  // @Output() sendDateEvent = new EventEmitter<string | null>()

  constructor() {
    Chart.defaults.color = 'white';
    this.dataServices = this.dataService
      .getTempLineChartData() ?? []; // Получаем из фейкового сервиса данные
    
      this.getData()
  }

  public getData ():void {
    if (localStorage.getItem('lineChartDate') === null) { // Если хранилище пусто
      this.receivedDate = this.initialDate

      const filteredArray = this.dataServices.filter(el => {
        return this.formattedService
          .formattedDate(el.dateTime) === this.receivedDate
      })

      this.lineChartData.datasets[0].data = filteredArray.map(el => {
        return el.Temp
    })

      this.lineChartData.labels = filteredArray.map(el => {
          return el.dateTime
    })
     
    } else if (localStorage.getItem('lineChartDate')) { // Если в хранилище есть дата
      this.receivedDate = localStorage.getItem('lineChartDate')
        const filteredArray = this.dataServices.filter(el => {
          const dateFromArray = new Date(this.formattedService // Мс в дне по которому ищем
            .formattedDate(el.dateTime)).getTime()
          let currentDay:number // Мс в выбранном дне
          
          if (this.receivedDate !== null) {
            currentDay = new Date(this.receivedDate).getTime();
          } else {
            currentDay = 0
          }
          const lastDay = currentDay + (this.days * SEC_PER_DAY) // Мс в последнем дне
          
          if(dateFromArray >= currentDay && dateFromArray <= lastDay ) {
            return true 
          // Если выбранная дата соответствует тогда вернем массив и запишем его в график
          } else {
            return false
          }
        })

        this.lineChartData.datasets[0].data = filteredArray.map(el => {
          return el.Temp
        }).reverse()
    
          this.lineChartData.labels = filteredArray.map(el => {
              return el.dateTime
        }).reverse()
    }
  }

  // public sendDate ():void {
  //   if (localStorage.getItem('lineChartDate')) {
  //     this.sendDateEvent.emit(this.receivedDate)
  //   } else {
  //     console.log('Введеной даты нет');
      
  //   }
  // }

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

  setCurrentRange(data:number) { // Получаем кол-во дней
      this.days = data
      this.getData()
  }
  setCurrentDate(date:Date | null) { // Получаем дату из инпута
    if (date) {
      this.receivedDate = (dateFormat(date, "UTC:yyyy-mm-dd"));
      localStorage.setItem('lineChartDate',
        this.receivedDate) // Помещаем в local storage выбранную дату
        this.getData()
    } else {
      console.log("Дата не задана.");
    }
  }
}