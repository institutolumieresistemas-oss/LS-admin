import { Component, OnInit } from '@angular/core';
import { datatableConfig } from '../../interfaces/tables.interface';
import { GeneralesService } from '../../servicios/generales.service';
import { PreinscripcionesService } from '../../servicios/preinscripciones.service';
import { InscripcionesService } from '../../servicios/inscripciones.service';
import { PdfService } from '../../servicios/pdf.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-preinscripciones',
  templateUrl: './preinscripciones.component.html',
  styleUrl: './preinscripciones.component.css'
})
export class PreinscripcionesComponent implements OnInit {
  configuracion: datatableConfig = {
    alias: ['ID', 'Fecha', 'Alumno', 'Teléfono', 'Correo', 'Plantel', 'Carrera'],
    encabezados: ['id', 'fechaFormateada', 'alumnoCompleto', 'celular', 'correo', 'plantel', 'carrera'],
    busqueda: true
  };

  datosOriginales: any[] = [];
  datosTabla: any[] = [];
  cargando = false;
  vista: string = '';
  preinscripcionSeleccionada: any = null;

  // Catálogos para el modal de inscripción
  listas: any = {
    alumnos: { sexos: [] },
    inscripcion: { calendarios: [], niveles: [], subniveles: [], categorias: [], modalidades: [], cursos: [], sedes: [], turnos: [], horarios: [], sucursales: [], sedessucursales: [] },
    cuenta: { metodos: [], formas: [], cuentas: [], bancos: [], abonos: [], cargos: [], descuentos: [], tipos: [], cursos: [] },
    domicilio: { estados: [], municipios: [] },
    escolares: { tipos: [], escuelas: [], estados: [], municipios: [], universidades: [], centros: [], carreras: [] },
    publicitarios: { contacto: [], medios: [], vias: [], motivos: [], bachillerato: [], campanias: [], empresas: [] }
  };
  grupos: any = [];
  cupos: any = [];
  codigos: any = [];

  // Estructura de Ficha prellenada para inscripción
  fichaInscripcion: any = this.getFichaVacia();

  constructor(
    public generales: GeneralesService,
    private servicio: PreinscripcionesService,
    private inscripcionesService: InscripcionesService,
    private pdf: PdfService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.mostrar();
    this.cargarCatalogosInscripcion();
  }

