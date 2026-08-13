import { Component } from '@angular/core';
import { datatableConfig } from '../../interfaces/tables.interface';
import { GeneralesService } from '../../servicios/generales.service';
import { UsuariosService } from '../../servicios/usuarios.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
  nombre: any;
  imagen: any;
  usuario: any;
  cargando: any;
  vista: any;
  password: any;
  constructor(private generales: GeneralesService,
              private servicio: UsuariosService
  ){}

  ngOnInit(){
    this.nombre = localStorage.getItem('nombre')?.toString();
    this.imagen = localStorage.getItem('foto')?.toString();
    this.usuario = localStorage.getItem('usuario')?.toString();
  }
  

  actualizar(){
    const body = {
      password: this.password,
      id: localStorage.getItem('identificador')
    }
    this.servicio.modificarPassword(body).subscribe((respuesta: any) => {
      this.cargando = false;
      this.generales.mensajeCorrecto('Password actualizada correctamente');
    },
    (error: any) => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }
}
