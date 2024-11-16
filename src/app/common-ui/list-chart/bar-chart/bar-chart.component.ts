import { Component, inject } from '@angular/core';
import { Chart, ChartConfiguration, ChartOptions } from 'chart.js';
import { ElectronicSales } from '../../../data/services/interfaces/electronic_sales.interface';
import { DataChartService } from '../../../data/services/data-chart/data-chart.service';
import { draw } from 'patternomaly';
import dateFormat from 'dateformat';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { InputDateComponent } from '../../input-date/input-date.component';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [BaseChartDirective, InputDateComponent],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss',
  providers: [provideCharts(withDefaultRegisterables())],
})
export class BarChartComponent {
  dataService = inject(DataChartService); // Данные с бэка
  dataServices:Array<ElectronicSales> = [];
  minDate: string = "2023-01-01" // Минимальная дата в данных
  maxDate: string = "2023-12-31" // Максимальная дата
  initialDate: string = '2023-01-01' // Дефолтная дата при загрузке
  receivedDate: string | null = '2023-01-01' // Полученная дата
  labelDate: string | null = '2023-06-06' // Дата для label

    constructor () {
      Chart.defaults.color = 'white';
      this.dataServices = this.dataService.getSalesElectronics() ?? []
      this.getData()
      
    }

  public getData ():void {
    const newData:Array<number> = []
    let newLabel:Array<string> = []

    if (localStorage.getItem('barChartDate') === null) { // Если хранилище пусто
      this.receivedDate = this.initialDate
      this.barChartData.datasets[0].label = `Продажи электроники за ${this.receivedDate}`

      const filteredArray = this.dataServices.filter(el => {
        return this.receivedDate === el.date
      })
      
      filteredArray.map(el => {
        newData.push(el.Клавиатуры,el.Ноутбуки,el.Телефоны,el.Телевизоры,el.Видеокарты)
      })

      newLabel = Object.keys(filteredArray[0]) 
      
      this.barChartData.labels = newLabel.slice(1,6)
      this.barChartData.datasets[0].data = newData
    } else if (localStorage.getItem('barChartDate')) {
        this.receivedDate = localStorage.getItem('barChartDate')
        this.barChartData.datasets[0].label = `Продажи электроники за ${this.receivedDate}`

        const filteredArray = this.dataServices.filter(el => {
          return this.receivedDate === el.date
        })
        
        filteredArray.map(el => {
          newData.push(el.Клавиатуры,el.Ноутбуки,el.Телефоны,el.Телевизоры,el.Видеокарты)
        })

        newLabel = Object.keys(filteredArray[0]) 
        
        this.barChartData.labels = newLabel.slice(1,6)
        this.barChartData.datasets[0].data = newData
    }
  }
  
  public barChartData: ChartConfiguration<'bar'>['data']= {
      labels: ['date1','date2','date3','date4','date5'],
      datasets: [
        {
          data: [1,2,5,6,3],
          label: `Продажи электроники за ${this.receivedDate}`,
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

  public barChartOptions: ChartOptions<'bar'> = {
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
      localStorage.setItem('barChartDate',
        this.receivedDate) // Помещаем в local storage выбранную дату
        this.getData()
    } else {
      console.log("Дата не задана.");
    }
}
}
