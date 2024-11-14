import { Injectable } from '@angular/core';
import dateFormat from 'dateformat';

@Injectable({
  providedIn: 'root'
})
export class FormattedDataService {

  constructor() { }

  formattedDate(dateTime:string) {
    // Разбиваем строку на компоненты
    const [day, month, year] = dateTime.split(' ')[0].split('.');
    // Создаем новый объект Date с использованием года, месяца и дня
    const date = new Date(+year, +month - 1, +day);
    // Форматируем новую дату в нужный формат "гггг-месяц-дд"
    const formattedDate = dateFormat(date, "yyyy-mm-dd");
  }
}
