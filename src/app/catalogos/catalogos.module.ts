import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BancosComponent } from './bancos/bancos.component';
import { ModalBancoComponent } from './bancos/modales/modal-banco/modal-banco.component';
import { UiSearchModule } from '../ui-search/ui-search.module';
import { CalendariosComponent } from './calendarios/calendarios.component';
import { ModalCalendarioComponent } from './calendarios/modales/modal-calendario/modal-calendario.component';
import { CampaniasComponent } from './campanias/campanias.component';
import { ModalCampaniaComponent } from './campanias/modales/modal-campania/modal-campania.component';
import { UniversidadesComponent } from './universidades/universidades.component';
import { ModalUniversidadComponent } from './universidades/modales/modal-universidad/modal-universidad.component';
import { CentrosUniversitariosComponent } from './centros-universitarios/centros-universitarios.component';
import { ModalCentroUniversitarioComponent } from './centros-universitarios/modales/modal-centro-universitario/modal-centro-universitario.component';
import { CarrerasComponent } from './carreras/carreras.component';
import { ModalCarreraComponent } from './carreras/modales/modal-carrera/modal-carrera.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { ModalCategoriaComponent } from './categorias/modales/modal-categoria/modal-categoria.component';
import { ConceptosAbonosComponent } from './conceptos-abonos/conceptos-abonos.component';
import { ModalConceptoAbonoComponent } from './conceptos-abonos/modales/modal-concepto-abono/modal-concepto-abono.component';
import { ConceptosCargosComponent } from './conceptos-cargos/conceptos-cargos.component';
import { ModalConceptoCargoComponent } from './conceptos-cargos/modales/modal-concepto-cargo/modal-concepto-cargo.component';
import { ConceptosDedcuccionesComponent } from './conceptos-dedcucciones/conceptos-dedcucciones.component';
import { ModalConceptoDeduccionComponent } from './conceptos-dedcucciones/modales/modal-concepto-deduccion/modal-concepto-deduccion.component';
import { ConceptosDescuentosComponent } from './conceptos-descuentos/conceptos-descuentos.component';
import { ModalConceptoDescuentoComponent } from './conceptos-descuentos/modales/modal-concepto-descuento/modal-concepto-descuento.component';
import { ConceptosPercepcionesComponent } from './conceptos-percepciones/conceptos-percepciones.component';
import { ModalConceptoPercepcionComponent } from './conceptos-percepciones/modales/modal-concepto-percepcion/modal-concepto-percepcion.component';
import { ConceptosDevolucionesComponent } from './conceptos-devoluciones/conceptos-devoluciones.component';
import { ModalConceptoDevolucionComponent } from './conceptos-devoluciones/modales/modal-concepto-devolucion/modal-concepto-devolucion.component';
import { ConceptosExtrasComponent } from './conceptos-extras/conceptos-extras.component';
import { ModalConceptoExtraComponent } from './conceptos-extras/modales/modal-concepto-extra/modal-concepto-extra.component';
import { CuentasComponent } from './cuentas/cuentas.component';
import { ModalCuentaComponent } from './cuentas/modales/modal-cuenta/modal-cuenta.component';
import { DepartamentosComponent } from './departamentos/departamentos.component';
import { ModalDepartamentoComponent } from './departamentos/modales/modal-departamento/modal-departamento.component';
import { EmpresasCursosComponent } from './empresas-cursos/empresas-cursos.component';
import { ModalEmpresaCursoComponent } from './empresas-cursos/modales/modal-empresa-curso/modal-empresa-curso.component';
import { EscuelasComponent } from './escuelas/escuelas.component';
import { ModalEscuelaComponent } from './escuelas/modales/modal-escuela/modal-escuela.component';
import { TiposEscuelasComponent } from './tipos-escuelas/tipos-escuelas.component';
import { ModalTipoEscuelaComponent } from './tipos-escuelas/modales/modal-tipo-escuela/modal-tipo-escuela.component';
import { EstadosComponent } from './estados/estados.component';
import { ModalEstadoComponent } from './estados/modales/modal-estado/modal-estado.component';
import { FormasPagosComponent } from './formas-pagos/formas-pagos.component';
import { ModalFormaPagoComponent } from './formas-pagos/modales/modal-forma-pago/modal-forma-pago.component';
import { TurnosComponent } from './turnos/turnos.component';
import { ModalTurnoComponent } from './turnos/modales/modal-turno/modal-turno.component';
import { HorariosComponent } from './horarios/horarios.component';
import { ModalHorarioComponent } from './horarios/modales/modal-horario/modal-horario.component';
import { MediosContactosComponent } from './medios-contactos/medios-contactos.component';
import { ModalMedioContactoComponent } from './medios-contactos/modales/modal-medio-contacto/modal-medio-contacto.component';
import { MediosPublicitariosComponent } from './medios-publicitarios/medios-publicitarios.component';
import { ModalMedioPublicitarioComponent } from './medios-publicitarios/modales/modal-medio-publicitario/modal-medio-publicitario.component';
import { MetodosPagosComponent } from './metodos-pagos/metodos-pagos.component';
import { ModalMetodoPagoComponent } from './metodos-pagos/modales/modal-metodo-pago/modal-metodo-pago.component';
import { ModalidadesComponent } from './modalidades/modalidades.component';
import { ModalModalidadComponent } from './modalidades/modales/modal-modalidad/modal-modalidad.component';
import { MotivosBachilleratosComponent } from './motivos-bachilleratos/motivos-bachilleratos.component';
import { ModalMotivoBachilleratoComponent } from './motivos-bachilleratos/modales/modal-motivo-bachillerato/modal-motivo-bachillerato.component';
import { MotivosInscripcionesComponent } from './motivos-inscripciones/motivos-inscripciones.component';
import { ModalMotivoInscripcionComponent } from './motivos-inscripciones/modales/modal-motivo-inscripcion/modal-motivo-inscripcion.component';
import { MunicipiosComponent } from './municipios/municipios.component';
import { ModalMunicipioComponent } from './municipios/modales/modal-municipio/modal-municipio.component';
import { CursosComponent } from './cursos/cursos.component';
import { ModalCursoComponent } from './cursos/modales/modal-curso/modal-curso.component';
import { NivelesComponent } from './niveles/niveles.component';
import { ModalNivelComponent } from './niveles/modales/modal-nivel/modal-nivel.component';
import { ParidadesComponent } from './paridades/paridades.component';
import { ModalParidadComponent } from './paridades/modales/modal-paridad/modal-paridad.component';
import { ModalCursosParidadesComponent } from './paridades/modales/modal-cursos-paridades/modal-cursos-paridades.component';
import { PuestosComponent } from './puestos/puestos.component';
import { ModalPuestoComponent } from './puestos/modales/modal-puesto/modal-puesto.component';
import { RubrosEgresosComponent } from './rubros-egresos/rubros-egresos.component';
import { ModalRubroEgresoComponent } from './rubros-egresos/modales/modal-rubro-egreso/modal-rubro-egreso.component';
import { RubrosComponent } from './rubros/rubros.component';
import { ModalRubroComponent } from './rubros/modales/modal-rubro/modal-rubro.component';
import { SedesComponent } from './sedes/sedes.component';
import { ModalSedeComponent } from './sedes/modales/modal-sede/modal-sede.component';
import { SexosComponent } from './sexos/sexos.component';
import { ModalSexoComponent } from './sexos/modales/modal-sexo/modal-sexo.component';
import { SubnivelesComponent } from './subniveles/subniveles.component';
import { ModalSubnivelComponent } from './subniveles/modales/modal-subnivel/modal-subnivel.component';
import { SucursalesComponent } from './sucursales/sucursales.component';
import { ModalSucursalComponent } from './sucursales/modales/modal-sucursal/modal-sucursal.component';
import { TiposEgresosComponent } from './tipos-egresos/tipos-egresos.component';
import { ModalTipoEgresoComponent } from './tipos-egresos/modales/modal-tipo-egreso/modal-tipo-egreso.component';
import { TiposPagosComponent } from './tipos-pagos/tipos-pagos.component';
import { ModalTipoPagoComponent } from './tipos-pagos/modales/modal-tipo-pago/modal-tipo-pago.component';
import { TiposUsuariosComponent } from './tipos-usuarios/tipos-usuarios.component';
import { ModalTipoUsuarioComponent } from './tipos-usuarios/modales/modal-tipo-usuario/modal-tipo-usuario.component';
import { TiposIngresosComponent } from './tipos-ingresos/tipos-ingresos.component';
import { ModalTipoIngresoComponent } from './tipos-ingresos/modales/modal-tipo-ingreso/modal-tipo-ingreso.component';
import { ViasPublicitariasComponent } from './vias-publicitarias/vias-publicitarias.component';
import { ModalViaPublicitariaComponent } from './vias-publicitarias/modales/modal-via-publicitaria/modal-via-publicitaria.component';
import { PrestadoresComponent } from './prestadores/prestadores.component';
import { ModalPrestadorComponent } from './prestadores/modales/modal-prestador/modal-prestador.component';
import { PlantillasPonderacionComponent } from './plantillas-ponderacion/plantillas-ponderacion.component';
import { ModalPlantillaPonderacionComponent } from './plantillas-ponderacion/modales/modal-plantilla-ponderacion/modal-plantilla-ponderacion.component';

