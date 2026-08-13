import { Component, OnInit } from '@angular/core';
import { datatableConfig } from '../../interfaces/tables.interface';
import { GeneralesService } from '../../servicios/generales.service';
import { PlantillasPonderacionService } from '../../servicios/plantillas-ponderacion.service';
import { AplicacionSeccionesService } from '../../servicios/aplicacion-secciones.service';

@Component({
  selector: 'app-plantillas-ponderacion',
  templateUrl: './plantillas-ponderacion.component.html',
  styleUrl: './plantillas-ponderacion.component.css'
})
export class PlantillasPonderacionComponent implements OnInit {
  configuracion: datatableConfig = {
    alias: ['Nombre', 'Descripción'],
    encabezados: ['nombre', 'descripcion'],
    busqueda: true
  };
  datos: any[] = [];
  seleccion: any;
  vista: any;
  cargando = false;
  seccionesDisponibles: any[] = [];

  constructor(
    private generales: GeneralesService,
    private servicio: PlantillasPonderacionService,
    private seccionesService: AplicacionSeccionesService
  ) {}

  ngOnInit(): void {
    this.mostrar();
    this.cargarSecciones();
  }

  modal(vista: any) {
    this.vista = '';
    this.generales.delay(300).then(() => {
      this.vista = vista;
      this.generales.abrirModal();
    });
  }

  cargarSecciones() {
    this.seccionesService.mostrar().subscribe(
      (res: any) => {
        this.seccionesDisponibles = Array.isArray(res) ? res : [];
      },
      (err: any) => console.error(err)
    );
  }

  mostrar() {
    this.cargando = true;
    this.servicio.mostrar().subscribe(
      (respuesta: any) => {
        this.cargando = false;
        this.datos = Array.isArray(respuesta) ? respuesta : [];
      },
      (error: any) => {
        this.cargando = false;
        this.generales.interpretarError(error);
      }
    );
  }

  nuevo(dato: any) {
    if (this.servicio.validar(dato)) {
      this.cargando = true;
      this.servicio.nuevo(dato).subscribe(
        (respuesta: any) => {
          this.cargando = false;
          this.generales.mensajeCorrecto('Plantilla de ponderación creada correctamente');
          this.datos = this.generales.agregarDatoArray(this.datos, respuesta);
          this.generales.cerrarModal();
        },
        (error: any) => {
          this.cargando = false;
          this.generales.interpretarError(error);
        }
      );
    }
  }

  modificar(dato: any) {
    if (this.servicio.validar(dato)) {
      this.cargando = true;
      this.servicio.modificar(dato).subscribe(
        (respuesta: any) => {
          this.cargando = false;
          this.generales.mensajeCorrecto('Plantilla de ponderación modificada correctamente');
          this.datos = this.generales.actualizarDatoArray(this.datos, respuesta);
          this.generales.cerrarModal();
        },
        (error: any) => {
          this.cargando = false;
          this.generales.interpretarError(error);
        }
      );
    }
  }

  eliminar() {
    if (!this.seleccion) return;
    this.cargando = true;
    this.servicio.eliminar(this.seleccion).subscribe(
      (respuesta: any) => {
        this.cargando = false;
        this.generales.mensajeCorrecto('Plantilla eliminada correctamente');
        this.datos = this.generales.eliminarDatoArray(this.datos, respuesta);
        this.seleccion = undefined;
      },
      (error: any) => {
        this.cargando = false;
        this.generales.interpretarError(error);
      }
    );
  }
}
