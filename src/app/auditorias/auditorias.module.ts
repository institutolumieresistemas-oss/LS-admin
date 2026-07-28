import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngresosAuditoriasComponent } from './ingresos-auditorias/ingresos-auditorias.component';
import { UiSearchModule } from '../ui-search/ui-search.module';
import { ModalFinancierosComponent } from './ingresos-auditorias/modales/modal-financieros/modal-financieros.component';
import { ModalObservacionesIngresoComponent } from './ingresos-auditorias/modales/modal-observaciones-ingreso/modal-observaciones-ingreso.component';
import { BalanceCuentasComponent } from './balance-cuentas/balance-cuentas.component';
import { AuditarComponent } from './auditar/auditar.component';
import { ModalTraspasoComponent } from './balance-cuentas/modales/modal-traspaso/modal-traspaso.component';
import { CuentasCobrarComponent } from './cuentas-cobrar/cuentas-cobrar.component';
import { CuentasPagarComponent } from './cuentas-pagar/cuentas-pagar.component';
import { BalanceCalendariosComponent } from './balance-calendarios/balance-calendarios.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    IngresosAuditoriasComponent,
    ModalFinancierosComponent,
    ModalObservacionesIngresoComponent,
    BalanceCuentasComponent,
    AuditarComponent,
    ModalTraspasoComponent,
    CuentasCobrarComponent,
    CuentasPagarComponent,
    BalanceCalendariosComponent
  ],
  imports: [
    CommonModule,
    UiSearchModule,
    FormsModule
  ]
})
export class AuditoriasModule { }
