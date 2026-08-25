import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';
import { InscripcionesService } from '../../../../servicios/inscripciones.service';

@Component({
  selector: 'app-datos-ficha-principal',
  templateUrl: './datos-ficha-principal.component.html',
  styleUrl: './datos-ficha-principal.component.css'
})
export class DatosFichaPrincipalComponent {
  @Input() datos = {
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
    fecha: '',
    idGrupo: 0,
    precio: ''
  }
  @Input() listas = {
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
    sedessucursales: [],
    grupos: [],
    cupos: []
  }
  @Output() siguiente = new EventEmitter<any>();
  calendarios: any;
  niveles: any;
  subniveles: any;
  categorias: any;
  modalidades: any;
  cursos: any;
  sedes: any;
  turnos: any;
  horarios: any;
  sucursales: any;
  reservacion = {
    cupo: 0,
    inscritos: 0,
    restantes: 0,
    hay: false
  }
  
  constructor(private generales: GeneralesService, private servicio: InscripcionesService){}
  
  ngOnInit(){
    if (this.datos && this.datos.fecha) {
      this.datos.fecha = this.datos.fecha.split(' ')[0];
    }
    this.traerCalendarios();
    if(this.datos.idCalendario > 0){
      this.traerNiveles();
      this.traerSubniveles();
      this.traerCategorias();
      this.traerModalidades();
      this.traerCursos();
      this.traerSedes();
      this.traerTurnos();
      this.traerHorarios();
      this.traerSucursales();
      this.traerGrupo();
      this.traerCupo();
    }
  }

  emitirSiguiente(){
    this.siguiente.emit(this.datos);
  }

  asignar(paso: number, dato: any){
    this.datos = {
      idCalendario: (paso === 1) ? dato : this.datos.idCalendario,
      idNivel: (paso > 1) ? (paso === 2) ? dato : this.datos.idNivel : 0,
      idSubnivel: (paso > 2) ? (paso === 3) ? dato : this.datos.idSubnivel : 0,
      idCategoria: (paso > 3) ? (paso === 4) ? dato : this.datos.idCategoria : 0,
      idModalidad: (paso > 4) ? (paso === 5) ? dato : this.datos.idModalidad : 0,
      idCurso: (paso > 5) ? (paso === 6) ? dato : this.datos.idCurso : 0,
      idSede: (paso > 6) ? (paso === 7) ? dato : this.datos.idSede : 0,
      idTurno: (paso > 7) ? (paso === 8) ? dato : this.datos.idTurno : 0,
      idHorario: (paso > 8) ? (paso === 9) ? dato : this.datos.idHorario : 0,
      idSucursalImparticion: (paso > 9) ? (paso === 10) ? dato : this.datos.idSucursalImparticion : 0,
      idSucursalInscripcion: (paso > 9) ? (paso === 10) ? dato : this.datos.idSucursalInscripcion : this.datos.idSucursalInscripcion,
      observaciones: this.datos.observaciones,
      fecha: this.datos.fecha,
      idGrupo: (paso === 10) ? this.datos.idGrupo : 0,
      precio: (paso === 10) ? this.datos.precio : '',
    }
  }

  traerCalendarios(){
    this.calendarios = this.generales.calendariosActuales(this.listas.calendarios);
  }

  traerNiveles(){
    const busqueda = {
      idCalendario: this.datos.idCalendario
    }
    if(this.listas.grupos === undefined){
      return this.generales.mensajeError('No se han creado grupos para este calendario');
    }
    this.niveles = this.generales.sublistaMultiplesExterna(this.listas.grupos, busqueda, this.listas.niveles, 'idNivel');
  }

  traerSubniveles(){
    const busqueda = {
      idCalendario: this.datos.idCalendario,
      idNivel: this.datos.idNivel
    }
    this.subniveles = this.generales.sublistaMultiplesExterna(this.listas.grupos, busqueda, this.listas.subniveles, 'idSubnivel');
  }

