import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';

@Component({
  selector: 'app-descuento',
  templateUrl: './descuento.component.html',
  styleUrl: './descuento.component.css'
})
export class DescuentoComponent {
  @Input() dato = {
    idConcepto: 0,
    cantidad: '',
    idTipo: 0,
    idMonto: 0
  }
  forzar = false;
  @Input() lista: any;
  @Output() emitidor = new EventEmitter<any>();
  tipos = [
    { id: 2, nombre: '%' },
    { id: 1, nombre: '$' },
  ]
  asignados = [
    { id: 1, nombre: 'Total final' },
    { id: 2, nombre: 'Total curso' }
  ]
  constructor(public generales: GeneralesService){}
  
  ngOnInit(){
    console.log('Lista de descuentos cargada:', this.lista);
  }

  force(){
    console.log('Concepto seleccionado id:', this.dato.idConcepto);
    this.forzar = false; // Resetear siempre al inicio
    
    this.lista.forEach((element: any) => {
      if(element.id.toString() === this.dato.idConcepto.toString()){
        console.log('Elemento de descuento encontrado en la lista:', element);
        // Si element.forzar === 1 o verdadero, se bloquea (forzar = true), de lo contrario se queda libre (forzar = false)
        this.forzar = element.forzar == 1 || element.forzar == true;
        this.dato.idTipo = element.tipo;
        this.dato.cantidad = element.monto;
        this.dato.idMonto = 2;
      }
    });
  }

  emitir(){
    this.emitidor.emit(this.dato);
  }
}
