import { Component, OnInit } from '@angular/core';
import { datatableConfig } from '../../interfaces/tables.interface';
import { GeneralesService } from '../../servicios/generales.service';
import { VacacionesService } from '../../servicios/vacaciones.service';
import { EmpleadosService } from '../../servicios/empleados.service';

interface DiaMes {
  numero: number | null;
  fechaStr: string | null;
  esVacacion: boolean;
  esDescanso: boolean;
}

interface CalendarioMes {
  nombreMes: string;
  anio: number;
  diasSemana: string[];
  semanas: DiaMes[][];
}

@Component({
  selector: 'app-vacaciones',
  templateUrl: './vacaciones.component.html',
  styleUrl: './vacaciones.component.css'
})
export class VacacionesComponent implements OnInit {
  configuracion: datatableConfig = {
    alias: ['Empleado', 'Fecha Inicio', 'Fecha Fin', 'Días Efectivos', 'Jefe Inmediato', 'Estatus'],
    encabezados: ['empleado', 'fechaInicio', 'fechaFin', 'diasEfectivos', 'jefeInmediato', 'estatus'],
    busqueda: true
  };

  datos: any[] = [];
  empleados: any[] = [];
  tabulador: any[] = [];
  cargando = false;
  seleccion: any;
  vistaModal = '';
  vistaActual: 'solicitudes' | 'tabulador' = 'solicitudes';

  // Formulario Solicitud
  formSolicitud = {
    idEmpleado: '',
    empleadoObj: null as any,
    jefeInmediato: '',
    fechaInicio: '',
    fechaFin: '',
    diasDescanso: {
      lunes: false,
      martes: false,
      miercoles: false,
      jueves: false,
      viernes: false,
      sabado: true,
      domingo: true
    },
    observaciones: ''
  };

  // Cálculo
  antiguedadAnios = 0;
  diasTabulador = 0;
  diasNaturales = 0;
  diasEfectivos = 0;
  diasDescansoConteo = 0;
  textoPeriodo = '';
  calendariosPeriodo: CalendarioMes[] = [];

  // Objeto para imprimir
  solicitudImpresion: any = null;

  diasSemanaNombres = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  mesesNombres = [
    'ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 
    'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'
  ];

  constructor(
    public generales: GeneralesService,
    private vacacionesService: VacacionesService,
    private empleadosService: EmpleadosService
  ) {}

  ngOnInit(): void {
    this.tabulador = this.vacacionesService.obtenerTabulador();
    this.mostrar();
  }

  mostrar() {
    this.cargando = true;
    this.vacacionesService.mostrar().subscribe(
      (respuesta: any) => {
        this.cargando = false;
        this.datos = respuesta.datos || [];
        this.empleados = respuesta.empleados || [];
      },
      error => {
        this.cargando = false;
        this.generales.interpretarError(error);
      }
    );
  }

  modalNuevaSolicitud() {
    this.resetForm();
    this.vistaModal = 'nueva';
    this.generales.abrirModal();
  }

  resetForm() {
    this.formSolicitud = {
      idEmpleado: '',
      empleadoObj: null,
      jefeInmediato: '',
      fechaInicio: '',
      fechaFin: '',
      diasDescanso: {
        lunes: false,
        martes: false,
        miercoles: false,
        jueves: false,
        viernes: false,
        sabado: true,
        domingo: true
      },
      observaciones: ''
    };
    this.antiguedadAnios = 0;
    this.diasTabulador = 0;
    this.diasNaturales = 0;
    this.diasEfectivos = 0;
    this.diasDescansoConteo = 0;
    this.textoPeriodo = '';
    this.calendariosPeriodo = [];
  }

  onSeleccionarEmpleado(id: any) {
    this.formSolicitud.idEmpleado = id;
    const emp = this.empleados.find(e => e.id == id);
    this.formSolicitud.empleadoObj = emp;

    if (emp && emp.fechaIngreso) {
      const res = this.vacacionesService.calcularDiasCorresponden(emp.fechaIngreso);
      this.antiguedadAnios = res.aniosAntiguedad;
      this.diasTabulador = res.diasVacaciones;
    } else {
      this.antiguedadAnios = 0;
      this.diasTabulador = 0;
    }
    this.calcularPeriodo();
  }

