import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Directive,
  Input,
  TemplateRef,
} from '@angular/core';

export interface ListContext<TItem> {
  $implicit: TItem;
  appList: TItem;
  index: number;
}

@Directive({
  standalone: true,
  selector: 'ng-template[appList]',
})
export class ListDirective<TItem> {
  @Input() appList!: TItem[];

  static ngTemplateContextGuard<TItemContext>(
    dir: ListDirective<TItemContext>,
    ctx: unknown,
  ): ctx is ListContext<TItemContext> {
    return true;
  }
}

@Component({
  selector: 'list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngFor="let item of list; index as i">
      <ng-container
        *ngTemplateOutlet="
          listTemplateRef || emptyRef;
          context: { $implicit: item, appList: item, index: i }
        "></ng-container>
    </div>

    <ng-template #emptyRef>No Template</ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent<TItem extends object> {
  @Input() list!: TItem[];

  @ContentChild(ListDirective, { read: TemplateRef })
  listTemplateRef!: TemplateRef<ListContext<TItem>>;
}
