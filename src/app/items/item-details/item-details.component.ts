import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Item } from '../items.interface';

@Component({
  selector: 'app-item-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss'],
})
export class ItemDetailsComponent {
  @Input({ required: true }) item!: Item;
  @Output() onToggle = new EventEmitter<boolean>();
  @Output() onTextEdit = new EventEmitter<string>();
  @Output() onDelete = new EventEmitter<void>();

  toggleCheckbox($event: any) {
    const isChecked = $event.target.checked;

    this.onToggle.emit(isChecked);
  }

  editText(editedText: string) {
    this.onTextEdit.emit(editedText);
  }

  deleteItem() {
    this.onDelete.emit();
  }

  
}
