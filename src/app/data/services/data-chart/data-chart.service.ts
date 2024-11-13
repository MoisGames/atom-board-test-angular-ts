import { Injectable } from '@angular/core';
import { TempLine } from '../interfaces/temp-line.interface';
import tempLineData from '../weather_krasnoyarsk.json'

@Injectable({
  providedIn: 'root'
})
export class DataChartService {
    private tempLineChartData: Array<TempLine> = tempLineData
    constructor () {
      
    }
    getTempLineChartData() {
      return this.tempLineChartData
    }
    

}
