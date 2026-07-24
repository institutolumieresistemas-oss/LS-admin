import { Component } from '@angular/core';
import { datatableConfig } from '../../interfaces/tables.interface';
import { GeneralesService } from '../../servicios/generales.service';
import { CreditosService } from '../../servicios/creditos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creditos',
  templateUrl: './creditos.component.html',
  styleUrl: './creditos.component.css'
})
export class CreditosComponent {
  configuracion: datatableConfig = {
    alias: ['Calendario', 'Nivel', 'Prestador', 'Cuenta', 'Sucursal', 'Empleado', 'Monto', 'Abonos', 'Saldo'],
    encabezados: ['calendario', 'nivel', 'prestador', 'cuenta', 'sucursal', 'empleado', 'monto', 'pagos', 'saldo'],
    busqueda: true
  };
  datos: any;
  cargando = false;
  seleccion: any;
  vista: any;
  listas = {
    cuentas: [],
    formaspagos: [],
    prestadores: [],
    sucursales: [],
    calendarios: [],
    niveles: [],
    antiguos: [],
    actuales: []
  }
  constructor(
    private generales: GeneralesService,
    private servicio: CreditosService,
    private router: Router
  ){}
  
  ngOnInit(): void {
    this.mostrar();
  }
  
  modal(vista: any){
    this.vista = '';
    this.generales.delay(500).then(fun => {
      this.vista = vista;
      this.generales.abrirModal();
    });
  }
  
  mostrar(){
    this.cargando = true;
    this.servicio.mostrar().subscribe((respuesta: any) => {
      this.cargando = false;
      this.datos = respuesta.datos;
      this.listas = respuesta.listas;
    },
    (error: any) => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }
  
  nuevo(dato: any){
    if(this.servicio.validar(dato)){
      this.cargando = true;
      this.servicio.nuevo(dato).subscribe((respuesta: any) => {
        this.cargando = false;
        this.generales.mensajeCorrecto('Credito agregado correctamente');
        this.datos = this.generales.agregarDatoArray(this.datos, respuesta);
        this.generales.cerrarModal();
      },
      (error: any) => {
        this.cargando = false;
        this.generales.interpretarError(error);
      });
    }
  }

  ruta(){
    this.router.navigate(['/admin/credito', this.seleccion.id]);
  }
}
