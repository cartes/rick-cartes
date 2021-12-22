import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Character } from '@app/share/interfaces/character.interface';
import { TrackHttpError } from '@app/share/models/TrackHttpError';
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
  private hideScrollHeight = 200;
  private scrollHeight = 500;
  goUpButton = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private charService: CharacterService,
    private route: ActivatedRoute,
  ) {
    this.queryCharacter();
   }

  ngOnInit(): void {

  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const yScroll = window.pageYOffset;

    if ((yScroll || this.document.documentElement.scrollTop || this.document.body.scrollTop) > this.scrollHeight ) {
      this.goUpButton = true;
    } else if (this.goUpButton && (yScroll || this.document.documentElement.scrollTop || this.document.body.scrollTop) < this.hideScrollHeight) {
      this.goUpButton = false;
    }
  }

  onScrollDown(): void {
    console.log('pass');
    if (this.info.next) {
      this.pageNum++;
      this.getDataFromCharService();
    }
  }

  private queryCharacter(): void {
    this.route.queryParams.pipe(take(1)).subscribe(() => {
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
          if(res?.results?.length) {
            const {info, results} = res;
            this.characters = [...this.characters, ...results];
            console.log(this.characters);
            this.info = info;
          } else {
            this.characters = [];
          }
        }, (error:TrackHttpError) => console.log((error.friendlyMessage))
      )
  }
}