  getFichaVacia() {
    return {
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
        idCarrera: 0
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
        cargos: [],
        abonos: [],
        descuentos: []
      }
    };
  }

  cargarCatalogosInscripcion() {
    this.inscripcionesService.mostrar({}).subscribe({
      next: (res: any) => {
        if (res.listas) this.listas = res.listas;
        if (res.grupos) this.grupos = res.grupos;
        if (res.cupos) this.cupos = res.cupos;
        if (res.codigos) this.codigos = res.codigos;
      },
      error: (err) => {
        console.error('Error cargando catálogos de inscripción:', err);
      }
    });
  }

  mostrar() {
    this.cargando = true;
    this.servicio.mostrar({}).subscribe({
      next: (res: any) => {
        this.cargando = false;
        this.datosOriginales = Array.isArray(res) ? res : [];
        this.formatearDatosParaTabla();
      },
      error: (err) => {
        this.cargando = false;
        this.generales.interpretarError(err);
      }
    });
  }

  formatearDatosParaTabla() {
    this.datosTabla = this.datosOriginales.map((item: any) => {
      const d = item.datos || {};
      const fecha = item.created_at ? new Date(item.created_at).toLocaleDateString('es-MX', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }) : '';

      return {
        id: item.id,
        fechaFormateada: fecha,
        alumnoCompleto: `${d.nombreAlumno || ''} ${d.apellidoPaterno || ''} ${d.apellidoMaterno || ''}`.trim() || 'Sin Nombre',
        celular: d.celularAlumno || '',
        correo: d.correo || '',
        plantel: d.plantelEleccion || 'No especificado',
        carrera: d.carrera ? `${d.carrera}${d.calendarioAspiracion ? ' (' + d.calendarioAspiracion + ')' : ''}` : (d.centroAspiracion || 'No especificada'),
        raw: item
      };
    });
  }

  modal(vista: string) {
    this.vista = '';
    this.generales.delay(300).then(() => {
      this.vista = vista;
      this.generales.abrirModal();
    });
  }

  verDetalle(item: any) {
    const rawItem = item.raw || item;
    this.preinscripcionSeleccionada = rawItem;
    this.modal('detalle');
  }

  iniciarInscripcion(item: any) {
    const rawItem = item.raw || item;
    this.preinscripcionSeleccionada = rawItem;
    this.mapearPreinscripcionAFicha(rawItem);
    this.modal('inscribir');
  }

  mapearPreinscripcionAFicha(pre: any) {
    const d = pre?.datos || {};
    const ficha = this.getFichaVacia();

    // 1. Alumno
    ficha.alumno.nombre = d.nombreAlumno || '';
    ficha.alumno.apellidoPaterno = d.apellidoPaterno || '';
    ficha.alumno.apellidoMaterno = d.apellidoMaterno || '';
    ficha.alumno.celular = d.celularAlumno || '';
    ficha.alumno.correo = d.correo || '';
    ficha.alumno.fechaNacimiento = d.fechaNacimiento || '';

    // 2. Domicilio
    ficha.domicilio.calle = d.calle || '';
    ficha.domicilio.numeroExterior = d.numero || '';
    ficha.domicilio.colonia = d.colonia || '';
    ficha.domicilio.codigoPostal = d.codigoPostal || '';

    const edoDom = this.listas?.domicilio?.estados?.find((e: any) =>
      e.nombre?.toLowerCase().trim() === d.estadoAlumno?.toLowerCase().trim()
    );
    if (edoDom) {
      ficha.domicilio.idEstado = edoDom.id;
      const munDom = this.listas?.domicilio?.municipios?.find((m: any) =>
        m.idEstado === edoDom.id && m.nombre?.toLowerCase().trim() === d.municipioAlumno?.toLowerCase().trim()
      );
      if (munDom) ficha.domicilio.idMunicipio = munDom.id;
    }

    // 3. Tutor
    ficha.tutor.nombre = d.padreTutor || '';
    ficha.tutor.celular = d.celularPadreTutor || '';

    // 4. Escolares & Aspiración
    if (d.promedio !== undefined && d.promedio !== null && d.promedio !== '') {
      const valStr = d.promedio.toString().trim().replace(',', '.');
      let val = parseFloat(valStr);
      if (!isNaN(val) && val >= 0) {
        if (val > 0 && val <= 10) val = val * 10;
        if (val > 100) val = 100;
        ficha.escolares.promedio = val.toFixed(2);
      } else {
        ficha.escolares.promedio = d.promedio.toString();
      }
    } else {
      ficha.escolares.promedio = '';
    }
    ficha.escolares.intentos = d.vecesExamen ? d.vecesExamen.toString() : '';

    const escObj = this.listas?.escolares?.escuelas?.find((e: any) =>
      e.nombre?.toLowerCase().trim() === d.escuelaProcedencia?.toLowerCase().trim()
    );
    if (escObj) {
      ficha.escolares.idEscuela = escObj.id;
      if (escObj.idTipo) ficha.escolares.idTipoEscuela = escObj.idTipo;
    }

    const edoEsc = this.listas?.escolares?.estados?.find((e: any) =>
      e.nombre?.toLowerCase().trim() === d.estadoEscuela?.toLowerCase().trim()
    );
    if (edoEsc) {
      ficha.escolares.idEstado = edoEsc.id;
      const munEsc = this.listas?.escolares?.municipios?.find((m: any) =>
        m.idEstado === edoEsc.id && m.nombre?.toLowerCase().trim() === d.ciudadEscuela?.toLowerCase().trim()
      );
      if (munEsc) ficha.escolares.idMunicipio = munEsc.id;
    }

    const uniObj = this.listas?.escolares?.universidades?.find((u: any) =>
      u.nombre?.toLowerCase().trim() === d.universidadAspiracion?.toLowerCase().trim() ||
      u.siglas?.toLowerCase().trim() === d.universidadAspiracion?.toLowerCase().trim()
    );
    if (uniObj) {
      ficha.escolares.idUniversidad = uniObj.id;
    }

    const calObj = this.listas?.inscripcion?.calendarios?.find((cal: any) =>
      cal.nombre?.toLowerCase().trim() === d.calendarioAspiracion?.toLowerCase().trim()
    );
    if (calObj) {
      ficha.inscripcion.idCalendario = calObj.id;
    }

    const cenObj = this.listas?.escolares?.centros?.find((c: any) =>
      c.nombre?.toLowerCase().trim() === d.centroAspiracion?.toLowerCase().trim() ||
      c.siglas?.toLowerCase().trim() === d.centroAspiracion?.toLowerCase().trim()
    );
    if (cenObj) {
      ficha.escolares.idCentroUniversitario = cenObj.id;
      if (!ficha.escolares.idUniversidad && cenObj.idUniversidad) {
        ficha.escolares.idUniversidad = cenObj.idUniversidad;
      }

      const carObj = this.listas?.escolares?.carreras?.find((c: any) =>
        c.idCentroUniversitario === cenObj.id &&
        (calObj ? Number(c.idCalendario) === Number(calObj.id) : true) &&
        c.nombre?.toLowerCase().trim() === d.carrera?.toLowerCase().trim()
      );
      if (carObj) {
        ficha.escolares.idCarrera = carObj.id;
      } else {
        const carFallback = this.listas?.escolares?.carreras?.find((c: any) =>
          c.idCentroUniversitario === cenObj.id &&
          c.nombre?.toLowerCase().trim() === d.carrera?.toLowerCase().trim()
        );
        if (carFallback) ficha.escolares.idCarrera = carFallback.id;
      }
    }

    // 5. Publicitarios
    const medObj = this.listas?.publicitarios?.medios?.find((m: any) =>
      m.nombre?.toLowerCase().trim() === d.comoEnteraste?.toLowerCase().trim()
    );
    if (medObj) ficha.publicitarios.idMedioPublicitario = medObj.id;

    ficha.publicitarios.curso = (d.tomadoCursoPrep === 'Sí');
    if (ficha.publicitarios.curso && d.dondeCursoPrep) {
      const empObj = this.listas?.publicitarios?.empresas?.find((e: any) =>
        e.nombre?.toLowerCase().trim() === d.dondeCursoPrep?.toLowerCase().trim()
      );
      if (empObj) ficha.publicitarios.idEmpresa = empObj.id;
    }

    // 6. Inscripción
    const sucObj = this.listas?.inscripcion?.sucursales?.find((s: any) =>
      s.nombre?.toLowerCase().trim() === d.plantelEleccion?.toLowerCase().trim()
    );
    if (sucObj) {
      ficha.inscripcion.idSucursalInscripcion = sucObj.id;
      ficha.inscripcion.idSucursalImparticion = sucObj.id;
    }
    ficha.inscripcion.observaciones = `Preinscripción Web #${pre.id}`;

    this.fichaInscripcion = ficha;
  }

  completarInscripcion(datosFicha: any) {
    this.cargando = true;
    this.inscripcionesService.nuevo(datosFicha).subscribe({
      next: (respuesta: any) => {
        this.generales.cerrarModal();

        // Eliminar / completar la preinscripción del registro
        if (this.preinscripcionSeleccionada?.id) {
          this.servicio.eliminar({ id: this.preinscripcionSeleccionada.id }).subscribe({
            next: () => {
              this.mostrar();
            },
            error: () => {
              this.mostrar();
            }
          });
        } else {
          this.mostrar();
        }

        this.cargando = false;
        this.generales.mensajeCorrecto('¡Inscripción formalizada exitosamente!');
        if (respuesta?.abonos && Array.isArray(respuesta.abonos)) {
          this.imprimir(respuesta.abonos);
        }
      },
      error: (err) => {
        this.cargando = false;
        this.generales.interpretarError(err);
      }
    });
  }

  eliminar(item: any) {
    const rawItem = item.raw || item;
    const nombre = rawItem.datos?.nombreAlumno ? `${rawItem.datos.nombreAlumno} ${rawItem.datos.apellidoPaterno || ''}` : `ID #${rawItem.id}`;

    swal.fire({
      title: '¿Descartar preinscripción?',
      text: `Se eliminará la preinscripción de ${nombre}. Esta acción no se puede deshacer.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cargando = true;
        this.servicio.eliminar({ id: rawItem.id }).subscribe({
          next: () => {
            this.cargando = false;
            this.generales.mensajeCorrecto('Preinscripción eliminada correctamente.');
            this.mostrar();
          },
          error: (err) => {
            this.cargando = false;
            this.generales.interpretarError(err);
          }
        });
      }
    });
  }

  imprimir(abonos: any[]) {
    abonos.forEach((abono: any) => {
      if (abono?.id) {
        this.pdf.pdfRecibo(abono.id);
      }
    });
  }
}
