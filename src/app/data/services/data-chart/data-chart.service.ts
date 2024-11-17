import { Injectable } from '@angular/core';
import { TempLine } from '../interfaces/temp-line.interface';
import tempLineData from '../weather_krasnoyarsk.json'
import electronicSales from '../electronic_sales.json'
import dendiSatanicGameStats from '../dendi_satanic_game_stats.json'
import dataCompany from '../data_company.json'
import { ElectronicSales } from '../interfaces/electronic-sales.interface';
import { gameStatsInterface } from '../interfaces/game-stats.interface';
import { BubbleDataArray } from '../interfaces/data-company.Interface';

@Injectable({
  providedIn: 'root'
})
export class DataChartService {
    private tempLineChartData: Array<TempLine> = tempLineData
    private salesPieChartData: Array<ElectronicSales> = electronicSales
    private gameStatsChartData:Array<gameStatsInterface> = dendiSatanicGameStats
    private companyChartData: BubbleDataArray = dataCompany

    constructor () {
      
    }

    getSalesElectronics() {
      return this.salesPieChartData
    }

    getTempLineChartData() {
      return this.tempLineChartData
    }

    getGameStatsChartData() {
      return this.gameStatsChartData
    }

    getBubbleChartData() {
      return this.companyChartData
    }
}