  traerCategorias(){
    const busqueda = {
      idCalendario: this.datos.idCalendario,
      idNivel: this.datos.idNivel,
      idSubnivel: this.datos.idSubnivel
    }
    this.categorias = this.generales.sublistaMultiplesExterna(this.listas.grupos, busqueda, this.listas.categorias, 'idCategoria');
  }

  traerModalidades(){
    const busqueda = {
      idCalendario: this.datos.idCalendario,
      idNivel: this.datos.idNivel,
      idSubnivel: this.datos.idSubnivel,
      idCategoria: this.datos.idCategoria
    }
    this.modalidades = this.generales.sublistaMultiplesExterna(this.listas.grupos, busqueda, this.listas.modalidades, 'idModalidad');
  }

  traerCursos(){
    const busqueda = {
      idCalendario: this.datos.idCalendario,
      idNivel: this.datos.idNivel,
      idSubnivel: this.datos.idSubnivel,
      idCategoria: this.datos.idCategoria,
      idModalidad: this.datos.idModalidad
    }
    this.cursos = this.generales.sublistaMultiplesExterna(this.listas.grupos, busqueda, this.listas.cursos, 'idCurso');
  }

  traerSedes(){
    const busqueda = {
      idCalendario: this.datos.idCalendario,
      idNivel: this.datos.idNivel,
      idSubnivel: this.datos.idSubnivel,
      idCategoria: this.datos.idCategoria,
      idModalidad: this.datos.idModalidad,
      idCurso: this.datos.idCurso
    }
    this.sedes = this.generales.sublistaMultiplesExterna(this.listas.grupos, busqueda, this.listas.sedes, 'idSede');
  }

  traerTurnos(){
    const busqueda = {
      idCalendario: this.datos.idCalendario,
      idNivel: this.datos.idNivel,
      idSubnivel: this.datos.idSubnivel,
      idCategoria: this.datos.idCategoria,
      idModalidad: this.datos.idModalidad,
      idCurso: this.datos.idCurso,
      idSede: this.datos.idSede
    }
    this.turnos = this.generales.sublistaMultiplesExterna(this.listas.grupos, busqueda, this.listas.turnos, 'idTurno');
  }

  traerHorarios(){
    const busqueda = {
      idCalendario: this.datos.idCalendario,
      idNivel: this.datos.idNivel,
      idSubnivel: this.datos.idSubnivel,
      idCategoria: this.datos.idCategoria,
      idModalidad: this.datos.idModalidad,
      idCurso: this.datos.idCurso,
      idSede: this.datos.idSede,
      idTurno: this.datos.idTurno
    }
    this.horarios = this.generales.sublistaMultiplesExterna(this.listas.grupos, busqueda, this.listas.horarios, 'idHorario');
  }

  traerGrupo(){
    const busqueda = {
      idCalendario: this.datos.idCalendario,
      idNivel: this.datos.idNivel,
      idSubnivel: this.datos.idSubnivel,
      idCategoria: this.datos.idCategoria,
      idModalidad: this.datos.idModalidad,
      idCurso: this.datos.idCurso,
      idSede: this.datos.idSede,
      idTurno: this.datos.idTurno,
      idHorario: this.datos.idHorario,
    }
    let grupo = this.generales.registroSeleccionado(this.listas.grupos, busqueda);
    this.datos.idGrupo = grupo.id;
    this.datos.precio = grupo.precio;
  }

  traerCupo(){
    const busqueda = {
      idSucursal: this.datos.idSucursalImparticion,
      id: this.datos.idGrupo
    }
    let cupos = this.generales.registroSeleccionado(this.listas.cupos, busqueda);
    if(cupos !== undefined){
      this.reservacion.cupo = cupos.cupo;
      this.reservacion.inscritos = cupos.inscritos;
      this.reservacion.restantes = parseInt(cupos.cupo) - parseInt(cupos.inscritos);
      this.reservacion.hay = true;
    }else{
      this.reservacion.hay = false;
    }
  }

  traerSucursales(){
    const busqueda = {
      idSede: this.datos.idSede
    };
    this.sucursales = this.generales.sublistaMultiplesExterna(this.listas.sedessucursales ,busqueda, this.listas.sucursales, 'idSucursal');
  }
}
