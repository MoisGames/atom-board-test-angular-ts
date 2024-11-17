import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieChartComponent } from './pie-chart.component';
import { DataChartService } from '../../../data/services/data-chart/data-chart.service';
import { ElectronicSales } from '../../../data/services/interfaces/electronic-sales.interface';

const mockData: Array<ElectronicSales> = [
  { date: '2023-01-01', Клавиатуры: 10, Ноутбуки: 5, Телефоны: 15, Телевизоры: 8, Видеокарты: 2 },
  { date: '2023-06-06', Клавиатуры: 12, Ноутбуки: 7, Телефоны: 20, Телевизоры: 5, Видеокарты: 3 }
];

class MockDataChartService {
  getSalesElectronics() {
    return mockData;
  }
}

describe('PieChartComponent', () => {
  let component: PieChartComponent;
  let fixture: ComponentFixture<PieChartComponent>;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: DataChartService, useClass: MockDataChartService }
      ]
    }).compileComponents();
    
    fixture = TestBed.createComponent(PieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy(); // Проверяем, создан ли компонент
  });

  it('should set initial receivedDate to "2023-01-01"', () => {
    if(localStorage.getItem('pieChartDate')) {
      expect(component.receivedDate).toBe(localStorage.getItem('pieChartDate'));
    } else {
      expect(component.receivedDate).toBe('2023-01-01');
    }
  });

  it('should update receivedDate and get data when setCurrentDate is called', () => {
    const testDate = new Date('2023-06-06');
    component.setCurrentDate(testDate);

    expect(component.receivedDate).toBe('2023-06-06'); // Проверяем установленную дату
    expect(localStorage.getItem('pieChartDate')).toBe('2023-06-06'); 
    // Проверяем, что дата сохранена в localStorage

    // Проверяем, что данные обновлены
    const expectedData = [12, 7, 20, 5, 3];
    expect(component.pieChartData.datasets[0].data).toEqual(expectedData);
  });
});
