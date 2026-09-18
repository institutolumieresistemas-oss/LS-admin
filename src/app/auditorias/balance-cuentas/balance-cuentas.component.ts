import { Component } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';
import { BalancesService } from '../../servicios/balances.service';
import { TraspasosService } from '../../servicios/traspasos.service';

declare function exportCSVFile(headers: string[] | null, items: unknown[], filename: string): void;

@Component({
  selector: 'app-balance-cuentas',
  templateUrl: './balance-cuentas.component.html',
  styleUrl: './balance-cuentas.component.css'
})
export class BalanceCuentasComponent {
  cargando = false;
  cuentas: any;
  sucursales: any;
  vista = '';
  seleccion: any;
  formas: any;
  constructor(
    public generales: GeneralesService,
    private servicios: BalancesService,
    private traspasos: TraspasosService
  ){}

  ngOnInit(){
    this.mostrar();
  }

  modal(){
    this.vista = '';
    this.generales.delay(200).then(fun =>{
      this.vista = 'traspaso';
      this.generales.abrirModal();
    });
  }

  mostrar(){
    this.servicios.cuentas().subscribe((respuesta: any) => {
      this.cuentas = respuesta.cuentas;
      this.sucursales = respuesta.sucursales;
      this.formas = respuesta.formas;
    })
  }

  traspaso(datos: any){
    if (this.seleccion.efectivo) {
      const montoATraspasar = parseFloat(datos.monto);
      const saldoDisponible = parseFloat(this.seleccion.totalFinal);
  
      if (saldoDisponible < montoATraspasar) {
        this.generales.mensajeError('Error: No cuentas con suficiente saldo en Efectivo para realizar este traspaso.');
        return; 
      }

      if(this.generales.validarEntero(datos.idCuenta)){
        this.generales.mensajeError('Error: No has seleccionado la cuenta a la que deseas traspasar el efectivo.');
        return;
      }
    }
    const body = {
      egreso: this.seleccion,
      ingreso: datos
    }

    this.traspasos.nuevo(body).subscribe((respuesta: any) => {
      this.generales.mensajeCorrecto('Traspaso realizado correctamente');
      this.mostrar();
    });
  }

  efectivo(sucursal: any){
    this.seleccion = {
      id: 0,
      efectivo: true,
      totalFinal: sucursal.total_final,
      totalIngresos: sucursal.total_ingresos,
      totalEgresos: sucursal.total_egresos,
      nombre: 'Efectivo'
    };
    this.modal();
  }

  descargarExcel(lista: Record<string, unknown>[] | undefined, tipo: string, nombreCuenta: string): void {
    if (!lista || lista.length === 0) {
      this.generales.mensajeError(`No hay ${tipo.toLowerCase()} registrados para esta cuenta.`);
      return;
    }

    const copiaLista = lista.map((item: Record<string, unknown>) => {
      const nuevoItem: Record<string, unknown> = {};
      Object.keys(item).forEach(key => {
        let val = item[key];
        if (val === null || val === undefined) {
          val = '';
        } else if (typeof val === 'string') {
          val = val.replace(/,/g, ' ');
        }
        nuevoItem[key] = val;
      });

      if (!nuevoItem['fecha'] && item['created_at']) {
        const d = new Date(item['created_at'] as string);
        nuevoItem['fecha'] = !isNaN(d.getTime()) ? d.toISOString().split('T')[0] : item['created_at'];
      }

      const forma = item['idFormaPago'] ?? item['forma'];
      if (forma === 1 || forma === '1') {
        if ('idCuenta' in nuevoItem) {
          nuevoItem['idCuenta'] = 0;
        }
        if ('cuenta' in nuevoItem) {
          nuevoItem['cuenta'] = 0;
        }
      }

      return nuevoItem;
    });

    const mapClaves: Record<string, string> = {
      id: 'ID',
      fecha: 'Fecha',
      folio: 'Folio',
      concepto: 'Concepto',
      monto: 'Monto',
      forma: 'Forma de Pago',
      cuenta: 'Cuenta',
      banco: 'Banco',
      voucher: 'Voucher',
      activo: 'Activo',
      ficha: 'Ficha',
      usuario: 'Usuario',
      sucursal: 'Sucursal',
      tipo: 'Tipo',
      rubro: 'Rubro',
      calendario: 'Calendario',
      nivel: 'Nivel',
      estatus: 'Estatus'
    };

    const keys = Object.keys(copiaLista[0]);
    const headers = keys.map(key => mapClaves[key] || key.toUpperCase());
    
    const nombreArchivo = `${tipo}_${nombreCuenta.replace(/[^a-zA-Z0-9]/g, '_')}`;
    exportCSVFile(headers, copiaLista, nombreArchivo);
  }
}
