import { Directive } from '@angular/core';

export interface PersonContext {
  $implicit: string;
  age: number;
}

@Directive({
  standalone: true,
  selector: 'ng-template[person]',
})
export class PersonDirective {
  static ngTemplateContextGuard(
    dir: PersonDirective,
    ctx: unknown,
  ): ctx is PersonContext {
    return true;
  }
}
