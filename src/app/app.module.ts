import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRouting } from './app.routing';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SearcherComponent } from './components/searcher/searcher.component';
import { HomeModule } from '@pages/home/home.module';

import { HttpClientModule } from '@angular/common/http';
import { CharacterModule } from '@pages/characters/character.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearcherComponent,
  ],
  imports: [
    BrowserModule,
    AppRouting,
    HomeModule,
    CharacterModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
