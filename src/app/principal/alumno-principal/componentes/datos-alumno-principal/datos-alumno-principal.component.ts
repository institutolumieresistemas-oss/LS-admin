import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';
import { AlumnosService } from '../../../../servicios/alumnos.service';

@Component({
  selector: 'app-datos-alumno-principal',
  templateUrl: './datos-alumno-principal.component.html',
  styleUrl: './datos-alumno-principal.component.css'
})
export class DatosAlumnoPrincipalComponent {
  datos = {
    nombre: '',
    generales: {
      telefono: '',
      celular: '',
      correo: '',
      fechaNacimiento: '',
      modificar: false
    },
    tutor: {
      nombre: '',
      telefono: '',
      celular: '',
      modificar: false
    },
    domicilio: {
      calle: '',
      numeroExterior: '',
      numeroInterior: '',
      colonia: '',
      codigoPostal: '',
      idEstado: 0,
      idMunicipio: 0,
      modificar: false
    },
    escolares: {
      idSubnivel: 0,
      idTipoEscuela: 0,
      idEscuela: 0,
      idEstado: 0,
      idMunicipio: 0,
      promedio: '',
      modificar: false
    }
  }
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
  }
  @Input() alumno: any;
  @Output() emitidor = new EventEmitter();
  cargando = false;
  constructor(private generales: GeneralesService, private servicio: AlumnosService){}

  ngOnInit(){
    this.mostrar();
  }

  mostrar(){
    this.cargando = true;
    this.servicio.datos({id: this.alumno}).subscribe((respuesta: any) => {
      const datos = {
        nombre: respuesta.datos.nombre,
        codigo: respuesta.datos.generales.codigo,
        id: respuesta.datos.id,
      }
      this.cargando = false;
      this.datos = respuesta.datos;
      this.listas = respuesta.listas;
      this.emitidor.emit(datos);
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }

  personales(dato: any){
    if(this.servicio.validarPersonales(dato)){
      this.cargando = true;
      dato.id = this.alumno;
      this.servicio.modificarPersonales(dato).subscribe((respuesta: any) => {
        this.cargando = false;
        this.generales.mensajeCorrecto('Datos personales modificados correctamente');
      },
      error => {
        this.cargando = false;
        this.generales.interpretarError(error);
      });
    }
  }

  tutor(dato: any){
    if(this.servicio.validarTutor(dato)){
      this.cargando = true;
      dato.id = this.alumno;
      this.servicio.modificarTutor(dato).subscribe((respuesta: any) => {
        this.cargando = false;
        this.generales.mensajeCorrecto('Tutor modificado correctamente');
      },
      error => {
        this.cargando = false;
        this.generales.interpretarError(error);
      });
    }
  }

  domicilio(dato: any){
    if(this.servicio.validarDomicilio(dato)){
      this.cargando = true;
      dato.id = this.alumno;
      this.servicio.modificarDomicilio(dato).subscribe((respuesta: any) => {
        this.cargando = false;
        this.generales.mensajeCorrecto('Domicilio modificado correctamente');
      },
      error => {
        this.cargando = false;
        this.generales.interpretarError(error);
      });
    }
  }

  modificarEscolares(dato: any){
    this.cargando = true;
    dato.id = this.alumno;
    this.servicio.modificarEscolares(dato).subscribe((respuesta: any) => {
      this.cargando = false;
      this.generales.mensajeCorrecto('Datos escolares modificados correctamente');
      this.datos.escolares.modificar = false;
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }
}
