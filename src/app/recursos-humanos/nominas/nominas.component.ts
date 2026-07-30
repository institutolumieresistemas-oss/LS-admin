import { Component } from '@angular/core';
import { datatableConfig } from '../../interfaces/tables.interface';
import { GeneralesService } from '../../servicios/generales.service';
import { NominasService } from '../../servicios/nominas.service';
import { PdfService } from '../../servicios/pdf.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nominas',
  templateUrl: './nominas.component.html',
  styleUrl: './nominas.component.css'
})
export class NominasComponent {
  configuracion: datatableConfig = {
    alias: ['Nomina', 'Departamento', 'Empleado', 'Nivel', 'Calendario', 'Sucursal', 'Total Efectivo', 'Total Deposito', 'Total'],
    encabezados: ['folio', 'departamento', 'empleado', 'nivel', 'calendario', 'sucursal', 'totalEfectivo', 'totalDeposito', 'total'],
    busqueda: true
  };
  listas = {
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
  datos: any;
  cargando = false;
  seleccion: any;
  vista: any;
  exit = true;
  constructor(private generales: GeneralesService,
              private servicio: NominasService,
              private pdf: PdfService,
              private router: Router){}
  
  ngOnInit(): void {
    this.mostrar();
  }
  
  modal(vista: any){
    this.vista = '';
    this.generales.delay(500).then(fun => {
      this.vista = vista;
      this.generales.abrirModal();
    });
  }
  
  mostrar(){
    this.cargando = true;
    this.servicio.mostrar().subscribe((respuesta: any) => {
      this.cargando = false;
      this.datos = respuesta.datos;
      this.listas = respuesta.listas;
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }
  
  nuevo(dato: any){
    if(this.servicio.validar(dato)){
      this.cargando = true;
      this.servicio.nuevo(dato).subscribe((respuesta: any) => {
        this.cargando = false;
        this.generales.mensajeCorrecto('Nomina agregado correctamente');
        this.datos = this.generales.agregarDatoArray(this.datos, respuesta);
        this.generales.cerrarModal();
      },
      error => {
        this.cargando = false;
        this.generales.interpretarError(error);
      });
    }
  }
  
  ruta(){
    this.router.navigate(['/admin/nomina', this.seleccion.id])
  }

  imprimir(){
    this.pdf.pdfNomina(this.seleccion.id);
  }

  cancelar(){
    this.servicio.cancelar(this.seleccion).subscribe((respuesta: any) => {
      this.generales.mensajeCorrecto('Nomina cancelada correctamente');
      this.mostrar();
    });
  }
  
}
