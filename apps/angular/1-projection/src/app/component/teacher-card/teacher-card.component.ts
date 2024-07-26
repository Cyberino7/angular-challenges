import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardType } from '../../model/card.model';
import { Teacher } from '../../model/teacher.model';
import { PictureService } from '../../services/picture.service';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="teachers"
      [image]="getPicture()"
      (addEvent)="onAdd()"
      (deleteEvent)="onDelete($event)"
      customClass="bg-light-red"></app-card>
  `,
  standalone: true,
  providers: [PictureService],
  imports: [CardComponent],
})
export class TeacherCardComponent implements OnInit {
  teachers: Teacher[] = [];

  constructor(
    private http: FakeHttpService,
    private store: TeacherStore,
    private pictureService: PictureService,
  ) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));

    this.store.teachers$.subscribe((t) => (this.teachers = t));
  }

  public onAdd() {
    this.store.addOne(randTeacher());
  }

  public onDelete(id: number) {
    this.store.deleteOne(id);
  }

  public getPicture() {
    return this.pictureService.getCardPicture(CardType.TEACHER);
  }
}
