import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { GeneralesService } from './generales.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InscripcionesService {
  constructor(private http: HttpClient, private generales: GeneralesService) { }
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type' : 'application/json',
    Authorization : 'bearer ' + localStorage.getItem('token')
  });
  uri = environment.url+'inscripciones/';
  
  mostrar(body: any) {
    const url = this.uri + 'mostrar';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }
  
  nuevo(body: any) {
    const url = this.uri + 'nuevo';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }
  
  modificar(body: any) {
    const url = this.uri + 'modificar';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }
  
  eliminar(body: any){
    const url = this.uri + 'eliminar';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }
  
  activar(body: any){
    const url = this.uri + 'activar';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }
  
  desactivar(body: any){
    const url = this.uri + 'desactivar';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  cupo(body: any){
    const url = this.uri + 'cupo';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }
  
  validarAlumno(dato: any){
    if(this.generales.validarString(dato.nombre)){
      this.generales.mensajeError('No se ha ingresado el nombre');
      return false;
    }
    if(this.generales.validarString(dato.apellidoPaterno)){
      this.generales.mensajeError('No se ha ingresado el apellido paterno');
      return false;
    }
    if(this.generales.validarString(dato.apellidoMaterno)){
      this.generales.mensajeError('No se ha ingresado el apellido materno');
      return false;
    }
    if(this.generales.validarString(dato.celular)){
      this.generales.mensajeError('No se ha ingresado el celular');
      return false;
    }
    if(this.generales.validarEntero(dato.idSexo)){
      this.generales.mensajeError('No se ha seleccionado el sexo');
      return false;
    }
    if(this.generales.validarString(dato.fechaNacimiento)){
      this.generales.mensajeError('No se ha ingresado la fecha de nacimiento');
      return false;
    }
    if(this.generales.edad(dato.fechaNacimiento) < 12){
      this.generales.mensajeError('No se puede registrar a un alumno con menos de 12 años');
      return false;
    }

    if(this.generales.edad(dato.fechaNacimiento) > 100){
      this.generales.mensajeError('No se puede registrar a un alumno con mas de 100 años');
      return false;
    }
    return true;
  }

  validarInscripcion(dato: any){
    if(this.generales.validarEntero(dato.idCalendario)){
      this.generales.mensajeError('No se ha seleccionado un calendario');
      return false;
    }
    if(this.generales.validarEntero(dato.idNivel)){
      this.generales.mensajeError('No se ha seleccionado un nivel');
      return false;
    }
    if(this.generales.validarEntero(dato.idSubnivel)){
      this.generales.mensajeError('No se ha seleccionado un subnivel');
      return false;
    }
    if(this.generales.validarEntero(dato.idCategoria)){
      this.generales.mensajeError('No se ha seleccionado una categoria');
      return false;
    }
    if(this.generales.validarEntero(dato.idModalidad)){
      this.generales.mensajeError('No se ha seleccionado una modalidad');
      return false;
    }
    if(this.generales.validarEntero(dato.idCurso)){
      this.generales.mensajeError('No se ha seleccionado un curso');
      return false;
    }
    if(this.generales.validarEntero(dato.idSede)){
      this.generales.mensajeError('No se ha seleccionado una sede');
      return false;
    }
    if(this.generales.validarEntero(dato.idTurno)){
      this.generales.mensajeError('No se ha seleccionado un turno');
      return false;
    }
    if(this.generales.validarEntero(dato.idHorario)){
      this.generales.mensajeError('No se ha seleccionado un horario');
      return false;
    }
    if(this.generales.validarEntero(dato.idSucursalImparticion)){
      this.generales.mensajeError('No se ha seleccionado una sucursal de imparticion');
      return false;
    }
    return true;
  }

  validarDomicilio(dato: any){
    if(this.generales.validarString(dato.calle)){
      this.generales.mensajeError('No se ha ingresado la calle');
      return false;
    }
    if(this.generales.validarString(dato.numeroExterior)){
      this.generales.mensajeError('No se ha ingresado el numero exterior');
      return false;
    }
    if(this.generales.validarString(dato.codigoPostal)){
      this.generales.mensajeError('No se ha ingresado el codigo postal');
      return false;
    }
    if(this.generales.validarEntero(dato.idEstado)){
      this.generales.mensajeError('No se ha seleccionado el estado');
      return false;
    }
    if(this.generales.validarEntero(dato.idMunicipio)){
      this.generales.mensajeError('No se ha seleccionado el municipio');
      return false;
    }
    return true;
  }

  validarTutor(dato: any){
    if(this.generales.validarString(dato.nombre)){
      this.generales.mensajeError('No se ha ingresado el nombre del tutor');
      return false;
    }
    if(this.generales.validarString(dato.celular)){
      this.generales.mensajeError('No se ha ingresado el celular del tutor');
      return false;
    }
    return true;
  }

  validarEscolares(dato: any){
    if(this.generales.validarEntero(dato.idTipoEscuela)){
      this.generales.mensajeError('No se ha seleccionado un tipo de escuela');
      return false;
    }
    if(this.generales.validarEntero(dato.idEscuela)){
      this.generales.mensajeError('No se ha seleccionado una escuela');
      return false;
    }
    if(this.generales.validarEntero(dato.idEstado)){
      this.generales.mensajeError('No se ha seleccionado un estado');
      return false;
    }
    if(this.generales.validarEntero(dato.idMunicipio)){
      this.generales.mensajeError('No se ha seleccionado un municipio');
      return false;
    }
    if(this.generales.validarString(dato.promedio)){
      this.generales.mensajeError('No se ha ingresado el promedio');
      return false;
    }
    if(this.generales.validarString(dato.intentos)){
      this.generales.mensajeError('No se ha ingresado el numero de intentos');
      return false;
    }
    if(this.generales.validarEntero(dato.idUniversidad)){
      this.generales.mensajeError('No se ha seleccionado una universidad');
      return false;
    }
    if(this.generales.validarEntero(dato.idCentroUniversitario)){
      this.generales.mensajeError('No se ha seleccionado un centro universitario');
      return false;
    }
    if(this.generales.validarEntero(dato.idCarrera)){
      this.generales.mensajeError('No se ha seleccionado una carrera');
      return false;
    }
    return true;
  }

  validarAspiracion(dato: any){
    if(this.generales.validarEntero(dato.idUniversidad)){
      this.generales.mensajeError('No se ha seleccionado una universidad');
      return false;
    }
    if(this.generales.validarEntero(dato.idCentroUniversitario)){
      this.generales.mensajeError('No se ha seleccionado un centro universitario');
      return false;
    }
    if(this.generales.validarEntero(dato.idCarrera)){
      this.generales.mensajeError('No se ha seleccionado una carrera');
      return false;
    }
    if(this.generales.validarString(dato.intentos)){
      this.generales.mensajeError('No se ha ingresado el numero de intentos');
      return false;
    }
    return true;
  }

  validarPublicitarios(dato: any){
    if(this.generales.validarEntero(dato.idMedioContacto)){
      this.generales.mensajeError('No se ha seleccionado un medio de contacto');
      return false;
    }
    if(this.generales.validarEntero(dato.idMedioPublicitario)){
      this.generales.mensajeError('No se ha seleccionado un medio publicitario');
      return false;
    }
    if(this.generales.validarEntero(dato.idViaPublicitaria)){
      this.generales.mensajeError('No se ha seleccionado una via publicitaria');
      return false;
    }
    if(dato.idNivel.toString() !== '2' && this.generales.validarEntero(dato.idMotivoInscripcion)){
      this.generales.mensajeError('No se ha seleccionado un motivo de inscripcion');
      return false;
    }
    if(dato.idNivel.toString() === '2' && this.generales.validarEntero(dato.idMotivoBachillerato)){
      this.generales.mensajeError('No se ha seleccionado un motivo de termino de bachillerato');
      return false;
    }
    if(this.generales.validarEntero(dato.idCampania)){
      this.generales.mensajeError('No se ha seleccionado una campaña');
      return false;
    }
    if(dato.curso && this.generales.validarEntero(dato.idEmpresa)){
      this.generales.mensajeError('No se ha seleccionado una empresa de cursos');
      return false;
    }
    return true;
  }

  validarCargo(dato: any){
    if(this.generales.validarEntero(dato.idConcepto)){
      this.generales.mensajeError('No se ha seleccionado un concepto');
      return false;
    }
    if(this.generales.validarString(dato.monto)){
      this.generales.mensajeError('No se ha seleccionado un monto');
      return false;
    }
    return true;
  }

  validarDescuento(dato: any){
    if(this.generales.validarEntero(dato.idConcepto)){
      this.generales.mensajeError('No se ha seleccionado un concepto');
      return false;
    }
    if(this.generales.validarString(dato.cantidad)){
      this.generales.mensajeError('No se ha seleccionado una cantidad');
      return false;
    }
    if(this.generales.validarEntero(dato.idTipo)){
      this.generales.mensajeError('No se ha seleccionado un tipo de descuento');
      return false;
    }
    if(dato.idTipo.toString() === '2' && this.generales.validarEntero(dato.idMonto)){
      this.generales.mensajeError('No se ha seleccionado un concepto');
      return false;
    }
    return true;
  }

  validarAbono(dato: any){
    if(this.generales.validarEntero(dato.idConcepto)){
      this.generales.mensajeError('No se ha seleccionado un concepto');
      return false;
    }
    if(this.generales.validarEntero(dato.idMetodoPago)){
      this.generales.mensajeError('No se ha seleccionado un metodo de pago');
      return false;
    }
    if(this.generales.validarEntero(dato.idFormaPago)){
      this.generales.mensajeError('No se ha seleccionado una forma de pago');
      return false;
    }
    if(this.generales.validarString(dato.monto)){
      this.generales.mensajeError('No se ha ingresado el monto');
      return false;
    }
    if(parseInt(dato.idFormaPago) > 1){
      if(this.generales.validarString(dato.imagen)){
        this.generales.mensajeError('No se ha seleccionado una imagen');
        return false;
      }
      if(this.generales.validarString(dato.nombre)){
        this.generales.mensajeError('No se ha ingresado el nombre del propiertario');
        return false;
      }
      if(this.generales.validarString(dato.referencia)){
        this.generales.mensajeError('No se ha ingresado el numero de referencia');
        return false;
      }
      if(this.generales.validarEntero(dato.idBanco)){
        this.generales.mensajeError('No se ha seleccionado un banco');
        return false;
      }
      if(this.generales.validarEntero(dato.idCuenta)){
        this.generales.mensajeError('No se ha seleccionado una cuenta');
        return false;
      }
      if(this.generales.validarString(dato.fecha)){
        this.generales.mensajeError('No se ha ingresado la fecha');
        return false;
      }
      if(dato.comision){
        if(this.generales.validarString(dato.cantidadComision)){
          this.generales.mensajeError('No se ha ingresado la comision');
          return false;
        }
        if(this.generales.validarEntero(dato.formaComision)){
          this.generales.mensajeError('No se ha seleccionado el tipo de comision');
          return false;
        }
      }
    }
    return true;
  }
}
