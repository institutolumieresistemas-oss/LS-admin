import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';
import { InscripcionesService } from '../../../../servicios/inscripciones.service';
import { CuponesService } from '../../../../servicios/cupones.service';

@Component({
  selector: 'app-cuenta-datos',
  templateUrl: './cuenta-datos.component.html',
  styleUrl: './cuenta-datos.component.css'
})
export class CuentaDatosComponent {
  @Input() cuenta = {
    cargos: new Array(),
    abonos: new Array(),
    descuentos: new Array()
  }
  @Input() listas = {
    metodos: [],
    formas: [],
    cuentas: [],
    bancos: [],
    abonos: [],
    cargos: [],
    descuentos: [],
    tipos: [],
    cursos: []
  }
  @Input() costoCurso: any;
  @Input() idCurso: any;
  @Output() siguiente = new EventEmitter<any>();
  @Output() anterior = new EventEmitter<any>();
  total = 0;
  agregar = 0
  cupon: any;
  
  constructor(public generales: GeneralesService, private servicio: InscripcionesService, private cupones: CuponesService){}
  
  ngOnInit(){
    let cargo = {
      idConcepto: 18,
      concepto: 'Inscripcion a curso ' + this.generales.nombre(this.listas.cursos, this.idCurso),
      monto: this.costoCurso
    }
    this.agregarCargo(cargo);
  }

  agregarCargo(dato: any): any{
    dato.id = this.cuenta.cargos.length + 1;
    if(!this.servicio.validarCargo(dato)){
      return 0;
    }
    this.cuenta.cargos.push(dato);
    this.recargar(1);
    this.calcular();
  }

  quitarCargo(dato: any){
    this.cuenta.cargos = this.generales.eliminarDatoArray(this.cuenta.cargos, dato);
    this.calcular();
  }

  agregarDescuento(dato: any): any{
    dato.id = this.cuenta.descuentos.length + 1;
    dato.idCupon = 0;
    if(!this.servicio.validarDescuento(dato)){
      return 0;
    }
    if(dato.idTipo.toString() === '1'){
      dato.monto = dato.cantidad;
    }else{
      this.calcular();
      dato.monto = (dato.idMonto.toString() === '1') ? parseFloat(this.total.toString()) * parseFloat(dato.cantidad) / 100 : parseFloat(this.costoCurso.toString()) * parseFloat(dato.cantidad) / 100;
    }
    this.cuenta.descuentos.push(dato);
    this.recargar(2);
    this.calcular();
  }

  quitarDescuento(dato: any){
    this.cuenta.descuentos = this.generales.eliminarDatoArray(this.cuenta.descuentos, dato);
    this.calcular();
  }

  agregarAbono(dato: any): any{
    dato.total = dato.monto;
    dato.id = this.cuenta.abonos.length + 1;
    dato.idConcepto = dato.idConcepto;
    if(!this.servicio.validarAbono(dato)){
      return 0;
    }
    if(dato.iva){
      dato.monto = (this.agregarIVA(dato) + parseFloat(dato.monto));
    }
    if(dato.comision){
      dato.monto = (this.agregarComision(dato) + parseFloat(dato.monto));
    }
    this.cuenta.abonos.push(dato);
    this.recargar(3);
    this.calcular();
  }

  agregarIVA(dato: any){
    let iva = {
      idConcepto: 0,
      monto: (parseFloat(dato.total) * 16) / 100,
      concepto: 'IVA ' + this.generales.nombre(this.listas.abonos, dato.idConcepto),
      id: this.cuenta.cargos.length + 1
    }
    this.cuenta.cargos.push(iva)
    return iva.monto;
  }

  agregarComision(dato: any){
    let comision = {
      idConcepto: 0,
      concepto: 'Comision por pago ' + this.generales.nombre(this.listas.abonos, dato.idConcepto),
      monto: (parseInt(dato.formaComision) === 1) ? 
      (parseFloat(dato.cantidadComision) * parseFloat(dato.total)) /100 :
      parseFloat(dato.cantidadComision),
      id: this.cuenta.cargos.length + 1
    }

    this.cuenta.cargos.push(comision);
    return comision.monto
  }

  quitarAbono(dato: any){
    this.cuenta.abonos = this.generales.eliminarDatoArray(this.cuenta.abonos, dato);
    this.calcular();
  }

  calcular(){
    this.total = 0;
    this.cuenta.cargos.forEach((cargo) => {
      this.total = this.total + parseFloat(cargo.monto);
    });
    this.cuenta.abonos.forEach((abono) => {
      this.total = this.total - parseFloat(abono.monto);
    });
    this.cuenta.descuentos.forEach((descuento) => {
      this.total = this.total - parseFloat(descuento.monto);
    });
  }

  recargar(id: any){
    this.agregar = 0;
    this.generales.delay(500).then(fun => {
      this.agregar = id
    });
  }

  emitirAnterior(){
    this.anterior.emit(this.cuenta);
  }

  emitirSiguiente(){
    this.siguiente.emit(this.cuenta);
  }

  canjear(){
    const body = {
      cupon: this.cupon
    }

    this.cupones.canjear(body).subscribe((respuesta: any) => {
      let dato = {
        idConcepto: 6,
        cantidad: '1',
        idTipo: 1,
        monto: respuesta.monto,
        idCupon: respuesta.id,
        id: this.cuenta.descuentos.length + 1
      }

      if(!this.servicio.validarDescuento(dato)){
        return ;
      }
      this.cuenta.descuentos.push(dato);
      this.recargar(2);
      this.calcular();
    }, (error: any) => {
      this.generales.interpretarError(error);
    });

    
  }
}
