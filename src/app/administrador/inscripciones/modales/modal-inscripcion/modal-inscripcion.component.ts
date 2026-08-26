import { Component, OnInit, OnChanges, Output, EventEmitter, Input, SimpleChange, SimpleChanges } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';
import { InscripcionesService } from '../../../../servicios/inscripciones.service';
import swal from'sweetalert2';

@Component({
  selector: 'app-modal-inscripcion',
  templateUrl: './modal-inscripcion.component.html',
  styleUrl: './modal-inscripcion.component.css'
})
export class ModalInscripcionComponent implements OnInit, OnChanges {
  @Input() listas = {
    alumnos: {
      sexos: []
    },
    inscripcion: {
      calendarios: [],
      niveles: [],
      subniveles: [],
      categorias: [],
      modalidades: [],
      cursos: [],
      sedes: [],
      turnos: [],
      horarios: [],
      sucursales: [],
      sedessucursales: []
    },
    cuenta: {
      metodos: [],
      formas: [],
      cuentas: [],
      bancos: [],
      abonos: [],
      cargos: [],
      descuentos: [],
      tipos: [],
      cursos: []
    },
    domicilio: {
      estados: [],
      municipios: []
    },
    escolares: {
      tipos: [],
      escuelas: [],
      estados: [],
      municipios: [],
      universidades: [],
      centros: [],
      carreras: []
    },
    publicitarios: {
      contacto: [],
      medios: [],
      vias: [],
      motivos: [],
      bachillerato: [],
      campanias: [],
      empresas: []
    }
  }
  @Input() grupos: any;
  @Input() cupos: any;
  @Input() codigos: any;
  @Input() ventas = false;
  @Output() emitidor = new EventEmitter<any>();
  paso = 1;
  ultimoPasoDisponible = 1;

  tabs = [
    { id: 1, texto: 'Alumno' },
    { id: 2, texto: 'Curso' },
    { id: 3, texto: 'Domicilio' },
    { id: 4, texto: 'Tutor' },
    { id: 5, texto: 'Escolares' },
    { id: 6, texto: 'Publicidad' },
    { id: 7, texto: 'Cuenta' }
  ];
  @Input() ficha = {
    alumno: {
      nombre: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      celular: '',
      telefono: '',
      correo: '',
      idSexo: 0,
      fechaNacimiento: ''
    },
    inscripcion: {
      idCalendario: 0,
      idNivel: 0,
      idSubnivel: 0,
      idCategoria: 0,
      idModalidad: 0,
      idCurso: 0,
      idSede: 0,
      idTurno: 0,
      idHorario: 0,
      idSucursalImparticion: 0,
      idSucursalInscripcion: 0,
      observaciones: '',
      idGrupo: 0,
      precio: ''
    },
    domicilio: {
      calle: '',
      numeroExterior: '',
      numeroInterior: '',
      colonia: '',
      codigoPostal: '',
      idEstado: 0,
      idMunicipio: 0
    },
    tutor: {
      nombre: '',
      celular: '',
      telefono: ''
    },
    escolares: {
      idTipoEscuela: 0,
      idEscuela: 0,
      idEstado: 0,
      idMunicipio: 0,
      promedio: '',
      intentos: '',
      idUniversidad: 0,
      idCentroUniversitario: 0,
      idCarrera: 0,
    },
    publicitarios: {
      idMedioContacto: 0,
      idMedioPublicitario: 0,
      idViaPublicitaria: 0,
      idMotivoInscripcion: 0,
      idMotivoBachillerato: 0,
      idCampania: 0,
      curso: false,
      idEmpresa: 0
    },
    cuenta: {
      cargos: new Array(),
      abonos: new Array(),
      descuentos: new Array()
    }
  }
  texto = 'Alumno';
  constructor(private servicio: InscripcionesService) { }
  
  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['ficha']) {
      this.paso = 1;
      this.ultimoPasoDisponible = 1;
      this.asignarTexto();
    }
  }

  cambiarPaso(paso: number): void {
    if (paso <= this.ultimoPasoDisponible) {
      this.paso = paso;
      this.asignarTexto();
    }
  }
  
  desbloquearPaso(paso: number): void {
    if (paso > this.ultimoPasoDisponible) {
      this.ultimoPasoDisponible = paso;
    }
  }

  asignarAlumno(datos: any): any{
    if(!this.servicio.validarAlumno(datos)){
      return 0;
    }
    this.ficha.alumno = datos;

    this.desbloquearPaso(2);
    
    this.paso = 2;
    this.asignarTexto();
  }

  asignarInscripcion(datos: any): any{
    if(!this.servicio.validarInscripcion(datos)){
      return 0;
    }
    this.ficha.inscripcion = datos;

    this.desbloquearPaso(3);
    
    this.paso = 3;
    this.asignarTexto();
  }

  asignarDomicilio(datos: any): any{
    if(!this.servicio.validarDomicilio(datos)){
      return 0;
    }
    this.ficha.domicilio = datos;
    
    this.desbloquearPaso(4);
    
    this.paso = 4;
    this.asignarTexto();
  }

  asignarTutor(datos: any): any{
    if(!this.servicio.validarTutor(datos)){
      return 0;
    }
    this.ficha.tutor = datos;

    this.desbloquearPaso(5);
    
    this.paso = 5;
    this.asignarTexto();
  }

  asignarEscolares(datos: any): any{
    if(!this.servicio.validarEscolares(datos)){
      return 0;
    }
    this.ficha.escolares = datos;

    this.desbloquearPaso(6);
    
    this.paso = 6;
    this.asignarTexto();
  }

  asignarPublicitarios(datos: any): any{
    datos.idNivel = this.ficha.inscripcion.idNivel;
    if(!this.servicio.validarPublicitarios(datos)){
      return 0;
    }
    this.ficha.publicitarios = datos;

    this.desbloquearPaso(7);
    
    this.paso = 7;
    this.asignarTexto();
  }

  asignarCuenta(datos: any, anterior: boolean){
    this.ficha.cuenta = datos;
    if(!anterior){
      swal.fire({
        title: "Desea terminar la inscripcion?",
        showCancelButton: true,
        confirmButtonText: "Si",
      }).then((result) => {
        if (result.isConfirmed) {
          this.emitidor.emit(this.ficha);
        }
      });
    }
    this.asignarTexto();
  }

  asignarTexto(){
    switch (this.paso) {
      case 1:
        this.texto = 'Alumno';
        break;
      case 2:
        this.texto = 'Curso';
        break;
      case 3:
        this.texto = 'Domicilio';
        break;
      case 4:
          this.texto = 'Tutor';
          break;
      case 5:
        this.texto = 'Escolares';
        break;
      case 6:
        this.texto = 'Publicidad';
        break;
      case 7:
        this.texto = 'Cuenta';
        break;
      default:
        break;
    }
  }
}
