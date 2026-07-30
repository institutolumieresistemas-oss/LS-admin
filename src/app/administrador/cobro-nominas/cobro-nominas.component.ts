import { Component } from '@angular/core';
import { datatableConfig } from '../../interfaces/tables.interface';
import { GeneralesService } from '../../servicios/generales.service';
import { NominasService } from '../../servicios/nominas.service';
import { PdfService } from '../../servicios/pdf.service';

@Component({
  selector: 'app-cobro-nominas',
  templateUrl: './cobro-nominas.component.html',
  styleUrl: './cobro-nominas.component.css'
})
export class CobroNominasComponent {
  configuracion: datatableConfig = {
    alias: ['Folio', 'Departamento', 'Calendario', 'Empleado', 'Nivel', 'Total Efectivo', 'Total Deposito', 'Total'],
    encabezados: ['folio', 'departamento', 'calendario', 'empleado', 'nivel', 'totalEfectivo', 'totalDeposito', 'total'],
    busqueda: true
  };
  datos: any;
  cargando = false;
  seleccion: any;
  vista: any;
  
  constructor(private generales: GeneralesService, private servicio: NominasService, private pdf: PdfService){}
  
  ngOnInit(): void {
    this.mostrar();
  }
  
  mostrar(){
    this.cargando = true;
    this.servicio.autorizadas({}).subscribe((respuesta: any) => {
      this.cargando = false;
      this.datos = respuesta;
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }

  cobrar(){
    this.cargando = true;
    this.servicio.cobrar(this.seleccion).subscribe((respuesta: any) => {
      this.cargando = false;
      this.generales.mensajeCorrecto('Nomina cobrada correctamente');
      this.datos = this.generales.eliminarDatoArray(this.datos, respuesta);
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }

  imprimir(){
    this.pdf.pdfNomina(this.seleccion.id);
  }
}
