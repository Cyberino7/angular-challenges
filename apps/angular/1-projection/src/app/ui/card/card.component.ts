import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass">
      <img [src]="image" width="200px" />

      <section>
        <app-list-item
          *ngFor="let item of list"
          (deleteEvent)="deleteItem($event)"
          [name]="item.firstName ?? item.name"
          [id]="item.id"></app-list-item>
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()">
        Add
      </button>
    </div>
  `,
  styleUrls: ['../../../styles.scss'],
  standalone: true,
  imports: [NgIf, NgFor, ListItemComponent],
})
export class CardComponent {
  @Input() list!: any[];
  @Input() image!: string;
  @Input() customClass = '';
  @Output() deleteEvent: EventEmitter<number> = new EventEmitter<number>();
  @Output() addEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  addNewItem() {
    this.addEvent.emit(true);
  }

  deleteItem(id: number) {
    this.deleteEvent.emit(id);
  }
}
