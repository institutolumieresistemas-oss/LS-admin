import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrestamosService } from '../../servicios/prestamos.service';
import { GeneralesService } from '../../servicios/generales.service';
import { datatableConfig } from '../../interfaces/tables.interface';

@Component({
  selector: 'app-prestamo',
  templateUrl: './prestamo.component.html',
  styleUrl: './prestamo.component.css'
})
export class PrestamoComponent {
  private rutaActivada = inject(ActivatedRoute);
  private servicio = inject(PrestamosService);
  private generales = inject(GeneralesService);

  configuracion: datatableConfig = {
    alias: ['Forma de pago', 'Cuenta', 'Monto', 'Empleado', 'Ingreso'],
    encabezados: ['forma', 'cuenta', 'monto', 'empleado', 'ingreso'],
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
  abono = {
    idFormaPago: 0,
    idCuenta: 0,
    monto: ''
  }

  ngOnInit(){
    this.id = this.rutaActivada.snapshot.params['prestamo'];
    this.traer();
  }

  traer(){
    this.servicio.traer({id: this.id}).subscribe((respuesta: any) => {
      this.datos = respuesta.datos;
      this.abonos = respuesta.datos.lista_abonos;
      this.listas = respuesta.listas;
    });
  }

  agregarAbono() {
    const dato = {
      tipoPrestador: this.datos.tipo,
      ...this.abono,
      id: this.datos.id
    };
    if (this.servicio.validarAbono(dato)) {
      this.servicio.abono(dato).subscribe((respuesta: any) => {
        this.generales.mensajeCorrecto('Abono agregado correctamente');
        this.traer();
        this.abono = {
          idFormaPago: 0,
          idCuenta: 0,
          monto: ''
        };
      },
      (error: any) => {
        this.generales.interpretarError(error);
      });
    }
  }
}
