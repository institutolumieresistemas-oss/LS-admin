import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { auntenticacionGuard } from '../guardianes/autenticacion.guard';
import { BancosComponent } from '../catalogos/bancos/bancos.component';
import { CalendariosComponent } from '../catalogos/calendarios/calendarios.component';
import { CampaniasComponent } from '../catalogos/campanias/campanias.component';
import { UniversidadesComponent } from '../catalogos/universidades/universidades.component';
import { CentrosUniversitariosComponent } from '../catalogos/centros-universitarios/centros-universitarios.component';
import { CarrerasComponent } from '../catalogos/carreras/carreras.component';
import { CategoriasComponent } from '../catalogos/categorias/categorias.component';
import { ConceptosAbonosComponent } from '../catalogos/conceptos-abonos/conceptos-abonos.component';
import { ConceptosCargosComponent } from '../catalogos/conceptos-cargos/conceptos-cargos.component';
import { ConceptosDedcuccionesComponent } from '../catalogos/conceptos-dedcucciones/conceptos-dedcucciones.component';
import { ConceptosDescuentosComponent } from '../catalogos/conceptos-descuentos/conceptos-descuentos.component';
import { ConceptosPercepcionesComponent } from '../catalogos/conceptos-percepciones/conceptos-percepciones.component';
import { ConceptosDevolucionesComponent } from '../catalogos/conceptos-devoluciones/conceptos-devoluciones.component';
import { ConceptosExtrasComponent } from '../catalogos/conceptos-extras/conceptos-extras.component';
import { CuentasComponent } from '../catalogos/cuentas/cuentas.component';
import { DepartamentosComponent } from '../catalogos/departamentos/departamentos.component';
import { EmpresasCursosComponent } from '../catalogos/empresas-cursos/empresas-cursos.component';
import { EscuelasComponent } from '../catalogos/escuelas/escuelas.component';
import { TiposEscuelasComponent } from '../catalogos/tipos-escuelas/tipos-escuelas.component';
import { EstadosComponent } from '../catalogos/estados/estados.component';
import { FormasPagosComponent } from '../catalogos/formas-pagos/formas-pagos.component';
import { TurnosComponent } from '../catalogos/turnos/turnos.component';
import { HorariosComponent } from '../catalogos/horarios/horarios.component';
import { MediosContactosComponent } from '../catalogos/medios-contactos/medios-contactos.component';
import { MediosPublicitariosComponent } from '../catalogos/medios-publicitarios/medios-publicitarios.component';
import { MetodosPagosComponent } from '../catalogos/metodos-pagos/metodos-pagos.component';
import { ModalidadesComponent } from '../catalogos/modalidades/modalidades.component';
import { MotivosBachilleratosComponent } from '../catalogos/motivos-bachilleratos/motivos-bachilleratos.component';
import { MotivosInscripcionesComponent } from '../catalogos/motivos-inscripciones/motivos-inscripciones.component';
import { MunicipiosComponent } from '../catalogos/municipios/municipios.component';
import { CursosComponent } from '../catalogos/cursos/cursos.component';
import { NivelesComponent } from '../catalogos/niveles/niveles.component';
import { ParidadesComponent } from '../catalogos/paridades/paridades.component';
import { PuestosComponent } from '../catalogos/puestos/puestos.component';
import { RubrosEgresosComponent } from '../catalogos/rubros-egresos/rubros-egresos.component';
import { RubrosComponent } from '../catalogos/rubros/rubros.component';
import { SedesComponent } from '../catalogos/sedes/sedes.component';
import { SexosComponent } from '../catalogos/sexos/sexos.component';
import { SubnivelesComponent } from '../catalogos/subniveles/subniveles.component';
import { SucursalesComponent } from '../catalogos/sucursales/sucursales.component';
import { TiposEgresosComponent } from '../catalogos/tipos-egresos/tipos-egresos.component';
import { TiposPagosComponent } from '../catalogos/tipos-pagos/tipos-pagos.component';
import { TiposUsuariosComponent } from '../catalogos/tipos-usuarios/tipos-usuarios.component';
import { TiposIngresosComponent } from '../catalogos/tipos-ingresos/tipos-ingresos.component';
import { ViasPublicitariasComponent } from '../catalogos/vias-publicitarias/vias-publicitarias.component';
import { ModulosComponent } from '../desarrollo/modulos/modulos.component';
import { PaginasComponent } from '../desarrollo/paginas/paginas.component';
import { AltaCursosComponent } from '../directivos/alta-cursos/alta-cursos.component';
import { IngresosDirectivosComponent } from '../directivos/ingresos-directivos/ingresos-directivos.component';
import { EgresosDirectivosComponent } from '../directivos/egresos-directivos/egresos-directivos.component';
import { BalanceSucursalComponent } from '../directivos/balance-sucursal/balance-sucursal.component';
import { PermisosComponent } from '../directivos/permisos/permisos.component';
import { MetasIngresosComponent } from '../directivos/metas-ingresos/metas-ingresos.component';
import { AutorizacionNominasComponent } from '../directivos/autorizacion-nominas/autorizacion-nominas.component';
import { RecepcionValesComponent } from '../directivos/recepcion-vales/recepcion-vales.component';
import { SolicitudesModificacionIngresosComponent } from '../directivos/solicitudes-modificacion-ingresos/solicitudes-modificacion-ingresos.component';
import { CobroNominasComponent } from '../administrador/cobro-nominas/cobro-nominas.component';
import { CorteCajaComponent } from '../administrador/corte-caja/corte-caja.component';
import { CursosCongeladosComponent } from '../administrador/cursos-congelados/cursos-congelados.component';
import { EgresosAdministrativosComponent } from '../administrador/egresos-administrativos/egresos-administrativos.component';
import { EmisionValesComponent } from '../administrador/emision-vales/emision-vales.component';
import { IngresosAdministrativosComponent } from '../administrador/ingresos-administrativos/ingresos-administrativos.component';
import { InscripcionesComponent } from '../administrador/inscripciones/inscripciones.component';
import { TransferenciaSucursalesComponent } from '../administrador/transferencia-sucursales/transferencia-sucursales.component';
import { ValesGerencialesComponent } from '../administrador/vales-gerenciales/vales-gerenciales.component';
import { IngresosAuditoriasComponent } from '../auditorias/ingresos-auditorias/ingresos-auditorias.component';
import { SolicitudesModificacionEgresosComponent } from '../directivos/solicitudes-modificacion-egresos/solicitudes-modificacion-egresos.component';
import { SolicitudesNominasComponent } from '../directivos/solicitudes-nominas/solicitudes-nominas.component';
import { TransferenciasComponent } from '../directivos/transferencias/transferencias.component';
import { EmpleadosComponent } from '../recursos-humanos/empleados/empleados.component';
import { NominasComponent } from '../recursos-humanos/nominas/nominas.component';
import { InscripcionesVentasComponent } from '../ventas/inscripciones-ventas/inscripciones-ventas.component';
import { AulasComponent } from '../gerentes/aulas/aulas.component';
import { BalanceGerentesComponent } from '../gerentes/balance-gerentes/balance-gerentes.component';
import { BloqueoHorariosComponent } from '../gerentes/bloqueo-horarios/bloqueo-horarios.component';
import { ControlHorariosComponent } from '../gerentes/control-horarios/control-horarios.component';
import { EgresosGerentesComponent } from '../gerentes/egresos-gerentes/egresos-gerentes.component';
import { EmpleadosGerentesComponent } from '../gerentes/empleados-gerentes/empleados-gerentes.component';
import { IngresosGerentesComponent } from '../gerentes/ingresos-gerentes/ingresos-gerentes.component';
import { ReservacionAulasComponent } from '../gerentes/reservacion-aulas/reservacion-aulas.component';
import { WebConfiguracionComponent } from '../web/web-configuracion/web-configuracion.component';
import { ComisionesEmpleadoComponent } from '../ventas/comisiones-empleado/comisiones-empleado.component';
import { ComisionesGeneralesComponent } from '../ventas/comisiones-generales/comisiones-generales.component';
import { EstadisticaComponent } from '../principal/estadistica/estadistica.component';
import { ComisionesCursosComponent } from '../ventas/comisiones-cursos/comisiones-cursos.component';
import { MetasIngresosVentasComponent } from '../ventas/metas-ingresos-ventas/metas-ingresos-ventas.component';
import { MetasCategoriasVentasComponent } from '../ventas/metas-categorias-ventas/metas-categorias-ventas.component';
import { MetasCursosVentasComponent } from '../ventas/metas-cursos-ventas/metas-cursos-ventas.component';
import { MetasMesVentasComponent } from '../ventas/metas-mes-ventas/metas-mes-ventas.component';
import { FichaComponent } from '../principal/ficha/ficha.component';
import { BusquedaAlumnosPrincipalComponent } from '../principal/busqueda-alumnos-principal/busqueda-alumnos-principal.component';
import { PerfilComponent } from '../principal/perfil/perfil.component';
import { NominaPrincipalComponent } from '../principal/nomina-principal/nomina-principal.component';
import { AlumnoPrincipalComponent } from '../principal/alumno-principal/alumno-principal.component';
import { ReporteEstadisticasMaestasComponent } from '../reportes/reporte-estadisticas-maestas/reporte-estadisticas-maestas.component';
import { ReporteAlumnosComponent } from '../reportes/reporte-alumnos/reporte-alumnos.component';
import { ReporteEgresosComponent } from '../reportes/reporte-egresos/reporte-egresos.component';
import { ReporteIngresosComponent } from '../reportes/reporte-ingresos/reporte-ingresos.component';
import { ReporteInscritosComponent } from '../reportes/reporte-inscritos/reporte-inscritos.component';
import { CRMComponent } from '../ventas/crm/crm.component';
import { ProspectoPrincipalComponent } from '../principal/prospecto-principal/prospecto-principal.component';
import { SeguimientosPrincipalComponent } from '../principal/seguimientos-principal/seguimientos-principal.component';
import { CitasComponent } from '../principal/citas/citas.component';
import { MetasEconomicasComponent } from '../ventas/metas-economicas/metas-economicas.component';
import { CalificadorComponent } from '../lumiere-social/calificador/calificador.component';
import { CalificarGrupoComponent } from '../lumiere-social/calificar-grupo/calificar-grupo.component';
import { MetasEconomicasVendedorComponent } from '../ventas/metas-economicas-vendedor/metas-economicas-vendedor.component';
import { MetaEconomicaComponent } from '../ventas/meta-economica/meta-economica.component';
import { SeccionesComponent } from '../aplicacion/secciones/secciones.component';
import { TemasComponent } from '../aplicacion/temas/temas.component';
import { SubtemasComponent } from '../aplicacion/subtemas/subtemas.component';
import { QuizesComponent } from '../aplicacion/quizes/quizes.component';
import { LecturasComponent } from '../aplicacion/lecturas/lecturas.component';
import { TestingComponent } from '../desarrollo/testing/testing.component';
import { AplicacionProfesoresComponent } from '../aplicacion/aplicacion-profesores/aplicacion-profesores.component';
import { AplicacionHomeComponent } from '../aplicacion/aplicacion-home/aplicacion-home.component';
import { AplicacionGuiaAlumnoComponent } from '../aplicacion/aplicacion-guia-alumno/aplicacion-guia-alumno.component';
import { AplicacionCursosComponent } from '../aplicacion/aplicacion-cursos/aplicacion-cursos.component';
import { BalanceCuentasComponent } from '../auditorias/balance-cuentas/balance-cuentas.component';
import { AuditarComponent } from '../auditorias/auditar/auditar.component';
import { ReporteVentasComponent } from '../reportes/reporte-ventas/reporte-ventas.component';
import { PrestadoresComponent } from '../catalogos/prestadores/prestadores.component';
import { CreditosComponent } from '../directivos/creditos/creditos.component';
import { CreditoComponent } from '../principal/credito/credito.component';
import { PrestamosComponent } from '../recursos-humanos/prestamos/prestamos.component';
import { ReporteIngresosBasicoComponent } from '../reportes/reporte-ingresos-basico/reporte-ingresos-basico.component';
import { ReporteEgresosBasicoComponent } from '../reportes/reporte-egresos-basico/reporte-egresos-basico.component';
import { PrestamoComponent } from '../principal/prestamo/prestamo.component';
import { AlumnoCodigoComponent } from '../principal/alumno-codigo/alumno-codigo.component';
import { CuentasCobrarComponent } from '../auditorias/cuentas-cobrar/cuentas-cobrar.component';
import { CuentasPagarComponent } from '../auditorias/cuentas-pagar/cuentas-pagar.component';
import { BalanceCalendariosComponent } from '../auditorias/balance-calendarios/balance-calendarios.component';

