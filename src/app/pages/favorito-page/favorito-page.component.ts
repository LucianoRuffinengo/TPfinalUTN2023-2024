import { Component } from '@angular/core';

@Component({
  selector: 'app-favorito-page',
  templateUrl: './favorito-page.component.html',
  styleUrls: ['./favorito-page.component.css']
})
export class FavoritoPageComponent {
  flag : boolean =false;

  reinicio(){
    this.flag=!this.flag
  }
}
