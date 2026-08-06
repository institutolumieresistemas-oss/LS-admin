import { Component, Input } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';
import { EstadosCuentasService } from '../../../../servicios/estados-cuentas.service';
import { PdfService } from '../../../../servicios/pdf.service';

@Component({
  selector: 'app-estado-cuenta-principal',
  templateUrl: './estado-cuenta-principal.component.html',
  styleUrl: './estado-cuenta-principal.component.css'
})
export class EstadoCuentaPrincipalComponent {
  @Input() ficha: any;
  listas = {
    conceptoscargos: [],
    conceptosabonos: [],
    conceptosdescuentos: [],
    conceptosdevoluciones: [],
    conceptosextras: [],
    formas: [],
    metodos: [],
    bancos: [],
    cuentas: []
  }
  cargando = false;
  total = 0
  opcion = 0;
  cuenta = {
    cargos: new Array(),
    abonos: new Array(),
    descuentos: new Array(),
    devoluciones: new Array(),
    extras: new Array(),
    ficha: {
      id: 0,
      idCalendario: 0,
      idNivel: 0
    },
    costo: 0
  };
  constructor(public generales: GeneralesService,private servicio: EstadosCuentasService, private pdf:PdfService){

  }

  ngOnInit(){
    this.mostrar();
  }

