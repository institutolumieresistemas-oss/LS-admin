import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-modal-egreso-directivos',
  templateUrl: './modal-egreso-directivos.component.html',
  styleUrl: './modal-egreso-directivos.component.css'
})
export class ModalEgresoDirectivosComponent {
  @Output() emitidor = new EventEmitter<any>();
  @Input() dato = {
    concepto: '',
    monto: '',
    observaciones: '',
    idRubro: 0,
    idTipo: 0,
    idSucursalGasto: 0,
    idCalendario: 0,
    idFormaPago: 0,
    idNivel: 0,
    imagen: '',
    idCuenta: 0,
    referencia: 1
  };
  @Input() modificar = false;
  @Input() listas = {
    calendarios: [],
    rubros: [],
    tipos: [],
    sucursales: [],
    formas: [],
    niveles: [],
    cuentas: []
  }
  tipos: any;
  calendarios: any;
  constructor(private generales: GeneralesService) { }
  
  ngOnInit(): void {
    if(this.modificar){
      this.buscarTipos();
    }
    this.calendarios = this.generales.calendariosActuales(this.listas.calendarios);
    const sucursalStr = localStorage.getItem('sucursal');

    const sucursal = sucursalStr ? parseInt(sucursalStr) : 0;
    this.dato.idSucursalGasto = (this.generales.validarEntero(this.dato.idSucursalGasto)) ? sucursal : this.dato.idSucursalGasto;
  }

  buscarTipos(){
    this.dato.idTipo = (this.modificar) ? this.dato.idTipo : 0;
    this.tipos = this.generales.sublista(this.listas.tipos, this.dato.idRubro, 'idRubro');
  }

  cambiarFormaPago(forma: any) {
    this.dato.idFormaPago = forma;
    if (forma?.toString() === '1' || forma === 1) {
      this.dato.idCuenta = 0;
    }
  }
  
  emitir() {
    if (this.dato.idFormaPago?.toString() === '1' || this.dato.idFormaPago === 1) {
      this.dato.idCuenta = 0;
    }
    this.emitidor.emit(this.dato);
  }
  
  cerrar() {
    this.generales.cerrarModal();
  }
}
