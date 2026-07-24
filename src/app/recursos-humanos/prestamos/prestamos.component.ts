import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { datatableConfig } from '../../interfaces/tables.interface';
import { GeneralesService } from '../../servicios/generales.service';
import { PrestamosService } from '../../servicios/prestamos.service';

@Component({
  selector: 'app-prestamos',
  templateUrl: './prestamos.component.html',
  styleUrl: './prestamos.component.css'
})
export class PrestamosComponent implements OnInit {
  private generales = inject(GeneralesService);
  private servicio = inject(PrestamosService);
  private router = inject(Router);

  configuracion: datatableConfig = {
    alias: ['Calendario', 'Empleado', 'Cuenta', 'Empleado', 'Monto', 'Abonos', 'Saldo'],
    encabezados: ['calendario', 'empleado', 'cuenta', 'empleado', 'monto', 'abonos', 'saldo'],
    busqueda: true
  };
  datos: any[] = [];
  seleccion: any;
  vista = '';
  listas = {
    cuentas: [],
    formaspagos: [],
    empleados: [],
  };
  ngOnInit(): void {
    this.mostrar();
  }
  
  modal(vista: string): void {
    this.vista = '';
    this.generales.delay(500).then(() => {
      this.vista = vista;
      this.generales.abrirModal();
    });
  }

  
  
  mostrar(): void {
    this.servicio.mostrar().subscribe((respuesta: any) => {
      this.datos = respuesta.datos;
      this.listas = respuesta.listas;
    });
  }
  
  nuevo(dato: any): void {
    if (this.servicio.validar(dato)) {
      this.servicio.nuevo(dato).subscribe((respuesta: any) => {
        this.generales.mensajeCorrecto('Préstamo agregado correctamente');
        this.datos = this.generales.agregarDatoArray(this.datos, respuesta);
        this.generales.cerrarModal();
      });
    }
  }

  ruta(): void {
    this.router.navigate(['/admin/prestamo', this.seleccion.id]);
  }
}