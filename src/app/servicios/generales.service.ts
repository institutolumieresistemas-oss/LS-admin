import { Injectable, signal, ɵɵpureFunctionV } from '@angular/core';
import { Router } from '@angular/router';
import swal from'sweetalert2';
declare function activarTab(tab: string): any;
declare function modal(accion: string): any;
declare function year(fechaNacimiento: any): any;


@Injectable({
  providedIn: 'root'
})
export class GeneralesService {
  produccion = 2;
  logo = './assets/img/logo.png';
  imagen = "./assets/img/default.png";
  logos = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUgAAABfCAMAAAC9bq6WAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxRDNEMzRBOTlBM0YxMUU3QkI3NkRFRTBCREI3NUY4NyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoxRDNEMzRBQTlBM0YxMUU3QkI3NkRFRTBCREI3NUY4NyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjFEM0QzNEE3OUEzRjExRTdCQjc2REVFMEJEQjc1Rjg3IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjFEM0QzNEE4OUEzRjExRTdCQjc2REVFMEJEQjc1Rjg3Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+0O4+IAAAABhQTFRF9vj5AgIC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';
  face = 'data:image/png;base64,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';
  instagram = 'data:image/png;base64,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';
  whatsapp = 'data:image/png;base64,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';
  tijeras = '- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -';
  meses = [
    { id: 1, nombre: 'Enero' },
    { id: 2, nombre: 'Febrero' },
    { id: 3, nombre: 'Marzo' },
    { id: 4, nombre: 'Abril' },
    { id: 5, nombre: 'Mayo' },
    { id: 6, nombre: 'Junio' },
    { id: 7, nombre: 'Julio' },
    { id: 8, nombre: 'Agosto' },
    { id: 9, nombre: 'Septiembre' },
    { id: 10, nombre: 'Octubre' },
    { id: 11, nombre: 'Noviembre' },
    { id: 12, nombre: 'Diciembre' },
  ];

  private _cargando = signal<boolean>(false);
  cargando = this._cargando.asReadonly();

  
  
  constructor(private router: Router) { }

  mostrarCargando() {
    this._cargando.set(true);
  }

  ocultarCargando() {
    this._cargando.set(false);
  }

  existentesLista(totales: any,agregados: any) {
    const idsAgregados = new Set(agregados.map((c: any) => c.idCurso));
  
    return totales.map((curso: any) => ({
      ...curso,
      existe: idsAgregados.has(curso.id)
    }));
  }

  filtrarExistentes(lista: any){
    return lista.filter((item: any) => item.existe === true);
  }

  seleccionarTab(tab: string) {
    this.delay(100).then(fun => {
      activarTab(tab);
    });
  }

  combianrArrays(array1: any, array2: any){
    let final: Array<any> = new Array<any>();
    for (let index = 0; index < array1.length; index++) {
      let objeto1 = array1[index];
      let objeto2 = array2[index];
      let resultado: any = {};
      for (const clave of Object.keys(objeto1)) {
          resultado[clave] = objeto1[clave];
      }
      for (const clave of Object.keys(objeto2)) {
          resultado[clave] = objeto2[clave];
      }
      final.push(resultado);
    }
    return final;
  }

  async delay(ms: number){
    await new Promise<void>((resolve) =>{
      setTimeout(() => resolve(), ms)
    }).then(() => {});
  }

  mensajeCorrecto(mensaje: string) {
    swal.fire(mensaje, 'Correcto', 'success');
  }

