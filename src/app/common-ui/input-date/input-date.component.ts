import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-input-date',
  standalone: true,
  imports: [],
  templateUrl: './input-date.component.html',
  styleUrl: './input-date.component.scss'
})
export class InputDateComponent {
    @Input() minValue: string = '01.10.2024'
    @Input() maxValue: string = '11.11.2024'
    @Output() currentRangeEvent = new EventEmitter<number>()
    @Output() currentDateEvent = new EventEmitter<Date | null>()

    

    setCurrentRange(num:number) {
      this.currentRangeEvent.emit(num)
    }
    setCurrentDate(date:Date | null) {
      this.currentDateEvent.emit(date)
    }
}
