import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Character } from '@app/share/interfaces/character.interface';
import { TrackHttpError } from '@app/share/models/TrackHttpError';
import { environment } from '@env/environment';
import { CharacterService } from '@share/services/character.service';
import { take } from 'rxjs/operators';

type RequestInfo = {
  next: string;
};
const apiURL = environment.apiURL;

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styles: ['input {width:100%}', '#list-group {left: 12px}'],
})
export class SearcherComponent implements OnInit {
  @Output() idClicked: EventEmitter<any> = new EventEmitter<any>();

  characters: Character[] = [];

  info: RequestInfo = {
    next: '',
  };

  private query: string | undefined;
  private pageNum = 1;
  public search = false;
  public characterURL = apiURL + 'character/';

  constructor(
    private charService: CharacterService,
    private router: Router,

  ) { }

  ngOnInit(): void {}

  onSearch(val: string) {
    if (val && val.length >= 3) {
      this.query = val;
      this.getDataFromServcice();
      this.search = true;
    } else {
      this.characters = [];
      this.search = false;
    }
  }

  onClick(id:number) {
    this.search = false;
    this.idClicked.emit(id);
  }

  private getDataFromServcice(): void {
    this.charService
      .listCharacters(this.query, this.pageNum)
      .pipe(take(1))
      .subscribe((resp: any) => {
        if (resp?.results?.length) {
          const {info, results} = resp;
          this.characters = [];
          this.characters = [...this.characters, ...results];
          this.info = info;
        } else {
          this.characters = []
        }
      }, (error: TrackHttpError) => {
        this.search = true;
        this.characters = [];
      })
  }
}
