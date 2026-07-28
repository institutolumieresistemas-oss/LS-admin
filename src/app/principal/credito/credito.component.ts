import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CreditosService } from '../../servicios/creditos.service';
import { GeneralesService } from '../../servicios/generales.service';
import { datatableConfig } from '../../interfaces/tables.interface';

@Component({
  selector: 'app-credito',
  templateUrl: './credito.component.html',
  styleUrl: './credito.component.css'
})
export class CreditoComponent implements OnInit {
  private rutaActivada = inject(ActivatedRoute);
  private servicio = inject(CreditosService);
  private generales = inject(GeneralesService);

  configuracion: datatableConfig = {
    alias: ['Forma de pago', 'Cuenta', 'Monto', 'Tipo de abono', 'Empleado', 'Ingreso', 'Egreso'],
    encabezados: ['forma', 'cuenta', 'monto', 'tipoNombre', 'empleado', 'ingreso', 'egreso'],
    busqueda: true
  };
  id: any;
  datos: any;
  abonos: any;
  vista = '';
  listas = {
    formaspagos: [],
    cuentas: [] 
  };
  tipos = [
    { id: 1, nombre: 'Capital' },
    { id: 2, nombre: 'Impuestos' }
  ]
  abono = {
    idFormaPago: 0,
    idCuenta: 0,
    monto: '',
    tipo: 0
  }

  ngOnInit(){
    this.id = this.rutaActivada.snapshot.params['credito'];
    this.traer();
  }

  traer(){
    this.servicio.traer({id: this.id}).subscribe((respuesta: any) => {
      this.datos = respuesta.datos;
      this.abonos = respuesta.datos.abonos;
      this.listas = respuesta.listas;
    });
  }

  agregarAbono() {
    const dato = {
      tipoPrestador: this.datos.tipo,
      ...this.abono,
      id: this.datos.id,
      idPrestador: this.datos.idPrestador
    };
    if (this.servicio.validarAbono(dato)) {
      this.servicio.abono(dato).subscribe((respuesta: any) => {
        this.generales.mensajeCorrecto('Abono agregado correctamente');
        this.traer();
        this.abono = {
          idFormaPago: 0,
          idCuenta: 0,
          monto: '',
          tipo: 0
        };
      },
      (error: any) => {
        this.generales.interpretarError(error);
      });
    }
  }
}
