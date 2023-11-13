import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemNewComponent } from '../item-new/item-new.component';
import { ItemDetailsComponent } from '../item-details/item-details.component';
import { Item } from '../items.interface';
import { ItemsService } from '../items.service';
import { ItemsFilterComponent } from '../items-filter/items-filter.component';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [
    CommonModule,
    ItemNewComponent,
    ItemDetailsComponent,
    ItemsFilterComponent,
  ],
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent implements OnInit {
  @ViewChild(ItemNewComponent) itemNewComponent!: ItemNewComponent;

  isLoading!: boolean;
  isDeleting!: boolean;

  private allItems!: Item[];

  selectedStatus: 'all' | 'pending' | 'completed' = 'all';

  constructor(private itemsService: ItemsService) {}

  async ngOnInit() {
    try {
      this.allItems = await this.itemsService.findAll();
      console.log(this.allItems);
    } catch (error: any) {
      alert(error.message);
    }
  }

  async submitNewItem(props: { text: string }) {
    console.log(props);


    try {
      const createdItem = await this.itemsService.create({
        text: props.text,
        isChecked: false,
      } as Item);
      console.log(createdItem);
 
      this.itemNewComponent.resetForm();
      this.allItems.push(createdItem);
  
    } catch (error: any) {
      alert(error.message);
    }
  }


  async toggleCheckbox(item: Item, isChecked: boolean) {
    console.log({ isChecked });

    await this.itemsService.update({
      ...item,
      isChecked,
    });
    
    item.isChecked = isChecked;
  }

  async editText(item: Item, text: string) {
    console.log({ text });

    await this.itemsService.update({
      ...item,
      text,
    });

    item.text = text;
  }

  async deleteItem(item: Item) {
    console.log({ item });

    this.isDeleting = true;

    try {
      await this.itemsService.delete({ id: item.id });
      this.allItems = this.allItems.filter((_item) => _item.id !== item.id);
    } catch (error: any) {
      alert(error.message);
    }
    this.isDeleting = false;
  }


  selectFilter(props: { status: 'all' | 'pending' | 'completed' }) {
    console.log(props);

    this.selectedStatus = props.status;
  }

  get filteredItems() {
    let items: Item[];
    // FILTER BY STATUS
    if (this.selectedStatus === 'all') items = this.allItems;
    else
      items = this.allItems.filter((item) =>
        this.selectedStatus === 'pending' ? !item.isChecked : item.isChecked
      );

    // ORDER BY STATUS
    return items
      ?.filter((item) => !item.isChecked)
      .concat(items.filter((item) => item.isChecked));
  }

  get allItemsCount() {
    return this.allItems.length;
  }

  get pendingItemsCount() {
    return this.allItems.filter((item) => !item.isChecked).length;
  }
}
