import { ChangeDetectorRef, Component, inject, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective,provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { InputDateComponent } from "../../input-date/input-date.component";
import { DataChartService } from '../../../data/services/data-chart/data-chart.service';
import dateFormat from 'dateformat';
import { gameStatsInterface } from '../../../data/services/interfaces/game-stats.interface';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-radar-chart',
  standalone: true,
  imports: [BaseChartDirective, InputDateComponent],
  templateUrl: './radar-chart.component.html',
  styleUrl: './radar-chart.component.scss',
  providers: [provideCharts(withDefaultRegisterables())],
})
export class radarChartComponent {
  dataService = inject(DataChartService); // Данные с бэка
  dataServices:Array<gameStatsInterface> = [];
  minDate: string = "2023-01-01" // Минимальная дата в данных
  maxDate: string = "2024-01-01" // Максимальная дата
  initialDate: string = '2023-01-01' // Дефолтная дата при загрузке
  receivedDate: string | null = '2023-01-01' // Полученная дата
  @ViewChild(BaseChartDirective) chart!: BaseChartDirective; // Ссылка на график

  constructor (private ngZone: NgZone) {
    Chart.defaults.color = 'white';
    this.dataServices = this.dataService.getGameStatsChartData() ?? []
    this.getData()
  }

  public getData ():void {
    const newDataOne:Array<number> = []
    const newDataTwo:Array<number> = []

    if (localStorage.getItem('radarChartDate') === null) { // Если хранилище пусто
      this.receivedDate = this.initialDate

      const filteredArray = this.dataServices.filter(el => {
        return this.receivedDate === el.date
      })
      
      filteredArray.forEach(el => {
        newDataOne.push(
          el.Dendi.Гибкость,
          el.Dendi.ДобычаЗолота,
          el.Dendi.Осада,
          el.Dendi.Поддержка,
          el.Dendi.Сражение)

        newDataTwo.push(
          el.Satanic.Гибкость,
          el.Satanic.ДобычаЗолота,
          el.Satanic.Осада,
          el.Satanic.Поддержка,
          el.Satanic.Сражение)
      })

      this.radarChartData.datasets[0].data = newDataOne
      this.radarChartData.datasets[1].data = newDataTwo

    } else if (localStorage.getItem('radarChartDate')) {
        this.receivedDate = localStorage.getItem('radarChartDate')

        const filteredArray = this.dataServices.filter(el => {
        return this.receivedDate === el.date
      })
      
      filteredArray.forEach(el => {
        newDataOne.push(
          el.Dendi.Гибкость,
          el.Dendi.ДобычаЗолота,
          el.Dendi.Осада,
          el.Dendi.Поддержка,
          el.Dendi.Сражение)

        newDataTwo.push(
          el.Satanic.Гибкость,
          el.Satanic.ДобычаЗолота,
          el.Satanic.Осада,
          el.Satanic.Поддержка,
          el.Satanic.Сражение)
      })

      this.ngZone.run(() => {
        this.radarChartData.datasets[0].data = newDataOne;
        this.radarChartData.datasets[1].data = newDataTwo;

        if (this.chart && this.chart.chart) {
          this.chart.chart.update();
        }
    })
  }}

  public radarChartData: ChartConfiguration<'radar'>['data'] = {
    labels: ['Гибкость', 'Сражение', 'ДобычаЗолота', 'Осада', 'Поддержка',],
    datasets: [
      {
        label: 'Dendi',
        data: [65, 59, 90, 81, 56, 70, 80],
        backgroundColor: 'rgba(128, 0, 128, 0.5)',
        borderColor: 'black',
        borderWidth: 1,
      },
      {
        label: 'Satanic',
        data: [28, 48, 40, 19, 96, 60, 50],
        backgroundColor: 'rgba(0, 255, 0, 0.5)',
        borderColor: 'black',
        borderWidth: 1,
      },
    ],
  };

  public radarChartOptions: ChartConfiguration<'radar'>['options'] = {
    responsive: true,
    scales: {
      r: {
        angleLines: {
          display: true,
          color: 'rgba(yellow, 0.2)',
          lineWidth: 5,
        },
        grid: {
          color: 'rgba(234, 239, 44,0.2)',
        },
        ticks: {
          color: 'white',
          backdropColor: 'rgba(255, 255, 255, 0)',
        },
        beginAtZero: true,
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
  };

  setCurrentDate(date: Date | null) {
    if (date) {
      this.receivedDate = (dateFormat(date, "UTC:yyyy-mm-dd"));
      localStorage.setItem('radarChartDate',
        this.receivedDate) // Помещаем в local storage выбранную дату
        this.getData()

        } else {
          console.log("Дата не задана.");
        }
}
}
