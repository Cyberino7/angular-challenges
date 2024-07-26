import { CardType } from '../model/card.model';

export class PictureService {
  public getCardPicture(type: CardType) {
    switch (type) {
      case CardType.CITY:
        return 'assets/img/city.png';
      case CardType.STUDENT:
        return 'assets/img/student.webp';
      case CardType.TEACHER:
        return 'assets/img/teacher.png';
      default:
        return '';
    }
  }
}
