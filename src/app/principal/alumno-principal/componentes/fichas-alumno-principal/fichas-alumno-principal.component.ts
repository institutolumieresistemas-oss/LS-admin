import { Component, Input } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';
import { AlumnosService } from '../../../../servicios/alumnos.service';
import { PdfService } from '../../../../servicios/pdf.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fichas-alumno-principal',
  templateUrl: './fichas-alumno-principal.component.html',
  styleUrl: './fichas-alumno-principal.component.css'
})
export class FichasAlumnoPrincipalComponent {
  @Input() alumno: any;
  cargando = true;
  datos: any;
  vista = '';
  dato: any;
  listas = {
    publicitarios: {
      contacto: [],
      medios: [],
      vias: [],
      motivos: [],
      bachillerato: [],
      campanias: [],
      empresas: []
    },
    aspiracion: {
      universidades: [],
      centros: [],
      carreras: []
    }
  }
  constructor(private generales: GeneralesService,
              private servicio: AlumnosService,
              private pdf: PdfService,
              private router: Router
            ){}

  ngOnInit(){
  this.mostrar();
  }

  mostrar(){
    this.cargando = true;
    this.servicio.fichas({id: this.alumno}).subscribe((respuesta: any) => {
      this.cargando = false;
      this.datos = respuesta.datos;
      this.listas = respuesta.listas
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }

  modal(vista: any){
    this.vista = '';
    this.generales.delay(500).then(fun => {
      this.vista = vista;
      setTimeout(() => {
        this.generales.abrirModal();
      }, 50);
    });
  }

  registro(dato: any){
    this.cargando = true;
    this.servicio.actualizarNumeroRegistro(dato).subscribe((respuesta: any) => {
      this.cargando = false;
      this.generales.mensajeCorrecto('Numero de registro actualizado correctamente');
      this.generales.cerrarModal();
      this.mostrar();
      this.dato = undefined;
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }

  estatus(dato: any){
    this.cargando = true;
    this.servicio.actualizarEstatusFicha(dato).subscribe((respuesta: any) => {
      this.cargando = false;
      this.generales.mensajeCorrecto('Estatus actualizado correctamente');
      this.generales.cerrarModal();
      this.mostrar();
      this.dato = undefined;
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }

  imprimirBoleta(dato: any){
    this.cargando = true;
    this.pdf.pdfBoletaAlumno(dato);
    this.cargando = false;
  }

  publicitarios(dato: any){
    this.cargando = true;
    this.servicio.actualizarDatosPublicitarios(dato).subscribe((respuesta: any) => {
      this.cargando = false;
      this.generales.mensajeCorrecto('Datos publicitarios actualizados correctamente');
      this.generales.cerrarModal();
      this.mostrar();
      this.dato = undefined;
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }

  aspiraciones(dato: any){
    this.cargando = true;
    this.servicio.actualizarDatosAspiracion(dato).subscribe((respuesta: any) => {
      this.cargando = false;
      this.generales.mensajeCorrecto('Datos de aspiración actualizados correctamente');
      this.generales.cerrarModal();
      this.mostrar();
      this.dato = undefined;
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }

  abrirFicha(dato: any){
    
    this.router.navigate(['admin/ficha', dato.id]);
  }

  calificaciones(){
    
  }
}
