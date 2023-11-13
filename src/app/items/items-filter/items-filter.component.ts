import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-items-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './items-filter.component.html',
  styleUrls: ['./items-filter.component.scss'],
})
export class ItemsFilterComponent {
  @Output() onChange = new EventEmitter<{
    status: 'all' | 'pending' | 'completed';
  }>();

  selectFilter($event: any) {
    this.onChange.emit({ status: $event.target.value });
  }
}
