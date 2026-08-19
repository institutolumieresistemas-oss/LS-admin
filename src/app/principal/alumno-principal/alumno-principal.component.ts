import { Component } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlumnosService } from '../../servicios/alumnos.service';
import { PdfService } from '../../servicios/pdf.service';

@Component({
  selector: 'app-alumno-principal',
  templateUrl: './alumno-principal.component.html',
  styleUrl: './alumno-principal.component.css'
})
export class AlumnoPrincipalComponent {
  dato = {
    nombre: '',
    codigo: '',
    id: 0,
  }
  listas = {
    inscripcion: {
      calendarios: [],
      niveles: [],
      subniveles: [],
      categorias: [],
      modalidades: [],
      cursos: [],
      sedes: [],
      turnos: [],
      horarios: [],
      sucursales: [],
      sedessucursales: []
    },
    cuenta: {
      metodos: [],
      formas: [],
      cuentas: [],
      bancos: [],
      abonos: [],
      cargos: [],
      descuentos: [],
      tipos: [],
      cursos: []
    },
    escolares: {
      tipos: [],
      escuelas: [],
      estados: [],
      municipios: [],
      universidades: [],
      centros: [],
      carreras: []
    },
    publicitarios: {
      contacto: [],
      medios: [],
      vias: [],
      motivos: [],
      bachillerato: [],
      campanias: [],
      empresas: []
    }
  }
  codigos: any;
  grupos: any;
  cupos: any;
  vista = 0;
  ventana = '';
  cargando = false;
  user: any;
  constructor(
    private generales: GeneralesService,
    private rutaActiva: ActivatedRoute, 
    private servicio: AlumnosService,
    private pdf: PdfService,
    private router: Router
  ){}

  ngOnInit(){
    this.dato.id = this.rutaActiva.snapshot.params['alumno'];
    this.user = localStorage.getItem('identificador');
    this.mostrar();

  }

  validar(){
    return (this.user?.toString() === '15' || this.user?.toString() === '13' || this.user?.toString() === '3');
  }

  mostrar(){
    this.servicio.traer({id: this.dato.id}).subscribe((respuesta: any) => {
      this.listas = respuesta.listas;
      this.cupos = respuesta.cupos;
      this.grupos = respuesta.grupos;
      this.codigos = respuesta.codigos;
    });
  }

  modal(ventana: any){
    this.ventana = '';
    this.generales.delay(500).then(fun => {
      this.ventana = ventana;
      setTimeout(() => {
        this.generales.abrirModal();
      }, 50);
    })
  }

  inscripcion(dato: any){
    dato.idAlumno = this.dato.id;
    this.cargando = true;
    this.servicio.inscripcion(dato).subscribe((respuesta: any) => {
      this.cargando = false;
      this.generales.cerrarModal();
      this.generales.mensajeCorrecto('Inscripcion finalizada correctamente');
      this.imprimir(respuesta.abonos);
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }

  imprimir(abonos: any){
    abonos.forEach((abono: any) => {
      this.pdf.pdfRecibo(abono.id);
    });
  }

  alumno(){
    this.router.navigate(['admin/alumnoDatos', this.dato.id]);
  }
}
