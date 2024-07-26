import { Component, OnInit } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardType } from '../../model/card.model';
import { City } from '../../model/city.model';
import { PictureService } from '../../services/picture.service';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [list]="cities"
      [image]="getPicture()"
      (addEvent)="onAdd()"
      (deleteEvent)="onDelete($event)"
      customClass="bg-light-blue"></app-card>
  `,
  standalone: true,
  providers: [PictureService],
  imports: [CardComponent],
})
export class CityCardComponent implements OnInit {
  cities: City[] = [];

  constructor(
    private http: FakeHttpService,
    private store: CityStore,
    private pictureService: PictureService,
  ) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((t) => this.store.addAll(t));

    this.store.cities$.subscribe((t) => (this.cities = t));
  }

  public onAdd() {
    this.store.addOne(randomCity());
  }

  public onDelete(id: number) {
    this.store.deleteOne(id);
  }

  public getPicture() {
    return this.pictureService.getCardPicture(CardType.CITY);
  }
}
