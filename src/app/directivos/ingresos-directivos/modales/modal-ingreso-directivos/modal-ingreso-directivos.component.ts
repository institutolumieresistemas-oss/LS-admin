import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-modal-ingreso-directivos',
  templateUrl: './modal-ingreso-directivos.component.html',
  styleUrl: './modal-ingreso-directivos.component.css'
})
export class ModalIngresoDirectivosComponent {
  @Output() emitidor = new EventEmitter<any>();
  @Input() dato = {
    concepto: '',
    monto: '',
    observaciones: '',
    idRubro: 0,
    idTipo: 0,
    idCalendario: 0,
    idFormaPago: 0,
    idMetodoPago: 0,
    idNivel: 0,
    idBanco: 0,
    idCuenta: 0,
    imagen: '',
    nombreCuenta: '',
    numeroReferencia: '',
    fecha: ''
  };
  @Input() modificar = false;
  @Input() listas = {
    rubros: [],
    tipos: [],
    calendarios: [],
    formas: [],
    metodos: [],
    niveles: [],
    cuentas: [],
    bancos: [],
    sucursales: [],
    ingresos: []
  }
  tipos: any;
  constructor(private generales: GeneralesService) { }
  
  ngOnInit(): void {
    if(this.modificar){
      this.buscarTipos();
    }else{
      this.dato.fecha = this.generales.hoy();
    }
  }

  actualizarConcepto(){
    if (this.dato.idRubro == 1 && this.dato.idTipo == 1) {
      this.dato.concepto = 'Inscripcion';
    } else if (this.dato.idRubro == 1 && this.dato.idTipo == 2) {
      this.dato.concepto = 'Abono';
    }
  }

  buscarTipos(){
    this.dato.idTipo = (this.modificar) ? this.dato.idTipo : 0;
    this.tipos = this.generales.sublista(this.listas.tipos, this.dato.idRubro, 'idRubro');
    this.actualizarConcepto();
  }

  cambiarTipo(tipo: any){
    this.dato.idTipo = tipo;
    this.actualizarConcepto();
  }
  
  emitir() {
    this.emitidor.emit(this.dato);
  }
  
  cerrar() {
    this.generales.cerrarModal();
  }
}
