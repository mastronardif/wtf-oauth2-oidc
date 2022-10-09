import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Flight } from '../../entities/flight';

@Component({
  selector: 'alt-flight-card',
  templateUrl: 'alt-flight-card.component.html',
})
export class AltFlightCardComponent {
  @Input() item: Flight | undefined;
  @Input() selected: boolean | undefined;
  @Output() selectedChange = new EventEmitter<boolean>();

  select() {
    this.selectedChange.emit(true);
  }
}
