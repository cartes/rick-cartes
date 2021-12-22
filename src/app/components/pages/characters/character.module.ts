import { CharactersListComponent } from '@characters/characters-list/characters-list.component'
import { CharactersDetailComponent } from "@characters/characters-detail/characters-detail.component";
import { CharacterCardComponent } from './character-card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from '@angular/router';

const componentes = [
  CharactersListComponent,
  CharactersDetailComponent,
  CharacterCardComponent
];

@NgModule({
  declarations: [... componentes],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    InfiniteScrollModule
  ],
  exports: [... componentes]
})

export class CharacterModule {}
