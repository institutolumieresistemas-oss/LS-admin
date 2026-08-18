import { Component, inject } from '@angular/core';
import { datatableConfig } from '../../interfaces/tables.interface';
import { GeneralesService } from '../../servicios/generales.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlumnosService } from '../../servicios/alumnos.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-busqueda-alumnos-principal',
  templateUrl: './busqueda-alumnos-principal.component.html',
  styleUrl: './busqueda-alumnos-principal.component.css'
})
export class BusquedaAlumnosPrincipalComponent {
  configuracion: datatableConfig = {
    alias: ['Nombre', 'Apellido paterno', 'Apellido materno'],
    encabezados: ['nombre', 'apellidoPaterno', 'apellidoMaterno'],
    busqueda: true
  };
  datos: any;
  cargando = false;
  seleccion: any;
  vista: any;
  busqueda: any;
  
  private generales = inject(GeneralesService);
  private rutaActiva = inject(ActivatedRoute);
  private servicio = inject(AlumnosService);
  private router = inject(Router);

  constructor(){
    this.rutaActiva.params.pipe(takeUntilDestroyed()).subscribe((params: any) => {
      if (params['alumno']) {
        this.buscar(params['alumno']);
      }
    });
  }

  buscar(termino: string){
    this.cargando = true;
    this.servicio.buscar({ busqueda: termino }).subscribe((respuesta: any) => {
      this.cargando = false;
      this.datos = respuesta;
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }

  ir(){
    this.router.navigate(['admin/alumno', this.seleccion.id]);
  }
}
