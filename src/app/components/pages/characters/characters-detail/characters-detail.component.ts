import { Component, OnInit, Pipe } from '@angular/core';
import { ActivatedRoute, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';

import { Observable } from 'rxjs';

import { CharacterService } from '@app/share/services/character.service';
import { take, filter } from 'rxjs/operators';

@Component({
  selector: 'app-characters-detail',
  templateUrl: './characters-detail.component.html',
  styleUrls: ['./characters-detail.component.scss']
})
export class CharactersDetailComponent implements OnInit {

  character$!: Observable<any>;

  private id!: any;
  public detail = true;

  constructor(
    private route:ActivatedRoute,
    private CharService:CharacterService,
    private location:Location,
  ) {
    this.onUrlChanged();
  }


  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = this.route.snapshot.paramMap.get("id");
      this.character$ = this.CharService.getCharacterDetail(this.id);

    });

    this.getCharactersByQuery();
  }

  onBack(): void {
    this.location.back();
  }

  onUrlChanged(): void {
    this.route.params.pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.getCharactersByQuery();
      })
  }

  getCharactersByQuery(): void {
    this.route.params
      .pipe(take(1))
      .subscribe((params) => {
        this.id = params['id'];
        this.character$ = this.CharService.getCharacterDetail(this.id);
    });
  }
}
