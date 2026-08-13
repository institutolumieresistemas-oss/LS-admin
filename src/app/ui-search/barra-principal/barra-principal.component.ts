import { Component } from '@angular/core';
declare function mostrarMenu(): void;
declare function ocultarMenu(): void;
declare function menuEstatus(): boolean;

@Component({
  selector: 'app-barra-principal',
  templateUrl: './barra-principal.component.html',
  styleUrl: './barra-principal.component.css'
})
export class BarraPrincipalComponent {
  abierto = false;

  menu(){
    this.abierto = menuEstatus();
    
    (this.abierto) ? ocultarMenu() : mostrarMenu();
  }
}
