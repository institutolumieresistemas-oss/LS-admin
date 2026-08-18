import { Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-percepcion-rh',
  templateUrl: './percepcion-rh.component.html',
  styleUrl: './percepcion-rh.component.css'
})
export class PercepcionRHComponent implements OnInit, OnChanges {
  @Input() conceptos: any;
  @Input() percepcion: any = {
    id: 0,
    idConcepto: 0,
    idFormaPago: 1,
    valorUnitario: '',
    cantidad: '1',
    monto: ''
  };
  @Input() idDepartamento: any;
  @Output() emitidor = new EventEmitter();
  lista: any;
  formas = [
    { id: 1, nombre: 'Efectivo' },
    { id: 4, nombre: 'Deposito' }
  ];

  constructor(private generales: GeneralesService){}

  ngOnInit(){
    this.cargarLista();
  }

  ngOnChanges(changes: SimpleChanges){
    this.cargarLista();
  }

  cargarLista(){
    if (!this.idDepartamento) return;
    this.lista = (this.idDepartamento.toString() === '1') ? 
      this.generales.sublista(this.conceptos, '1', 'docentes') :
      this.generales.sublista(this.conceptos, '2', 'docentes');
  }

  emitir(){
    const cant = parseFloat(this.percepcion.cantidad) || 1;
    const val = parseFloat(this.percepcion.valorUnitario) || 0;
    this.percepcion.monto = (val * cant).toFixed(2).toString();
    this.emitidor.emit(this.percepcion);
  }
}