  mensajeError(mensaje: string) {
    const toast = swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', swal.stopTimer)
        toast.addEventListener('mouseleave', swal.resumeTimer)
      },
      
    })
    toast.fire(mensaje, '', 'error');
  }

  getSesionToken() {
    return localStorage.getItem('token');
  }

  cerrarSesion() {
    localStorage.clear();
  }

  interpretarError(error: any) {
    
    if(error.status === 500){
      const mensaje = {
        archivo: error.error.file,
        linea: error.error.line,
        mensaje: error.error.message,
        usuario: localStorage.getItem('nombre'),
        url: error.url
      };
      this.mensajeError('Error en el servidor');
    }
    else if(error.status === 400){
      this.mensajeError(error.error);
    }else if(error.status === 401) {
      
      this.mensajeError('Su sesión ha caducado');
      this.cerrarSesion();
      window.location.reload();
    }else if(error.status === 200){
      this.mensajeCorrecto('La respuesta no es un error pero asi es interpretada');
    }
    else {
      
      this.mensajeError('Error con codigo -' + error.status);
    }
  }

  abrirModal() {
    modal('show');
  }

  cerrarModal() {
    modal('hide');
  }

  validarString(cadena: string) {
    if (cadena === null || cadena === '' || cadena === undefined) {
      return true;
    }
    return false;
  }

  validarEntero(entero: any) {
    if (
      entero === 0 ||
      entero === '0' ||
      entero === '' ||
      entero === null
    ) {
      return true;
    }
    return false;
  }
  
  milesNumeros(numero: string) {
    numero = (parseFloat(numero) >= 0) ? parseFloat(numero).toFixed(2) : (parseFloat(numero) * -1).toFixed(2);
    return numero.toString().replace(/(\.\d+)|\B(?=(\d{3})+(?!\d))/g, function(m,g1){
        return g1 || ","
    });
  }

  esNumero(numero: string) {
    let es = parseFloat(numero);
    return !isNaN(es);
  }

  hoy() {
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear()+"-"+(month)+"-"+(day) ;

    return today;
  }

  eliminarDatoArray(arreglo: any, dato: any){
    let final: Array<any> = new Array<any>();
    if(arreglo !== undefined && arreglo !== null){
      arreglo.forEach((elemento: any) => {
        if (elemento === dato) {
          return;
        }
        if (elemento && dato && elemento.id !== undefined && dato.id !== undefined && elemento.id !== null && dato.id !== null) {
          if (elemento.id.toString() === dato.id.toString()) {
            return;
          }
        }
        final.push(elemento);
      });
    }
    return final;
  }

  actualizarDatoArray(arreglo: any, dato: any){
    let final: Array<any> = new Array<any>();
    if(arreglo !== undefined && arreglo !== null){
      arreglo.forEach((elemento: any) => {
        let esElMismo = (elemento === dato);
        if (!esElMismo && elemento && dato && elemento.id !== undefined && dato.id !== undefined && elemento.id !== null && dato.id !== null) {
          esElMismo = (elemento.id.toString() === dato.id.toString());
        }
        if (esElMismo) {
          dato.seleccionado = true;
          final.push(dato);
        } else {
          final.push(elemento);
        }
      });
    }
    return final;
  }
  
  agregarDatoArray(arreglo: any, dato: any){
    let final: Array<any> = new Array<any>();
    if(arreglo !== undefined){
      arreglo.forEach((elemento: any) => {
        final.push(elemento);
      });
    }
    final.push(dato);
    return final;
  }

  sublista(lista: any, identificador: any, key: any){
    let final: Array<any> = new Array<any>();
    if(this.validarEntero(identificador)){
      return final;
    }
    if(lista !== undefined){
      lista.forEach((elemento: any) => {
        if(elemento[key].toString() === identificador.toString()){
          final.push(elemento);
        }
      });
    }
    return final;
  }

  busquedaGeneral(lista: any, encabezados: any, busqueda: any){
    let final: Array<any> = new Array<any>();
    if(busqueda === ""){
      return lista;
    }
    lista.forEach((elemento: any) => {
      let coincide = false;
      encabezados.forEach((encabezado: any) => {
        if(elemento[encabezado].toString().includes(busqueda.toString())){
          coincide = true;
        }
      });
      if(coincide){
        final.push(elemento);
      }
    });
    return final;
  }

  busquedaIdentificador(lista: any, identificador: any){
    try {
      let seleccionado: any;
      lista.forEach((elemento: any) => {
        if(elemento.id.toString() === identificador.toString()){
          seleccionado = elemento;
        }
      });
      return seleccionado;
    } catch (error) {
      return null;
    }
  }

  restantes(lista: any, identificador: any){
    try {
      let seleccionado = new Array();
      lista.forEach((elemento: any) => {
        if(elemento.id.toString() !== identificador.toString()){
          seleccionado.push(elemento);
        }
      });
      return seleccionado;
    } catch (error) {
      return null;
    }
  }

  activos(lista: any){
    let final: Array<any> = new Array<any>();
    if(lista !== undefined){
      lista.forEach((elemento: any) => {
        if(elemento.activo){
          final.push(elemento);
        }
      });
    }
    return final;
  }

  faltantes(lista: any, listado: any, llave: any){
    let final: Array<any> = new Array<any>();
    listado.forEach((elemento: any) => {
      let coincide = true;
      lista.forEach((registro: any) => {
        if(elemento.id.toString() === registro[llave].toString()){
          coincide = false;
        }
      });
      if(coincide && !final.includes(elemento)){
        final.push(elemento);
      }
    });
    return final;
  }

  iguales(lista: any, listado: any, llave: any){
    let final: Array<any> = new Array<any>();
    listado.forEach((elemento: any) => {
      let coincide = false;
      lista.forEach((registro: any) => {
        if(elemento.id === registro[llave]){
          coincide = true;
        }
      });
      if(coincide && !final.includes(elemento)){
        final.push(elemento);
      }
    });
    return final;
  }

  sublistaMultiples(lista: any, busqueda: any){
    let final: Array<any> = new Array<any>();
    let keys = Object.keys(busqueda);
    lista.forEach((elemento: any) => {
      let coincide = true;
      keys.forEach((key: any) => {
        if(!this.validarEntero(busqueda[key])){
          if(elemento[key].toString() !== busqueda[key].toString()){
            coincide = false;
          }
        }
      });
      if(coincide){
        elemento.seleccionado = false;
        final.push(elemento);
      }
    });
    return final;
  }

  sublistaMultiplesExterna(lista: any, busqueda: any, listado: any, llave: any){
    let final: Array<any> = new Array<any>();
    let keys = Object.keys(busqueda);
    lista.forEach((elemento: any) => {
      let coincide = true;
      keys.forEach((key: any) => {
        if(elemento[key].toString() !== busqueda[key].toString()){
          coincide = false;
        }
      });
      if(coincide){
        listado.forEach((registro: any) => {
          if(registro.id.toString() === elemento[llave].toString() && !final.includes(registro)){
            final.push(registro);
          }
        });
      }
    });
    return final;
  }

  registroSeleccionado(lista: any, busqueda: any){
    let keys = Object.keys(busqueda);
    let seleccion: any;
    lista.forEach((elemento: any) => {
      let coincide = true;
      keys.forEach((key: any) => {
        if(elemento[key].toString() !== busqueda[key].toString()){
          coincide = false;
        }
      });
      if(coincide){
        seleccion = elemento;
      }
    });
    return seleccion;
  }

  calendariosActuales(lista: any){
    let now = new Date();
    let arreglo = new Array();
    lista.forEach((element: any) => {
      let fin = new Date(element.fin);
      if(fin > now){
        arreglo.push(element);
      }
    });
    return arreglo;
  }

  edad(fechaNacimiento: any){
    return year(fechaNacimiento);
  }

  nombre(lista: any, id: any){
    let nombre = '';
    lista.forEach((element: any) => {
      if(element.id.toString() === id.toString()){
        nombre = element.nombre;
      }
    });
    return nombre;
  }

  registros(lista: any, dato: any, llave: any){
    let final: Array<any> = new Array<any>();
    lista.forEach((registro: any) => {
      if(dato === registro[llave]){
        final.push(registro);
      }
    });
    return final;
  }

  getMesNombre(mes: any){
    switch(mes){
      case 1:
        return 'Enero';
      case 2:
        return 'Febrero';
      case 3:
          return 'Marzo';
      case 4:
        return 'Abril';
      case 5:
        return 'Mayo';
      case 6:
        return 'Junio';
      case 7:
        return 'Julio';
      case 8:
        return 'Agosto';
      case 9:
        return 'Septiembre';
      case 10:
        return 'Octubre';
      case 11:
        return 'Noviembre';
      case 12:
        return 'Diciembre';
        break;
      default:
        'No existe ese mes';
    }
    return 0;
  }
}