@NgModule({
  declarations: [
    BancosComponent,
    ModalBancoComponent,
    CalendariosComponent,
    ModalCalendarioComponent,
    CampaniasComponent,
    ModalCampaniaComponent,
    UniversidadesComponent,
    ModalUniversidadComponent,
    CentrosUniversitariosComponent,
    ModalCentroUniversitarioComponent,
    CarrerasComponent,
    ModalCarreraComponent,
    CategoriasComponent,
    ModalCategoriaComponent,
    ConceptosAbonosComponent,
    ModalConceptoAbonoComponent,
    ConceptosCargosComponent,
    ModalConceptoCargoComponent,
    ConceptosDedcuccionesComponent,
    ModalConceptoDeduccionComponent,
    ConceptosDescuentosComponent,
    ModalConceptoDescuentoComponent,
    ConceptosPercepcionesComponent,
    ModalConceptoPercepcionComponent,
    ConceptosDevolucionesComponent,
    ModalConceptoDevolucionComponent,
    ConceptosExtrasComponent,
    ModalConceptoExtraComponent,
    CuentasComponent,
    ModalCuentaComponent,
    DepartamentosComponent,
    ModalDepartamentoComponent,
    EmpresasCursosComponent,
    ModalEmpresaCursoComponent,
    EscuelasComponent,
    ModalEscuelaComponent,
    TiposEscuelasComponent,
    ModalTipoEscuelaComponent,
    EstadosComponent,
    ModalEstadoComponent,
    FormasPagosComponent,
    ModalFormaPagoComponent,
    TurnosComponent,
    ModalTurnoComponent,
    HorariosComponent,
    ModalHorarioComponent,
    MediosContactosComponent,
    ModalMedioContactoComponent,
    MediosPublicitariosComponent,
    ModalMedioPublicitarioComponent,
    MetodosPagosComponent,
    ModalMetodoPagoComponent,
    ModalidadesComponent,
    ModalModalidadComponent,
    MotivosBachilleratosComponent,
    ModalMotivoBachilleratoComponent,
    MotivosInscripcionesComponent,
    ModalMotivoInscripcionComponent,
    MunicipiosComponent,
    ModalMunicipioComponent,
    CursosComponent,
    ModalCursoComponent,
    NivelesComponent,
    ModalNivelComponent,
    ParidadesComponent,
    ModalParidadComponent,
    ModalCursosParidadesComponent,
    PuestosComponent,
    ModalPuestoComponent,
    RubrosEgresosComponent,
    ModalRubroEgresoComponent,
    RubrosComponent,
    ModalRubroComponent,
    SedesComponent,
    ModalSedeComponent,
    SexosComponent,
    ModalSexoComponent,
    SubnivelesComponent,
    ModalSubnivelComponent,
    SucursalesComponent,
    ModalSucursalComponent,
    TiposEgresosComponent,
    ModalTipoEgresoComponent,
    TiposPagosComponent,
    ModalTipoPagoComponent,
    TiposUsuariosComponent,
    ModalTipoUsuarioComponent,
    TiposIngresosComponent,
    ModalTipoIngresoComponent,
    ViasPublicitariasComponent,
    ModalViaPublicitariaComponent,
    PrestadoresComponent,
    ModalPrestadorComponent,
    PlantillasPonderacionComponent,
    ModalPlantillaPonderacionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    UiSearchModule
  ]
})
export class CatalogosModule { }