const routes: Routes = [
  {path: '', canActivate: [auntenticacionGuard], component: InicioComponent, children: [
    { path: '', canActivate: [auntenticacionGuard], component: EstadisticaComponent },
    { path: 'bancos', canActivate: [auntenticacionGuard], component: BancosComponent },
    { path: 'calendarios', canActivate: [auntenticacionGuard], component: CalendariosComponent },
    { path: 'campanias', canActivate: [auntenticacionGuard], component: CampaniasComponent },
    { path: 'universidades', canActivate: [auntenticacionGuard], component: UniversidadesComponent },
    { path: 'centros', canActivate: [auntenticacionGuard], component: CentrosUniversitariosComponent },
    { path: 'carreras', canActivate: [auntenticacionGuard], component: CarrerasComponent },
    { path: 'categorias', canActivate: [auntenticacionGuard], component: CategoriasComponent },
    { path: 'conceptosAbonos', canActivate: [auntenticacionGuard], component: ConceptosAbonosComponent },
    { path: 'conceptosCargos', canActivate: [auntenticacionGuard], component: ConceptosCargosComponent },
    { path: 'conceptosDeducciones', canActivate: [auntenticacionGuard], component: ConceptosDedcuccionesComponent },
    { path: 'conceptosDescuentos', canActivate: [auntenticacionGuard], component: ConceptosDescuentosComponent },
    { path: 'conceptosPercepciones', canActivate: [auntenticacionGuard], component: ConceptosPercepcionesComponent },
    { path: 'conceptosDevoluciones', canActivate: [auntenticacionGuard], component: ConceptosDevolucionesComponent },
    { path: 'conceptosExtras', canActivate: [auntenticacionGuard], component: ConceptosExtrasComponent },
    { path: 'cuentas', canActivate: [auntenticacionGuard], component: CuentasComponent },
    { path: 'departamentos', canActivate: [auntenticacionGuard], component: DepartamentosComponent },
    { path: 'empresasCursos', canActivate: [auntenticacionGuard], component: EmpresasCursosComponent },
    { path: 'escuelas', canActivate: [auntenticacionGuard], component: EscuelasComponent },
    { path: 'tipoEscuelas', canActivate: [auntenticacionGuard], component: TiposEscuelasComponent },
    { path: 'estados', canActivate: [auntenticacionGuard], component: EstadosComponent },
    { path: 'formasPago', canActivate: [auntenticacionGuard], component: FormasPagosComponent },
    { path: 'turnos', canActivate: [auntenticacionGuard], component: TurnosComponent },
    { path: 'horarios', canActivate: [auntenticacionGuard], component: HorariosComponent },
    { path: 'mediosContactos', canActivate: [auntenticacionGuard], component: MediosContactosComponent },
    { path: 'mediosPublicitarios', canActivate: [auntenticacionGuard], component: MediosPublicitariosComponent },
    { path: 'metodosPago', canActivate: [auntenticacionGuard], component: MetodosPagosComponent },
    { path: 'modalidades', canActivate: [auntenticacionGuard], component: ModalidadesComponent },
    { path: 'motivosBachilleratos', canActivate: [auntenticacionGuard], component: MotivosBachilleratosComponent },
    { path: 'motivosInscripciones', canActivate: [auntenticacionGuard], component: MotivosInscripcionesComponent },
    { path: 'municipios', canActivate: [auntenticacionGuard], component: MunicipiosComponent },
    { path: 'cursos', canActivate: [auntenticacionGuard], component: CursosComponent },
    { path: 'niveles', canActivate: [auntenticacionGuard], component: NivelesComponent },
    { path: 'paridades', canActivate: [auntenticacionGuard], component: ParidadesComponent },
    { path: 'puestos', canActivate: [auntenticacionGuard], component: PuestosComponent },
    { path: 'rubrosEgresos', canActivate: [auntenticacionGuard], component: RubrosEgresosComponent },
    { path: 'rubrosIngresos', canActivate: [auntenticacionGuard], component: RubrosComponent },
    { path: 'sedes', canActivate: [auntenticacionGuard], component: SedesComponent },
    { path: 'sexos', canActivate: [auntenticacionGuard], component: SexosComponent },
    { path: 'subniveles', canActivate: [auntenticacionGuard], component: SubnivelesComponent },
    { path: 'sucursales', canActivate: [auntenticacionGuard], component: SucursalesComponent },
    { path: 'tiposEgreso', canActivate: [auntenticacionGuard], component: TiposEgresosComponent },
    { path: 'tiposPago', canActivate: [auntenticacionGuard], component: TiposPagosComponent },
    { path: 'tipoUsuario', canActivate: [auntenticacionGuard], component: TiposUsuariosComponent },
    { path: 'tiposIngreso', canActivate: [auntenticacionGuard], component: TiposIngresosComponent },
    { path: 'viasPublicitarias', canActivate: [auntenticacionGuard], component: ViasPublicitariasComponent },
    { path: 'modulos', canActivate: [auntenticacionGuard], component: ModulosComponent },
    { path: 'paginas', canActivate: [auntenticacionGuard], component: PaginasComponent },
    { path: 'altaCursos', canActivate: [auntenticacionGuard], component: AltaCursosComponent },
    { path: 'ingresosDirectivos', canActivate: [auntenticacionGuard], component: IngresosDirectivosComponent },
    { path: 'egresosDirectivos', canActivate: [auntenticacionGuard], component: EgresosDirectivosComponent },
    { path: 'balanceDirectivos', canActivate: [auntenticacionGuard], component: BalanceSucursalComponent },
    { path: 'permisos', canActivate: [auntenticacionGuard], component: PermisosComponent },
    { path: 'metasIngresosEstadisticas', canActivate: [auntenticacionGuard], component: MetasIngresosComponent },
    { path: 'metasIngresosEstadisticas', canActivate: [auntenticacionGuard], component: MetasIngresosComponent },
    { path: 'aceptacionNominasDirectivos', canActivate: [auntenticacionGuard], component: AutorizacionNominasComponent},
    { path: 'recepcionVales', canActivate: [auntenticacionGuard], component: RecepcionValesComponent},
    { path: 'solicitudesModificacionIngresos', canActivate: [auntenticacionGuard], component: SolicitudesModificacionIngresosComponent},
    { path: 'cobroNominas', canActivate: [auntenticacionGuard], component: CobroNominasComponent},
    { path: 'balanceAdministrativos', canActivate: [auntenticacionGuard], component: CorteCajaComponent},
    { path: 'cursosCongelados', canActivate: [auntenticacionGuard], component: CursosCongeladosComponent},
    { path: 'egresosAdministrativos', canActivate: [auntenticacionGuard], component: EgresosAdministrativosComponent},
    { path: 'emisionVales', canActivate: [auntenticacionGuard], component: EmisionValesComponent},
    { path: 'ingresosAdministrativos', canActivate: [auntenticacionGuard], component: IngresosAdministrativosComponent},
    { path: 'inscripciones', canActivate: [auntenticacionGuard], component: InscripcionesComponent},
    { path: 'recepcionTransferencias', canActivate: [auntenticacionGuard], component: TransferenciaSucursalesComponent},
    { path: 'valeGerencial', canActivate: [auntenticacionGuard], component: ValesGerencialesComponent},
    { path: 'auditoriasIngresos', canActivate: [auntenticacionGuard], component: IngresosAuditoriasComponent},
    { path: 'solicitudesModificacionEgresos', canActivate: [auntenticacionGuard], component: SolicitudesModificacionEgresosComponent},
    { path: 'solicitudesNominas', canActivate: [auntenticacionGuard], component: SolicitudesNominasComponent },
    { path: 'emisionTransferencias', canActivate: [auntenticacionGuard], component: TransferenciasComponent },
    { path: 'empleados', canActivate: [auntenticacionGuard], component: EmpleadosComponent },
    { path: 'nominasEmpleados', canActivate: [auntenticacionGuard], component: NominasComponent },
    { path: 'inscripcionesVentas', canActivate: [auntenticacionGuard], component: InscripcionesVentasComponent },
    { path: 'aulas', canActivate: [auntenticacionGuard], component: AulasComponent },
    { path: 'balanceGerentes', canActivate: [auntenticacionGuard], component: BalanceGerentesComponent },
    { path: 'bloqueoHorarios', canActivate: [auntenticacionGuard], component: BloqueoHorariosComponent },
    { path: 'controlHorarios', canActivate: [auntenticacionGuard], component: ControlHorariosComponent },
    { path: 'egresosGerentes', canActivate: [auntenticacionGuard], component: EgresosGerentesComponent },
    { path: 'empleadosGerentes', canActivate: [auntenticacionGuard], component: EmpleadosGerentesComponent },
    { path: 'ingresosGerentes', canActivate: [auntenticacionGuard], component: IngresosGerentesComponent },
    { path: 'reservarAulas', canActivate: [auntenticacionGuard], component: ReservacionAulasComponent },
    { path: 'webConfiguraciones', canActivate: [auntenticacionGuard], component: WebConfiguracionComponent },
    { path: 'comisionesVendedor', canActivate: [auntenticacionGuard], component: ComisionesEmpleadoComponent },
    { path: 'comisiones', canActivate: [auntenticacionGuard], component: ComisionesGeneralesComponent },
    { path: 'configuracionComisionCursos', canActivate: [auntenticacionGuard], component: ComisionesCursosComponent },
    { path: 'metasIngresos', canActivate: [auntenticacionGuard], component: MetasIngresosVentasComponent },
    { path: 'metasCategorias', canActivate: [auntenticacionGuard], component: MetasCategoriasVentasComponent },
    { path: 'metasCursos', canActivate: [auntenticacionGuard], component: MetasCursosVentasComponent },
    { path: 'metasSucursales', canActivate: [auntenticacionGuard], component: MetasMesVentasComponent },
    { path: 'perfil', canActivate: [auntenticacionGuard], component: PerfilComponent },
    { path: 'estadisticasMaestras', canActivate: [auntenticacionGuard], component: ReporteEstadisticasMaestasComponent },
    { path: 'reporteImpartidos', canActivate: [auntenticacionGuard], component: ReporteAlumnosComponent },
    { path: 'reporteEgresosGenerales', canActivate: [auntenticacionGuard], component: ReporteEgresosComponent },
    { path: 'reporteIngresosGenerales', canActivate: [auntenticacionGuard], component: ReporteIngresosComponent },
    { path: 'reporteIngresosBasico', canActivate: [auntenticacionGuard], component: ReporteIngresosBasicoComponent },
    { path: 'reporteEgresosBasico', canActivate: [auntenticacionGuard], component: ReporteEgresosBasicoComponent },
    { path: 'reporteInscritos', canActivate: [auntenticacionGuard], component: ReporteInscritosComponent },
    { path: 'crm', canActivate: [auntenticacionGuard], component: CRMComponent },
    { path: 'citas', canActivate: [auntenticacionGuard], component: CitasComponent },
    { path: 'calificador', canActivate: [auntenticacionGuard], component: CalificadorComponent },
    { path: 'metasEconomicas', canActivate: [auntenticacionGuard], component: MetasEconomicasComponent },
    { path: 'metaEconomicaVendedor', canActivate: [auntenticacionGuard], component: MetasEconomicasVendedorComponent },
    { path: 'metaEconomica', canActivate: [auntenticacionGuard], component: MetaEconomicaComponent },
    { path: 'secciones', canActivate: [auntenticacionGuard], component: SeccionesComponent },
    { path: 'lecturas', canActivate: [auntenticacionGuard], component: LecturasComponent },
    { path: 'testing', canActivate: [auntenticacionGuard], component: TestingComponent },
    { path: 'aplicacionProfesores', canActivate: [auntenticacionGuard], component: AplicacionProfesoresComponent },
    { path: 'aplicacionHome', canActivate: [auntenticacionGuard], component: AplicacionHomeComponent },
    { path: 'aplicacionGuiasAlumno', canActivate: [auntenticacionGuard], component: AplicacionGuiaAlumnoComponent },
    { path: 'aplicacionCursos', canActivate: [auntenticacionGuard], component: AplicacionCursosComponent },
    { path: 'balanceCuentas', canActivate: [auntenticacionGuard], component: BalanceCuentasComponent },
    { path: 'auditar', canActivate: [auntenticacionGuard], component: AuditarComponent },
    { path: 'cuentasCobrar', canActivate: [auntenticacionGuard], component: CuentasCobrarComponent },
    { path: 'cuentasPagar', canActivate: [auntenticacionGuard], component: CuentasPagarComponent },
    { path: 'balanceCalendarios', canActivate: [auntenticacionGuard], component: BalanceCalendariosComponent },
    { path: 'reporteVentas', canActivate: [auntenticacionGuard], component: ReporteVentasComponent },
    { path: 'prestadores', canActivate: [auntenticacionGuard], component: PrestadoresComponent },
    { path: 'creditos', canActivate: [auntenticacionGuard], component: CreditosComponent },
    { path: 'prestamos', canActivate: [auntenticacionGuard], component: PrestamosComponent },
    { path: 'temas/:id/:nombre', canActivate: [auntenticacionGuard], component: TemasComponent },
    { path: 'subtemas/:id/:nombre', canActivate: [auntenticacionGuard], component: SubtemasComponent },
    { path: 'quizes/:id/:nombre', canActivate: [auntenticacionGuard], component: QuizesComponent },
    { path: 'ficha/:ficha', canActivate: [auntenticacionGuard], component: FichaComponent },
    { path: 'busqueda/:alumno', canActivate: [auntenticacionGuard], component: BusquedaAlumnosPrincipalComponent },
    { path: 'nomina/:nomina', canActivate: [auntenticacionGuard], component: NominaPrincipalComponent },
    { path: 'alumno/:alumno', canActivate: [auntenticacionGuard], component: AlumnoPrincipalComponent },
    { path: 'prospecto/:prospecto', canActivate: [auntenticacionGuard], component: ProspectoPrincipalComponent },
    { path: 'seguimiento/:seguimiento', canActivate: [auntenticacionGuard], component: SeguimientosPrincipalComponent },
    { path: 'calificarGrupo/:grupo', canActivate: [auntenticacionGuard], component: CalificarGrupoComponent},
    { path: 'credito/:credito', canActivate: [auntenticacionGuard], component: CreditoComponent},
    { path: 'prestamo/:prestamo', canActivate: [auntenticacionGuard], component: PrestamoComponent},
    { path: 'alumnoDatos/:alumno', canActivate: [auntenticacionGuard], component: AlumnoCodigoComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
