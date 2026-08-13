import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';
import { UsuariosService } from '../../../../servicios/usuarios.service';
import { TiposUsuariosService } from '../../../../servicios/tipos-usuarios.service';

@Component({
  selector: 'app-modal-usuario-empleado',
  templateUrl: './modal-usuario-empleado.component.html',
  styleUrl: './modal-usuario-empleado.component.css'
})
export class ModalUsuarioEmpleadoComponent implements OnInit {
  @Input() empleado: any;
  @Output() emitidor = new EventEmitter<any>();

  usuarioExistente: any = null;
  esNuevoUsuario: boolean = true;
  cargando: boolean = false;

  username: string = '';
  password: string = '';
  idTipoUsuario: any = null;

  tiposUsuarios: any[] = [];
  disponible: boolean = true;
  mensajeValidacion: string = '';
  sugerenciaOriginal: string = '';

  constructor(
    private generales: GeneralesService,
    private usuariosService: UsuariosService,
    private tiposUsuariosService: TiposUsuariosService
  ) {}

  ngOnInit(): void {
    if (this.empleado && this.empleado.id) {
      this.cargarTiposUsuarios();
      this.cargarUsuarioEmpleado();
    }
  }

  cargarTiposUsuarios() {
    this.tiposUsuariosService.mostrar().subscribe(
      (res: any) => {
        this.tiposUsuarios = Array.isArray(res) ? res : [];
      },
      err => {
        console.error(err);
      }
    );
  }

  cargarUsuarioEmpleado() {
    this.cargando = true;
    this.usuariosService.traer({ id: this.empleado.id }).subscribe(
      (res: any) => {
        this.cargando = false;
        if (res && res.id) {
          this.usuarioExistente = res;
          this.esNuevoUsuario = false;
          this.username = res.usuario;
          this.idTipoUsuario = res.idTipoUsuario;
          this.password = '';
          this.disponible = true;
          this.mensajeValidacion = '🔒 El nombre de usuario asignado es único e inmodificable.';
        } else {
          this.usuarioExistente = null;
          this.esNuevoUsuario = true;
          this.obtenerSugerencia();
        }
      },
      err => {
        this.cargando = false;
        this.usuarioExistente = null;
        this.esNuevoUsuario = true;
        this.obtenerSugerencia();
      }
    );
  }

  obtenerSugerencia() {
    this.usuariosService.sugerirUsuario({ idEmpleado: this.empleado.id }).subscribe(
      (res: any) => {
        if (res && res.sugerencia) {
          this.username = res.sugerencia;
          this.sugerenciaOriginal = res.sugerencia;
          this.verificarUnicidad();
        }
      },
      err => {
        console.error(err);
      }
    );
  }

  verificarUnicidad() {
    if (!this.esNuevoUsuario) return;
    if (!this.username || this.username.trim() === '') {
      this.disponible = false;
      this.mensajeValidacion = '⚠️ Debes escribir un nombre de usuario.';
      return;
    }

    this.usuariosService.verificarDisponibilidad({
      usuario: this.username,
      idEmpleado: this.empleado.id
    }).subscribe(
      (res: any) => {
        this.disponible = res.disponible;
        this.mensajeValidacion = res.mensaje;
      },
      err => {
        console.error(err);
      }
    );
  }

  guardar() {
    if (this.esNuevoUsuario) {
      if (!this.username || this.username.trim() === '') {
        this.generales.mensajeError('Ingresa un nombre de usuario.');
        return;
      }
      if (!this.disponible) {
        this.generales.mensajeError('El nombre de usuario ya está ocupado. Elige uno diferente.');
        return;
      }
      if (!this.password || this.password.trim() === '') {
        this.generales.mensajeError('Ingresa una contraseña para el usuario.');
        return;
      }
      if (!this.idTipoUsuario) {
        this.generales.mensajeError('Selecciona el tipo de usuario / rol.');
        return;
      }

      this.cargando = true;
      const payload = {
        idEmpleado: this.empleado.id,
        usuario: this.username,
        password: this.password,
        idTipoUsuario: this.idTipoUsuario
      };

      this.usuariosService.nuevo(payload).subscribe(
        (res: any) => {
          this.cargando = false;
          this.generales.mensajeCorrecto('Usuario asignado exitosamente al empleado.');
          this.generales.cerrarModal();
          this.emitidor.emit(res);
        },
        err => {
          this.cargando = false;
          this.generales.interpretarError(err);
        }
      );
    } else {
      // Modificar usuario existente
      if (!this.idTipoUsuario) {
        this.generales.mensajeError('Selecciona el tipo de usuario / rol.');
        return;
      }

      this.cargando = true;
      const payload = {
        id: this.usuarioExistente.id,
        idEmpleado: this.empleado.id,
        usuario: this.username,
        password: this.password ? this.password : '0',
        idTipoUsuario: this.idTipoUsuario
      };

      this.usuariosService.modificar(payload).subscribe(
        (res: any) => {
          this.cargando = false;
          this.generales.mensajeCorrecto('Datos de usuario actualizados correctamente.');
          this.generales.cerrarModal();
          this.emitidor.emit(res);
        },
        err => {
          this.cargando = false;
          this.generales.interpretarError(err);
        }
      );
    }
  }

  cerrar() {
    this.generales.cerrarModal();
  }
}
