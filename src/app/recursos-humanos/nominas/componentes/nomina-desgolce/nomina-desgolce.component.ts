import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-nomina-desgolce',
  templateUrl: './nomina-desgolce.component.html',
  styleUrl: './nomina-desgolce.component.css'
})
export class NominaDesgolceComponent {
  @Output() emitidor = new EventEmitter<any>();
  @Output() atras = new EventEmitter<any>();

  @Input() dato = {
    percepciones: Array(),
    deducciones: Array(),
  };
  @Input() idDepartamento: any;
  @Input() percepciones: any;
  @Input() deducciones: any;
  @Input() idEmpleado: any;
  @Input() nominas: any;
  tipo = 0;
  formas = [
    { id: 1, nombre: 'Efectivo' },
    { id: 4, nombre: 'Deposito' }
  ]

  modificarPercepcion = false;
  percepcionSeleccionada: any;

  modificarDeduccion = false;
  deduccionSeleccionada: any;

  total = '0';
  constructor(public generales: GeneralesService) { }
  
  ngOnInit(): void {
    this.calcular();
    if (this.percepciones) {
      this.percepciones.forEach((percepcion: any) => {
        percepcion.id = this.dato.percepciones.length + 1;
        this.dato.percepciones.push(percepcion);
      });
    }
  }

  agregarPercepcion(dato: any){
    let nueva = {
      id: this.dato.percepciones.length + 1,
      cantidad: dato.cantidad,
      idConcepto: dato.idConcepto,
      idFormaPago: dato.idFormaPago,
      monto: dato.monto,
      valorUnitario: dato.valorUnitario
    };
    this.dato.percepciones = this.generales.agregarDatoArray(this.dato.percepciones, nueva);
    this.calcular();
  }

  actualizarPercepcion(dato: any){
    this.dato.percepciones = this.generales.actualizarDatoArray(this.dato.percepciones, dato);
    this.calcular();
  }

  quitarPercepcion(percepcion: any){
    this.dato.percepciones = this.generales.eliminarDatoArray(this.dato.percepciones, percepcion);
    this.calcular();
  }

  agregarDeduccion(dato: any){
    let nueva = {
      id: this.dato.deducciones.length + 1,
      cantidad: dato.cantidad,
      idConcepto: dato.idConcepto,
      idFormaPago: dato.idFormaPago,
      monto: dato.monto,
      valorUnitario: dato.valorUnitario
    }
    this.dato.deducciones = this.generales.agregarDatoArray(this.dato.deducciones, nueva);
    this.calcular();
  }

  actualizarDeduccion(dato: any){
    this.dato.deducciones = this.generales.actualizarDatoArray(this.dato.deducciones, dato);
    this.calcular();
  }

  quitarDeduccion(deduccion: any){
    this.dato.deducciones = this.generales.eliminarDatoArray(this.dato.deducciones, deduccion);
    this.calcular();
  }

  calcular(){
    this.total = '0';
    this.dato.percepciones.forEach((percepcion: any) => {
      this.total = (parseFloat(this.total) + parseFloat(percepcion.monto)).toFixed(2);
    });
    this.dato.deducciones.forEach((deduccion: any) => {
      this.total = (parseFloat(this.total) - parseFloat(deduccion.monto)).toFixed(2);
    });
  }

  emitir() {
    this.emitidor.emit(this.dato);
  }

  back(){
    this.atras.emit(true);
  }
  
  cerrar() {
    this.generales.cerrarModal();
  }
}
