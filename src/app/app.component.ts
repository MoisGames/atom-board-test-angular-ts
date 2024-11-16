import { Component, NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListChartComponent } from './page/list-chart/list-chart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListChartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
  
},)

export class AppComponent {
  title = 'atom-board-test-angular-ts';
}
