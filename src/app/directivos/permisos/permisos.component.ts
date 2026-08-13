import { Component } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';
import { PermisosService } from '../../servicios/permisos.service';
import { TiposUsuariosService } from '../../servicios/tipos-usuarios.service';

@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.component.html',
  styleUrl: './permisos.component.css'
})
export class PermisosComponent {
  cargando = false;
  seleccion: any;
  permisos: any;
  datos: any;
  idTipoUsuario: any;
  constructor(private generales: GeneralesService, private servicio: PermisosService, private tiposServicio: TiposUsuariosService){}
  
  ngOnInit(): void {
    this.mostrarTipos();
  }
  
  mostrarTipos(){
    this.cargando = true;
    this.tiposServicio.mostrar().subscribe((respuesta: any) => {
      this.cargando = false;
      this.datos = respuesta;
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }

  mostrar(){
    this.cargando = true;
    this.servicio.mostrar({id: this.idTipoUsuario}).subscribe((respuesta: any) => {
      this.cargando = false;
      this.permisos = respuesta;
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }

  activarModulo(id: any){
    const body = {
      idTipoUsuario: this.idTipoUsuario,
      idModulo: id
    }
    this.cargando = true;
    this.servicio.activarModulo(body).subscribe((respuesta: any) => {
      this.cargando = false;
      this.generales.mensajeCorrecto('Permiso activado correctamente');
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }

  desactivarModulo(id: any){
    const body = {
      idTipoUsuario: this.idTipoUsuario,
      idModulo: id
    }
    this.cargando = true;
    this.servicio.desactivarModulo(body).subscribe((respuesta: any) => {
      this.cargando = false;
      this.generales.mensajeCorrecto('Permiso desactivado correctamente');
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }

  activarOpcion(id: any){
    const body = {
      idTipoUsuario: this.idTipoUsuario,
      idOpcion: id
    }
    this.cargando = true;
    this.servicio.activarOpcion(body).subscribe((respuesta: any) => {
      this.cargando = false;
      this.generales.mensajeCorrecto('Permiso activado correctamente');
    },
    error => {
      
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }

  desactivarOpcion(id: any){
    const body = {
      idTipoUsuario: this.idTipoUsuario,
      idOpcion: id
    }
    this.cargando = true;
    this.servicio.desactivarOpcion(body).subscribe((respuesta: any) => {
      this.cargando = false;
      this.generales.mensajeCorrecto('Permiso desactivado correctamente');
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }
}
