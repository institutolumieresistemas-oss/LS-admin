import { Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-deduccion-rh',
  templateUrl: './deduccion-rh.component.html',
  styleUrl: './deduccion-rh.component.css'
})
export class DeduccionRHComponent implements OnInit, OnChanges {
  @Input() deduccion: any = {
    idConcepto: 0,
    idFormaPago: 1,
    cantidad: '1',
    valorUnitario: '',
    monto: ''
  };
  @Input() conceptos: any;
  @Input() idDepartamento: any;
  @Input() modificar = false;
  @Output() emitidor = new EventEmitter();
  formas = [
    { id: 1, nombre: 'Efectivo' },
    { id: 4, nombre: 'Deposito' }
  ];
  lista: any;
  
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
    const cant = parseFloat(this.deduccion.cantidad) || 1;
    const val = parseFloat(this.deduccion.valorUnitario) || 0;
    this.deduccion.monto = (val * cant).toFixed(2).toString();
    this.emitidor.emit(this.deduccion);
  }
}
