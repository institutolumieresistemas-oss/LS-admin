import { Component, OnInit } from '@angular/core';
import { datatableConfig } from '../../interfaces/tables.interface';
import { GeneralesService } from '../../servicios/generales.service';
import { ReactivosService } from '../../servicios/reactivos.service';

@Component({
  selector: 'app-reactivos',
  templateUrl: './reactivos.component.html',
  styleUrl: './reactivos.component.css'
})
export class ReactivosComponent implements OnInit {
  configuracion: datatableConfig = {
    alias: ['Nombre', 'Porcentaje (%)'],
    encabezados: ['nombre', 'porcentaje'],
    busqueda: true
  };
  datos: any;
  seleccion: any;
  vista: any;

  constructor(
    private generales: GeneralesService, 
    private servicio: ReactivosService
  ) {}

  ngOnInit(): void {
    this.mostrar();
  }

  modal(vista: any){
    this.vista = '';
    this.generales.delay(500).then(() => {
      this.vista = vista;
      this.generales.abrirModal();
    });
  }

  mostrar(){
    this.servicio.mostrar().subscribe((respuesta: any) => {
      this.datos = respuesta;
    });
  }

  nuevo(dato: any){
    if(this.servicio.validar(dato)){
      this.servicio.nuevo(dato).subscribe((respuesta: any) => {
        this.generales.mensajeCorrecto('Reactivo agregado correctamente');
        this.mostrar();
        this.generales.cerrarModal();
      });
    }
  }

  modificar(dato: any){
    if(this.servicio.validar(dato)){
      this.servicio.modificar(dato).subscribe((respuesta: any) => {
        this.generales.mensajeCorrecto('Reactivo modificado correctamente');
        this.mostrar();
        this.generales.cerrarModal();
      });
    }
  }

  eliminar(){
    this.servicio.eliminar(this.seleccion).subscribe((respuesta: any) => {
      this.generales.mensajeCorrecto('Reactivo eliminado correctamente');
      this.seleccion = undefined;
      this.mostrar();
    });
  }
}