  mostrar(){
    this.servicio.mostrar({id: this.ficha}).subscribe((respuesta: any) => {
      this.cargando = false;
      this.listas = respuesta.listas;
      this.cuenta = respuesta.datos;
      this.calcular();
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }

  nuevoCargo(dato: any){
    if(this.servicio.validarCargo(dato)){
      dato.id = this.ficha;
      dato.concepto = this.generales.busquedaIdentificador(this.listas.conceptoscargos, dato.idConcepto).nombre;
      this.cargando = true;
      this.servicio.agregarCargo(dato).subscribe((respuesta: any) => {
        this.cargando = false;
        this.generales.mensajeCorrecto('Cargo agregado correctamente');
        this.cuenta.cargos = this.generales.agregarDatoArray(this.cuenta.cargos, respuesta);
        this.calcular();
      },
      error => {
        this.cargando = false;
        this.generales.interpretarError(error);
      });
    }
  }

  quitarCargo(dato: any){
    this.cargando = true;
    this.servicio.quitarCargo(dato).subscribe((respuesta: any) => {
      this.cargando = false;
      this.generales.mensajeCorrecto('Cargo eliminado correctamente');
      this.cuenta.cargos = this.generales.eliminarDatoArray(this.cuenta.cargos, respuesta);
      this.calcular();
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }

  nuevoAbono(dato: any){
    if(this.servicio.validarAbono(dato)){
      dato.id = this.ficha;
      dato.idCalendario = this.cuenta.ficha.idCalendario;
      dato.idNivel = this.cuenta.ficha.idNivel;
      dato.concepto = this.generales.busquedaIdentificador(this.listas.conceptosabonos, dato.idConcepto).nombre;
      dato.idConcepto = dato.idConcepto;
      
      let montoOriginal = parseFloat(dato.monto);
      let montoCalculado = montoOriginal;
      let cargosPendientes: Promise<any>[] = [];

      if(dato.iva){
        let montoIva = (montoOriginal * 16) / 100;
        montoCalculado += montoIva;

        // Registrar el cargo del IVA
        let cargoIva = {
          id: this.ficha,
          idConcepto: 0, // Concepto de IVA dinámico
          monto: montoIva.toFixed(2),
          concepto: 'IVA ' + dato.concepto
        };
        cargosPendientes.push(this.servicio.agregarCargo(cargoIva).toPromise());
      }

      if(dato.comision){
        let montoComision = (parseInt(dato.formaComision) === 1) ? 
          (parseFloat(dato.cantidadComision) * montoOriginal) / 100 :
          parseFloat(dato.cantidadComision);
        montoCalculado += montoComision;

        // Registrar el cargo de la comisión
        let cargoComision = {
          id: this.ficha,
          idConcepto: 0,
          monto: montoComision.toFixed(2),
          concepto: 'Comision por pago ' + dato.concepto
        };
        cargosPendientes.push(this.servicio.agregarCargo(cargoComision).toPromise());
      }

      dato.monto = montoCalculado.toFixed(2);
      this.cargando = true;

      // Esperar a que se den de alta los cargos de IVA/Comisión, luego dar de alta el abono
      Promise.all(cargosPendientes).then((respuestasCargos) => {
        // Añadir los cargos creados al array local para actualizar la vista
        respuestasCargos.forEach(cargoCreado => {
          if (cargoCreado) {
            this.cuenta.cargos = this.generales.agregarDatoArray(this.cuenta.cargos, cargoCreado);
          }
        });

        this.servicio.agregarAbono(dato).subscribe((respuesta: any) => {
          this.cargando = false;
          this.generales.mensajeCorrecto('Abono agregado correctamente');
          this.cuenta.abonos = this.generales.agregarDatoArray(this.cuenta.abonos, respuesta);
          this.calcular();
        },
        error => {
          this.cargando = false;
          this.generales.interpretarError(error);
        });
      }).catch(err => {
        this.cargando = false;
        this.generales.mensajeError('Error al crear los cargos asociados de IVA/Comisión');
      });
    }
  }

  quitarAbono(dato: any){
    this.cargando = true;
    this.servicio.quitarAbono(dato).subscribe((respuesta: any) => {
      this.cargando = false;
      this.generales.mensajeCorrecto('Abono eliminado correctamente');
      this.cuenta.abonos = this.generales.eliminarDatoArray(this.cuenta.abonos, respuesta);
      this.calcular();
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }

  nuevoDescuento(dato: any){
    dato.idCupon = 0;
    if(this.servicio.validarDescuento(dato)){
      dato.monto = this.calcularMontoDescuento(dato);
      if(this.servicio.validarDescuento(dato)){
        dato.id = this.ficha;
        dato.concepto = this.generales.busquedaIdentificador(this.listas.conceptosdescuentos, dato.idConcepto).nombre;
        this.cargando = true;
        this.servicio.agregarDescuento(dato).subscribe((respuesta: any) => {
          this.cargando = false;
          this.generales.mensajeCorrecto('Descuento agregado correctamente');
          this.cuenta.descuentos = this.generales.agregarDatoArray(this.cuenta.descuentos, respuesta);
          this.calcular();
        },
        error => {
          this.cargando = false;
          this.generales.interpretarError(error);
        });
      } 
    }
  }

  quitarDescuento(dato: any){
    this.cargando = true;
    this.servicio.quitarDescuento(dato).subscribe((respuesta: any) => {
      this.cargando = false;
      this.generales.mensajeCorrecto('Descuento eliminado correctamente');
      this.cuenta.descuentos = this.generales.eliminarDatoArray(this.cuenta.descuentos, respuesta);
      this.calcular();
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }

  nuevoDevolucion(dato: any){
    if(this.servicio.validarDevolucion(dato)){
      this.cargando = true;
      dato.id = this.ficha;
      dato.concepto = this.generales.busquedaIdentificador(this.listas.conceptosdevoluciones, dato.idConcepto).nombre;
      dato.idCalendario = this.cuenta.ficha.idCalendario;
      dato.idNivel = this.cuenta.ficha.idNivel;
    }
    this.servicio.agregarDevolucion(dato).subscribe((respuesta: any) => {
      this.cargando = false;
      this.generales.mensajeCorrecto('Devolucion agregada correctamente');
      this.cuenta.devoluciones = this.generales.agregarDatoArray(this.cuenta.devoluciones, respuesta);
      this.calcular();
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }

  quitarDevolucion(dato: any){
    this.cargando = true;
    this.servicio.quitarDevolucion(dato).subscribe((respuesta: any) => {
      this.cargando = false;
      this.generales.mensajeCorrecto('Devolucion eliminada correctamente');
      this.cuenta.devoluciones = this.generales.eliminarDatoArray(this.cuenta.devoluciones, respuesta);
      this.calcular();
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }

  nuevoExtra(dato: any){
    if(this.servicio.validarExtra(dato)){
      dato.id = this.ficha;
      dato.concepto = this.generales.nombre(this.listas.conceptosextras, dato.idConcepto);
      this.servicio.agregarExtra(dato).subscribe((respuesta: any) => {
        this.cargando = false;
        this.generales.mensajeCorrecto('Extra agregado correctamente');
        this.cuenta.extras = this.generales.agregarDatoArray(this.cuenta.extras, respuesta);
        this.calcular();
      },
      error => {
        this.cargando = false;
        this.generales.interpretarError(error);
      });
    }
  }

  quitarExtra(dato: any){
    this.cargando = true;
    this.servicio.quitarExtra(dato).subscribe((respuesta: any) => {
      this.cargando = false;
      this.generales.mensajeCorrecto('Extra eliminado correctamente');
      this.cuenta.extras = this.generales.eliminarDatoArray(this.cuenta.extras, respuesta);
      this.calcular();
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }

  calcularMontoDescuento(dato: any){
    if(dato.idTipo.toString() === '1'){
      return dato.cantidad;
    }else{
      this.calcular();
      return (dato.idMonto.toString() === '1') ? parseFloat(this.total.toString()) * parseFloat(dato.cantidad) / 100 : parseFloat(this.cuenta.costo.toString()) * parseFloat(dato.cantidad) / 100;
    }
  }

  calcular(){
    this.total = 0;
    console.log(this.cuenta);
    this.cuenta.cargos.forEach((cargo) => {
      this.total = this.total + parseFloat(cargo.monto);
    });
    this.cuenta.abonos.forEach((abono) => {
      this.total = this.total - parseFloat(abono.monto);
    });
    this.cuenta.descuentos.forEach((descuento) => {
      this.total = this.total - parseFloat(descuento.monto);
    });
    this.cuenta.devoluciones.forEach((devolucion) => {
      this.total = this.total - parseFloat(devolucion.monto);
    });
    this.cuenta.extras.forEach((extra) => {
      this.total = this.total + parseFloat(extra.monto);
    });
  }

  imprimir(recibo: any){
    this.pdf.pdfRecibo(recibo);
  }
}
