import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListChartComponent } from './list-chart.component';

describe('ListChartComponent', () => {
  let component: ListChartComponent;
  let fixture: ComponentFixture<ListChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