  toggleDiaDescanso() {
    this.calcularPeriodo();
  }

  calcularPeriodo() {
    if (!this.formSolicitud.fechaInicio || !this.formSolicitud.fechaFin) {
      this.diasNaturales = 0;
      this.diasEfectivos = 0;
      this.diasDescansoConteo = 0;
      this.textoPeriodo = '';
      this.calendariosPeriodo = [];
      return;
    }

    const start = new Date(this.formSolicitud.fechaInicio + 'T00:00:00');
    const end = new Date(this.formSolicitud.fechaFin + 'T00:00:00');

    if (start > end) {
      this.textoPeriodo = 'La fecha de inicio debe ser anterior o igual a la fecha de fin.';
      this.diasEfectivos = 0;
      this.calendariosPeriodo = [];
      return;
    }

    // Calcular días naturales y días efectivos
    let current = new Date(start);
    let efectivos = 0;
    let descansos = 0;
    let naturales = 0;

    const mapDiasDescanso: { [key: number]: boolean } = {
      0: this.formSolicitud.diasDescanso.domingo, // 0 = Domingo en Date.getDay()
      1: this.formSolicitud.diasDescanso.lunes,
      2: this.formSolicitud.diasDescanso.martes,
      3: this.formSolicitud.diasDescanso.miercoles,
      4: this.formSolicitud.diasDescanso.jueves,
      5: this.formSolicitud.diasDescanso.viernes,
      6: this.formSolicitud.diasDescanso.sabado
    };

    const diasVacacionesMap = new Set<string>();
    const diasDescansoMap = new Set<string>();

    while (current <= end) {
      naturales++;
      const dayOfWeek = current.getDay();
      const dateIso = this.formatDateIso(current);

      if (mapDiasDescanso[dayOfWeek]) {
        descansos++;
        diasDescansoMap.add(dateIso);
      } else {
        efectivos++;
        diasVacacionesMap.add(dateIso);
      }

      current.setDate(current.getDate() + 1);
    }

    this.diasNaturales = naturales;
    this.diasEfectivos = efectivos;
    this.diasDescansoConteo = descansos;

    // Formatear texto en español (ej: "del martes 4 de abril al viernes 4 de mayo")
    this.textoPeriodo = `Del ${this.formatFechaLegible(start)} al ${this.formatFechaLegible(end)}`;

    // Construir los 2 calendarios contiguos
    this.generarDosCalendarios(start, end, diasVacacionesMap, diasDescansoMap);
  }

