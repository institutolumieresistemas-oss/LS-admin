import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlumnosService } from '../../servicios/alumnos.service';
import { GeneralesService } from '../../servicios/generales.service';

@Component({
  selector: 'app-alumno-codigo',
  templateUrl: './alumno-codigo.component.html',
  styleUrl: './alumno-codigo.component.css'
})
export class AlumnoCodigoComponent {
  private rutaActivada = inject(ActivatedRoute);
  private servicio = inject(AlumnosService);
  private generales = inject(GeneralesService);
  id: any;
  datos = {
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    codigo: '',
    fechaNacimiento: '',
  };

  escolares = {
    idSubnivel: 0,
    idTipoEscuela: 0,
    idEscuela: 0,
    idEstado: 0,
    idMunicipio: 0,
    promedio: ''
  };

  listas: {
    estados: any[];
    municipios: any[];
    subniveles: any[];
    tipos: any[];
    escuelas: any[];
  } = {
    estados: [],
    municipios: [],
    subniveles: [],
    tipos: [],
    escuelas: []
  };

  ngOnInit(){
    this.id = this.rutaActivada.snapshot.params['alumno'];
    this.traer();
  }

  traer(){
    // Traer información personal y escolar del alumno, así como los catálogos correspondientes
    this.servicio.datos({id: this.id}).subscribe((respuesta: any) =>{
      this.datos = respuesta.datos.generales || {};
      this.escolares = respuesta.datos.escolares || {
        idSubnivel: 0,
        idTipoEscuela: 0,
        idEscuela: 0,
        idEstado: 0,
        idMunicipio: 0,
        promedio: ''
      };
      this.listas = respuesta.listas || {
        estados: [],
        municipios: [],
        subniveles: [],
        tipos: [],
        escuelas: []
      };
    });
  }

  modificar(){
    const body = {
      ...this.datos,
      id: this.id
    }
    this.servicio.modificarNombre(body).subscribe(respuesta => {
      this.generales.mensajeCorrecto('Se ha modificado el nombre del alumno');
    });
  }

  guardarEscolares() {
    const body = {
      ...this.escolares,
      id: this.id
    };
    this.servicio.modificarEscolares(body).subscribe(respuesta => {
      this.generales.mensajeCorrecto('Se han modificado los datos escolares del alumno');
    });
  }
}
