import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public id!: number;
  title = 'rick-cartes';

  public clickID(id:any): void {
    this.id = id;
    console.log(id, 'desde el receptor');
  }

  idClicked(id: number) {
    console.log('Desde el app-root', id)
  }

}
