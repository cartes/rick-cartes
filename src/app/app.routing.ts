// modulos

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'home',
        loadChildren: () => import('@pages/home/home.module')
          .then((module) => module.HomeModule)
    },
    {
        path: 'characters/list',
        loadChildren: () => import('@pages/characters/characters-list/characters-list.module')
          .then((module) => module.CharacterListModule)
    },
    {
      path: 'character/:id',
      loadChildren: () => import('@pages/characters/characters-detail/characters-detail.module')
        .then((module) => module.CharacterDetailModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {
        relativeLinkResolution: 'legacy',
    })],
    exports: [RouterModule]
})

export class AppRouting { };
