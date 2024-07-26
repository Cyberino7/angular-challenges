import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardType } from '../../model/card.model';
import { Student } from '../../model/student.model';
import { PictureService } from '../../services/picture.service';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      [list]="students"
      [image]="getPicture()"
      (addEvent)="onAdd()"
      (deleteEvent)="onDelete($event)"
      customClass="bg-light-green"></app-card>
  `,
  standalone: true,
  providers: [PictureService],
  imports: [CardComponent],
})
export class StudentCardComponent implements OnInit {
  students: Student[] = [];

  constructor(
    private http: FakeHttpService,
    private store: StudentStore,
    private pictureService: PictureService,
  ) {}

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));

    this.store.students$.subscribe((s) => (this.students = s));
  }

  public onAdd() {
    this.store.addOne(randStudent());
  }

  public onDelete(id: number) {
    this.store.deleteOne(id);
  }

  public getPicture() {
    return this.pictureService.getCardPicture(CardType.STUDENT);
  }
}
