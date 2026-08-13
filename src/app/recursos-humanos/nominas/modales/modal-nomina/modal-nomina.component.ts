import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-modal-nomina',
  templateUrl: './modal-nomina.component.html',
  styleUrl: './modal-nomina.component.css'
})
export class ModalNominaComponent {
  @Output() emitidor = new EventEmitter<any>();
  @Input() dato = {
    empleado: {
      idNivel: 0,
      idCalendario: 0,
      idDepartamento: 0,
      idPuesto: 0,
      idEmpleado: 0,
      quincena: '',
      inicio: '',
      fin: '',
      expedicion: '',
      observaciones: '',
      idBanco: 0
    },
    desgloce: {
      percepciones: Array(),
      deducciones: Array()
    }
  };
  @Input() listas = {
    niveles: [],
    calendarios: [],
    departamentos: [],
    puestos: [],
    empleados: [],
    deducciones: [],
    percepciones: [],
    bancos: [],
    sucursales: [],
    formaspagos: [],
    nominas: [],
    actuales: [],
    conceptospercepciones: [],
    conceptosdeducciones: []
  }
  @Input() modificar = false;
  accion = 1;
  constructor(private generales: GeneralesService) { }
  
  ngOnInit(): void {
    this.generales.delay(2000).then(fun => {
      this.dato.empleado.idCalendario = Number(localStorage.getItem('calendario') ?? 0);
      
    });
  }
  
  emitir() {
    this.emitidor.emit(this.dato);
  }
  
  cerrar() {
    this.generales.cerrarModal();
  }
}
