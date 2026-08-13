import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.css'
})
export class ProgressComponent {
  @Input() cantidad = 0;
  @Input() total = 0;
  @Input() tipo = '';
  @Input() texto = '';
  @Input() multiple = false;

  @Output() emitidor = new EventEmitter<any>();

  porcentaje = 0;
  fondo = '';
  check = false;
  simbolo = '';
  cantidadTexto = '';
  totalTexto = '';
  
  constructor(private generales: GeneralesService){}

  ngOnInit(): void {
    
    this.calcular();
    this.verificarTipo();
  }

  calcular(){
    this.porcentaje = (this.cantidad * 100) / this.total;
    this.porcentaje = parseInt(this.porcentaje.toString());
    if(this.porcentaje < 50){
      this.fondo = 'bg-danger'
    }if(this.porcentaje >= 50 && this.porcentaje < 100){
      this.fondo = 'bg-yellow';
    }else if(this.porcentaje >= 100){
      this.fondo = 'bg-success';
    }
  }

  verificarTipo(){
    switch (this.tipo.toString()) {
      case '':
        this.simbolo = '';
        this.cantidadTexto = this.cantidad.toString();
        this.totalTexto = this.total.toString();
        break;
      case 'dinero':
        this.simbolo = '$';
        this.cantidadTexto = this.generales.milesNumeros(this.cantidad.toString());
        this.totalTexto = this.generales.milesNumeros(this.total.toString())
        break;
      default:
        break;
    }
  }

  emitir(){
    this.emitidor.emit(this.check);
  }
}
