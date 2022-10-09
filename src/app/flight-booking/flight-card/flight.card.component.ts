import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Flight } from '../../entities/flight';

@Component({
  selector: 'flight-card',
  templateUrl: './flight-card.component.html',
})
export class FlightCardComponent {
  @Input() item: Flight | undefined;
  @Input() selectedItem: Flight | undefined;
  @Output() selectedItemChange = new EventEmitter<Flight>();

  select() {
    this.selectedItemChange.emit(this.item);
  }
}
