import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarChartComponent } from './bar-chart.component';
import { DataChartService } from '../../../data/services/data-chart/data-chart.service';
import { ElectronicSales } from '../../../data/services/interfaces/electronic_sales.interface';

const mockData: Array<ElectronicSales> = [
  { date: '2023-01-01', Клавиатуры: 10, Ноутбуки: 5, Телефоны: 15, Телевизоры: 8, Видеокарты: 2 },
  { date: '2023-06-06', Клавиатуры: 12, Ноутбуки: 7, Телефоны: 20, Телевизоры: 5, Видеокарты: 3 }
];

class MockDataChartService {
  getSalesElectronics() {
    return mockData;
  }
}

describe('BarChartComponent', () => {
  let component: BarChartComponent;
  let fixture: ComponentFixture<BarChartComponent>;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: DataChartService, useClass: MockDataChartService }
      ]
    }).compileComponents();
    
    fixture = TestBed.createComponent(BarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy(); // Проверяем, создан ли компонент
  });

  it('should set initial receivedDate to "2023-01-01"', () => {
    if(localStorage.getItem('barChartDate')) {
      expect(component.receivedDate).toBe(localStorage.getItem('barChartDate'));
    } else {
      expect(component.receivedDate).toBe('2023-01-01');
    }
  });

  it('should update receivedDate and get data when setCurrentDate is called', () => {
    const testDate = new Date('2023-06-06');
    component.setCurrentDate(testDate);

    expect(component.receivedDate).toBe('2023-06-06'); // Проверяем установленную дату
    expect(localStorage.getItem('barChartDate')).toBe('2023-06-06'); 
    // Проверяем, что дата сохранена в localStorage

    // Проверяем, что данные обновлены
    const expectedData = [12, 7, 20, 5, 3];
    expect(component.barChartData.datasets[0].data).toEqual(expectedData);
    expect(component.barChartData.datasets[0].label)
      .toBe('Продажи электроники за 2023-06-06'); // Проверяем значение метки
  });
});
