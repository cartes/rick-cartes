import { HttpRequest } from '@angular/common/http';
import { Component, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { Character } from '@app/share/interfaces/character.interface';
import { CharacterService } from '@app/share/services/character.service';
import { take } from 'rxjs/operators';

type RequestInfo = {
  count: number
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  info: RequestInfo = {
    count: 0,
  };

  characters: Character[] = [];
  private randomChar: Array<number> = [];

  constructor(
    private charService: CharacterService
  ) { }

  ngOnInit(): void {
    this.getInfoCharacters();
  }

  getHoneCharacters(): void {
    for (var i = 0; i<3; i++) {
      var randomID = Math.floor(Math.random() * this.info.count);
      this.randomChar.push(randomID);
    }
    this.charService.getCharacterDetail(this.randomChar)
      .pipe(take(1))
      .subscribe(
        (res: any) => {
          console.log(res);
          if(res?.length) {
            this.characters = res;
            console.log(this.characters);
          } else {
            this.characters = [];
          }
        }
      )
  }

  getInfoCharacters(): void {
    this.charService
      .getNumberOfCharacters()
      .pipe(take(1))
      .subscribe(
        (res: any) => {
          if (res?.results?.length) {
            const {info, results} = res;
            this.info = info;
            this.getHoneCharacters();
          } else {
            this.info = {
              count: 0
            }
          }
        }
      )
  }
}