  formatFechaLegible(fecha: Date): string {
    const diasNombres = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
    const meses = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];
    return `${diasNombres[fecha.getDay()]} ${fecha.getDate()} de ${meses[fecha.getMonth()]} de ${fecha.getFullYear()}`;
  }

  formatDateIso(fecha: Date): string {
    const yyyy = fecha.getFullYear();
    const mm = String(fecha.getMonth() + 1).padStart(2, '0');
    const dd = String(fecha.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  generarDosCalendarios(start: Date, end: Date, vacacionesSet: Set<string>, descansosSet: Set<string>) {
    const m1Year = start.getFullYear();
    const m1Month = start.getMonth();

    let m2Year = m1Year;
    let m2Month = m1Month + 1;
    if (m2Month > 11) {
      m2Month = 0;
      m2Year++;
    }

    // Si el periodo termina en un mes posterior, usamos ese mes como segundo calendario
    if (end.getFullYear() > m1Year || end.getMonth() > m1Month) {
      m2Year = end.getFullYear();
      m2Month = end.getMonth();
    }

    const cal1 = this.construirMatrizMes(m1Year, m1Month, vacacionesSet, descansosSet);
    const cal2 = this.construirMatrizMes(m2Year, m2Month, vacacionesSet, descansosSet);

    this.calendariosPeriodo = [cal1, cal2];
  }

  construirMatrizMes(year: number, month: number, vacacionesSet: Set<string>, descansosSet: Set<string>): CalendarioMes {
    const primerDiaMes = new Date(year, month, 1);
    const ultimoDiaMes = new Date(year, month + 1, 0);

    // Ajustar primer día de la semana (Lunes = 0, ..., Domingo = 6)
    let startDayOfWeek = primerDiaMes.getDay() - 1;
    if (startDayOfWeek === -1) startDayOfWeek = 6;

    const totalDias = ultimoDiaMes.getDate();
    const semanas: DiaMes[][] = [];
    let semanaActual: DiaMes[] = [];

    // Celdas vacías al inicio del mes
    for (let i = 0; i < startDayOfWeek; i++) {
      semanaActual.push({ numero: null, fechaStr: null, esVacacion: false, esDescanso: false });
    }

    for (let dia = 1; dia <= totalDias; dia++) {
      const fecha = new Date(year, month, dia);
      const iso = this.formatDateIso(fecha);

      semanaActual.push({
        numero: dia,
        fechaStr: iso,
        esVacacion: vacacionesSet.has(iso),
        esDescanso: descansosSet.has(iso)
      });

      if (semanaActual.length === 7) {
        semanas.push(semanaActual);
        semanaActual = [];
      }
    }

    // Completar última semana
    if (semanaActual.length > 0) {
      while (semanaActual.length < 7) {
        semanaActual.push({ numero: null, fechaStr: null, esVacacion: false, esDescanso: false });
      }
      semanas.push(semanaActual);
    }

    return {
      nombreMes: this.mesesNombres[month],
      anio: year,
      diasSemana: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do'],
      semanas
    };
  }

  guardarSolicitud() {
    if (!this.formSolicitud.idEmpleado) {
      this.generales.mensajeError('Debe seleccionar un empleado.');
      return;
    }
    if (!this.formSolicitud.jefeInmediato) {
      this.generales.mensajeError('Debe ingresar el nombre del jefe inmediato.');
      return;
    }
    if (!this.formSolicitud.fechaInicio || !this.formSolicitud.fechaFin) {
      this.generales.mensajeError('Debe seleccionar la fecha de inicio y fecha de fin.');
      return;
    }
    if (this.diasEfectivos <= 0) {
      this.generales.mensajeError('El periodo seleccionado no contiene días de vacaciones válidos.');
      return;
    }

    const descansosArr: string[] = [];
    if (this.formSolicitud.diasDescanso.sabado) descansosArr.push('Sábado');
    if (this.formSolicitud.diasDescanso.domingo) descansosArr.push('Domingo');
    if (this.formSolicitud.diasDescanso.lunes) descansosArr.push('Lunes');
    if (this.formSolicitud.diasDescanso.martes) descansosArr.push('Martes');
    if (this.formSolicitud.diasDescanso.miercoles) descansosArr.push('Miércoles');
    if (this.formSolicitud.diasDescanso.jueves) descansosArr.push('Jueves');
    if (this.formSolicitud.diasDescanso.viernes) descansosArr.push('Viernes');

    const payload = {
      idEmpleado: this.formSolicitud.idEmpleado,
      jefeInmediato: this.formSolicitud.jefeInmediato,
      fechaInicio: this.formSolicitud.fechaInicio,
      fechaFin: this.formSolicitud.fechaFin,
      diasEfectivos: this.diasEfectivos,
      diasNaturales: this.diasNaturales,
      diasDescanso: descansosArr,
      observaciones: this.formSolicitud.observaciones,
      estatus: 'Autorizado'
    };

    this.cargando = true;
    this.vacacionesService.nuevo(payload).subscribe(
      (respuesta: any) => {
        this.cargando = false;
        this.generales.mensajeCorrecto('Solicitud de vacaciones registrada con éxito.');
        this.datos = [respuesta, ...this.datos];
        this.generales.cerrarModal();

        // Preparar para imprimir inmediatamente
        this.prepararImpresion(respuesta);
      },
      error => {
        this.cargando = false;
        this.generales.interpretarError(error);
      }
    );
  }

  prepararImpresion(solicitud: any) {
    const emp = this.empleados.find(e => e.id == solicitud.idEmpleado) || {
      nombre: solicitud.empleado,
      puesto: solicitud.puesto,
      departamento: solicitud.departamento,
      sucursal: solicitud.sucursal,
      fechaIngreso: solicitud.fechaIngreso
    };

    let anios = 0;
    let diasTab = 0;
    if (emp && emp.fechaIngreso) {
      const res = this.vacacionesService.calcularDiasCorresponden(emp.fechaIngreso);
      anios = res.aniosAntiguedad;
      diasTab = res.diasVacaciones;
    }

    const start = new Date(solicitud.fechaInicio + 'T00:00:00');
    const end = new Date(solicitud.fechaFin + 'T00:00:00');

    // Parsear días de descanso
    const descansosSet = new Set<string>();
    const vacsSet = new Set<string>();

    const mapDiasDescansoBool: { [key: number]: boolean } = {
      0: solicitud.diasDescanso ? solicitud.diasDescanso.includes('Domingo') : true,
      1: solicitud.diasDescanso ? solicitud.diasDescanso.includes('Lunes') : false,
      2: solicitud.diasDescanso ? solicitud.diasDescanso.includes('Martes') : false,
      3: solicitud.diasDescanso ? solicitud.diasDescanso.includes('Miércoles') : false,
      4: solicitud.diasDescanso ? solicitud.diasDescanso.includes('Jueves') : false,
      5: solicitud.diasDescanso ? solicitud.diasDescanso.includes('Viernes') : false,
      6: solicitud.diasDescanso ? solicitud.diasDescanso.includes('Sábado') : true
    };

    let curr = new Date(start);
    while (curr <= end) {
      const iso = this.formatDateIso(curr);
      if (mapDiasDescansoBool[curr.getDay()]) {
        descansosSet.add(iso);
      } else {
        vacsSet.add(iso);
      }
      curr.setDate(curr.getDate() + 1);
    }

    const m1Year = start.getFullYear();
    const m1Month = start.getMonth();
    let m2Year = m1Year;
    let m2Month = m1Month + 1;
    if (m2Month > 11) {
      m2Month = 0;
      m2Year++;
    }
    if (end.getFullYear() > m1Year || end.getMonth() > m1Month) {
      m2Year = end.getFullYear();
      m2Month = end.getMonth();
    }

    const cal1 = this.construirMatrizMes(m1Year, m1Month, vacsSet, descansosSet);
    const cal2 = this.construirMatrizMes(m2Year, m2Month, vacsSet, descansosSet);

    this.solicitudImpresion = {
      ...solicitud,
      empleadoNombre: emp.nombre || solicitud.empleado,
      puesto: emp.puesto || solicitud.puesto || 'N/A',
      departamento: emp.departamento || solicitud.departamento || 'N/A',
      sucursal: emp.sucursal || solicitud.sucursal || 'N/A',
      fechaIngreso: emp.fechaIngreso || solicitud.fechaIngreso || 'N/A',
      antiguedadAnios: anios,
      diasTabulador: diasTab,
      textoPeriodo: `Del ${this.formatFechaLegible(start)} al ${this.formatFechaLegible(end)}`,
      calendarios: [cal1, cal2]
    };

    this.vistaModal = 'imprimir';
    this.generales.abrirModal();
  }

  imprimirVentana() {
    window.print();
  }

  eliminar(item: any) {
    if (confirm('¿Está seguro de eliminar esta solicitud de vacaciones?')) {
      this.cargando = true;
      this.vacacionesService.eliminar(item).subscribe(
        (respuesta: any) => {
          this.cargando = false;
          this.generales.mensajeCorrecto('Solicitud eliminada.');
          this.datos = this.datos.filter(d => d.id !== item.id);
          this.seleccion = null;
        },
        error => {
          this.cargando = false;
          this.generales.interpretarError(error);
        }
      );
    }
  }
}
