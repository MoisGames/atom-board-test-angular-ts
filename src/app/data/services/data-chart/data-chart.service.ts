import { Injectable } from '@angular/core';
import { TempLine } from '../interfaces/temp-line.interface';
import tempLineData from '../weather_krasnoyarsk.json'
import electronic_sales from '../electronic_sales.json'
import { ElectronicSales } from '../interfaces/electronic_sales.interface';

@Injectable({
  providedIn: 'root'
})
export class DataChartService {
    private tempLineChartData: Array<TempLine> = tempLineData
    private salesPieChartData: ElectronicSales = electronic_sales
    constructor () {
      
    }

    getSalesElectronics() {
      return this.salesPieChartData
    }

    getTempLineChartData() {
      return this.tempLineChartData
    }
    

}
