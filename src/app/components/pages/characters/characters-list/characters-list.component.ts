import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Character } from '@app/share/interfaces/character.interface';
import { CharacterService } from '@app/share/services/character.service';
import { take } from 'rxjs/operators';

type RequestInfo = {
  next: any
};

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss']
})
export class CharactersListComponent implements OnInit {

  characters: Character[] = [];

  info: RequestInfo = {
    next: null,
  };
  private query: string = '';
  private pageNum = 1;
  public detail = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private charService: CharacterService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.queryCharacter();
  }

  private queryCharacter(): void {
    this.route.queryParams.pipe(take(1)).subscribe((_params: any) => {
        this.query = '';
        this.getDataFromCharService();
      });
  }

  private getDataFromCharService(): void {
    this.charService
      .listCharacters(this.query, this.pageNum)
      .pipe(take(1))
      .subscribe(
        (res: any) => {
          console.log(res);
          if(res?.results?.length) {
            const {info, results} = res;
            this.characters = [...this.characters, ...results];
            console.log(this.characters);
            this.info = info;
          } else {
            this.characters = [];
          }
        }
      )
  }
}
