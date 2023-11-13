import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-item-new',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './item-new.component.html',
  styleUrls: ['./item-new.component.scss'],
})
export class ItemNewComponent {
  @Output() onSubmit = new EventEmitter<{ text: string }>();
  itemsForm = this.fb.group({
    text: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  invalidField(formControlName: string) {
    const field = this.itemsForm.get(formControlName);
    return field && field.invalid && (field.dirty || field.touched);
  }

  resetForm() {
    this.itemsForm.reset();
  }

  submit() {
    if (!this.itemsForm.valid) return this.itemsForm.markAllAsTouched();

    this.onSubmit.emit(this.itemsForm.value as { text: string });
  }
}
