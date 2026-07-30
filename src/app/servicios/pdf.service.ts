import { Injectable } from '@angular/core';
import { Cell, PdfMakeWrapper, QR, Table, Txt } from 'pdfmake-wrapper';
import pdfFonts from "pdfmake/build/vfs_fonts";

import { DatosPDFService } from './datos-pdf.service';
import { GeneralesService } from './generales.service';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  fonts = {
    Courier: {
      normal: 'Courier',
      bold: 'Courier-Bold',
      italics: 'Courier-Oblique',
      bolditalics: 'Courier-BoldOblique'
    },
    Helvetica: {
      normal: 'Helvetica',
      bold: 'Helvetica-Bold',
      italics: 'Helvetica-Oblique',
      bolditalics: 'Helvetica-BoldOblique'
    },
    Times: {
      normal: 'Times-Roman',
      bold: 'Times-Bold',
      italics: 'Times-Italic',
      bolditalics: 'Times-BoldItalic'
    },
    Symbol: {
      normal: 'Symbol'
    },
    ZapfDingbats: {
      normal: 'ZapfDingbats'
    }
  };
  constructor(private servicio: DatosPDFService, private generales: GeneralesService) {
    (window as any).pdfMake.vfs = pdfFonts.vfs;
  }


  async pdfFicha(ficha: string) {
    let logo = this.generales.logo;
    let face = this.generales.face;
    let instagram = this.generales.instagram;
    let whatsapp = this.generales.whatsapp;
    let cargos: Array<any> = new Array<any>();
    let abonos: Array<any> = new Array<any>();
    let descuentos: Array<any> = new Array<any>();
    let devoluciones: Array<any> = new Array<any>();
    let extras: Array<any> = new Array<any>();
    this.servicio.fichaInscripcion(ficha).subscribe((respuesta: any) => {
      const pdf = new PdfMakeWrapper();
      pdf.pageMargins([ 40, 40, 40, 40 ]);
      pdf.pageSize('A4');
      
      
      let encabezado = new Txt('FICHA DE INSCRIPCION:').fontSize(10).alignment('center').color('#2F75B5').end;
      let columnaNombreAlumno = new Table([
        [{image: logo, width: 64, height: 20}, encabezado]
      ]).layout('noBorders').widths(['20%', '80%']).end;
      pdf.add(columnaNombreAlumno);
      pdf.add(pdf.ln(1));

      let lemaFila = new Table([
      [
        new Cell(new Txt('!Donde forjamos triunfadores¡').fontSize(8).italics().color('#3075CF').end).end,
        new Cell(new Txt(respuesta.folio).fontSize(8).italics().color('red').end).alignment('right').end,
      ]]).widths(['48%', '48%']).layout('noBorders').end;
      pdf.add(lemaFila);

      let primeraFila = new Table([
      [
        new Cell(new Txt('FECHA').bold().fontSize(8).end).fillColor('#2F75B5').end,
        new Cell(new Txt(respuesta.fecha).bold().fontSize(8).end).end,
        new Cell(new Txt('ASESOR').bold().fontSize(8).end).fillColor('#2F75B5').end,
        new Cell(new Txt(respuesta.socio).bold().fontSize(8).end).end,
        new Cell(new Txt('PLANTEL').bold().fontSize(8).end).fillColor('#2F75B5').end,
        new Cell(new Txt(respuesta.plantel).bold().fontSize(8).end).end
      ]]).widths(['16%', '16%', '16%', '16%', '16%', '16%']).alignment('center').end;
      pdf.add(primeraFila);


      if(respuesta.congelado){
        let cupon = new Table([
          [
            new Cell(new Txt('').fontSize(8).italics().color('#3075CF').end).end,
            new Cell(new Txt('Cupon - ' + respuesta.cuponCongelado).fontSize(8).italics().color('red').end).alignment('right').end,
          ]
        ]).widths(['48%', '48%']).layout('noBorders').end;
        pdf.add(cupon);
        pdf.add(pdf.ln(1));
      }else{
        pdf.add(pdf.ln(2));
      }

      let segundaFila = new Table([
      [
        new Cell(new Txt('NIVEL').bold().fontSize(8).end).fillColor('#2F75B5').end,
        new Cell(new Txt(respuesta.nivel).bold().fontSize(8).end).end,
        new Cell(new Txt('MODALIDAD').bold().fontSize(8).end).fillColor('#2F75B5').end,
        new Cell(new Txt(respuesta.modalidad).bold().fontSize(8).end).end,
        new Cell(new Txt('CATEGORIA').bold().fontSize(8).end).fillColor('#2F75B5').end,
        new Cell(new Txt(respuesta.categoria).bold().fontSize(8).end).end
      ]]).widths(['16%', '16%', '16%', '16%', '16%', '16%']).alignment('center').end;
      pdf.add(segundaFila);

      let terceraFila = new Table([
      [
        new Cell(new Txt('CURSO').bold().fontSize(8).end).fillColor('#2F75B5').end,
        new Cell(new Txt(respuesta.curso).bold().fontSize(8).end).end,
        new Cell(new Txt('HORARIO').bold().fontSize(8).end).fillColor('#2F75B5').end,
        new Cell(new Txt(respuesta.horario).bold().fontSize(8).end).end,
        new Cell(new Txt('CICLO DE TRAMITE').bold().fontSize(8).end).fillColor('#2F75B5').end,
        new Cell(new Txt(respuesta.calendario).bold().fontSize(8).end).end
      ]]).widths(['16%', '16%', '16%', '16%', '16%', '16%']).alignment('center').end;
      pdf.add(terceraFila);

      let cuartaFila = new Table([
      [
        new Cell(new Txt('FECHA DE INICIO').bold().fontSize(8).end).fillColor('#2F75B5').end,
        new Cell(new Txt(respuesta.inicio).bold().fontSize(8).end).end,
        new Cell(new Txt('FECHA DE FIN').bold().fontSize(8).end).fillColor('#2F75B5').end,
        new Cell(new Txt(respuesta.fin).bold().fontSize(8).end).end,
        new Cell(new Txt('LIMITE DE PAGO').bold().fontSize(8).end).fillColor('#2F75B5').end,
        new Cell(new Txt(respuesta.limite).bold().fontSize(8).end).end
      ]]).widths(['16%', '16%', '16%', '16%', '16%', '16%']).alignment('center').end;
      pdf.add(cuartaFila);
      pdf.add(pdf.ln(1));

      let quintaFila = new Table([
      [
        new Cell(new Txt('NOMBRE').bold().fontSize(8).end).fillColor('#2F75B5').end,
        new Cell(new Txt(respuesta.alumno).bold().fontSize(8).end).end,
        new Cell(new Txt('CELULAR').bold().fontSize(8).end).fillColor('#2F75B5').end,
        new Cell(new Txt(respuesta.celular).bold().fontSize(8).end).end
      ]]).widths(['16%', '48%', '16%', '16%']).alignment('center').end;
      pdf.add(quintaFila);
      
      let sextaFila = new Table([
      [
        new Cell(new Txt('CENTRO UNIVERSITARIO').bold().fontSize(8).end).fillColor('#2F75B5').end,
        new Cell(new Txt(respuesta.centro).bold().fontSize(8).end).end,
        new Cell(new Txt('CARRERA').bold().fontSize(8).end).fillColor('#2F75B5').end,
        new Cell(new Txt(respuesta.carrera).bold().fontSize(8).end).end
      ]]).widths(['16%', '48%', '16%', '16%']).alignment('center').end;
      pdf.add(sextaFila);

      let septimaFila = new Table([
      [
        new Cell(new Txt('PUNTAJE MINIMO').bold().fontSize(8).end).fillColor('#2F75B5').end,
        new Cell(new Txt(respuesta.puntaje).bold().fontSize(8).end).end,
        new Cell(new Txt('PROMEDIO').bold().fontSize(8).end).fillColor('#2F75B5').end,
        new Cell(new Txt(respuesta.promedio).bold().fontSize(8).end).end,
        new Cell(new Txt('FALTANTE').bold().fontSize(8).end).fillColor('#2F75B5').end,
        new Cell(new Txt(respuesta.faltante).bold().fontSize(8).end).end
      ]]).widths(['16.5%', '15.5%', '15.5%', '15%', '16.5%', '17%']).alignment('center').end;
      pdf.add(septimaFila);

      let terminos = new Txt('Para dudas referentes a tu inscripción comunícate con tu asesor de curso').fontSize(8).italics().end;
      let columnaTerminos = new Table([
        [terminos]
      ]).layout('noBorders').widths(['100%']).alignment('center').end;
      pdf.add(columnaTerminos);
      pdf.add(pdf.ln(1));

      let ligaWhastapp = new Txt('\n¡Comunicate con tu asesor al numero '+respuesta.telefonoPlantel+'!').fontSize(8).italics().end;
      let columnaWhatsapp = new Table([
        [null, {image: whatsapp, width: 30, height: 30}, ligaWhastapp, null]
      ]).layout('noBorders').widths(['29%', '6%', '46%', '19%']).end;
      pdf.add(columnaWhatsapp);

      let ligaFace = new Txt('\nhttps://www.facebook.com/CursosLumiere/').fontSize(8).italics().end;
      let ligaInstagram = new Txt('\nhttps://www.instagram.com/cursoslumiere/?hl=es-la').fontSize(8).italics().end;
      let columnaRedes = new Table([
        [{image: face, width: 30, height: 30}, ligaFace, null, {image: instagram, width: 30, height: 30}, ligaInstagram]
      ]).layout('noBorders').widths(['6%', '36%', '8%', '6%', '36%']).end;
      pdf.add(columnaRedes);

      pdf.add(pdf.ln(1));

      let cut = new Txt(this.generales.tijeras).fontSize(8).italics().end;
      let columnaCUT = new Table([
        [cut]
      ]).layout('noBorders').end;
      pdf.add(columnaCUT);
      pdf.add(pdf.ln(1));

      let encabezado2 = new Txt('ESTADO DE CUENTA:').fontSize(10).alignment('center').color('#2F75B5').end;
      let columnaEncabezadoEstadoCuenta = new Table([
        [{image: logo, width: 64, height: 20}, encabezado2]
      ]).layout('noBorders').widths(['20%', '80%']).end;
      pdf.add(columnaEncabezadoEstadoCuenta);
      pdf.add(pdf.ln(1));

      let filaCargo = new Table([
        [
          new Cell(new Txt('Concepto').bold().fontSize(10).end).fillColor('#DDDDDD').end,
          new Cell(new Txt('Forma de Pago').bold().fontSize(10).end).fillColor('#DDDDDD').end,
          new Cell(new Txt('Metodo de pago').bold().fontSize(10).end).fillColor('#DDDDDD').end,
          new Cell(new Txt('Fecha').bold().fontSize(10).end).fillColor('#DDDDDD').end,
          new Cell(new Txt('Monto').bold().fontSize(10).end).fillColor('#DDDDDD').end,
        ]]).widths(['20%', '20%', '20%', '20%', '20%']).alignment('center').end;
        pdf.add(filaCargo);

      cargos = respuesta.estadoCuenta.cargos;
      if(cargos.length > 0) {
        let encabezadoCargos = new Table([
        [
          new Cell(new Txt('CARGOS').bold().fontSize(10).end).end,
        ]]).widths(['100%']).layout('noBorders').end;
        pdf.add(encabezadoCargos);

        let gris = true;
        cargos.forEach((element: any) => {
          if(gris){
            gris = !gris;
            let filaCargo = new Table([
              [
                new Cell(new Txt(element.concepto).fontSize(8).end).fillColor('#DDDDDD').end,
                new Cell(new Txt('N/A').fontSize(8).end).fillColor('#DDDDDD').end,
                new Cell(new Txt('N/A').fontSize(8).end).fillColor('#DDDDDD').end,
                new Cell(new Txt(element.created_at).fontSize(10).end).fillColor('#DDDDDD').end,
                new Cell(new Txt('-$' + this.generales.milesNumeros(element.monto)).fontSize(8).end).fillColor('#DDDDDD').end,
              ]]).widths(['20%', '20%', '20%', '20%', '20%']).alignment('center').layout('noBorders').end;
              pdf.add(filaCargo);
          }else{
            gris = !gris;
            let filaCargo = new Table([
              [
                new Cell(new Txt(element.concepto).fontSize(8).end).end,
                new Cell(new Txt('N/A').fontSize(8).end).end,
                new Cell(new Txt('N/A').fontSize(8).end).end,
                new Cell(new Txt(element.created_at.split(' ')[0]).fontSize(10).end).end,
                new Cell(new Txt('$' + this.generales.milesNumeros(element.monto)).fontSize(8).end).end,
              ]]).widths(['20%', '20%', '20%', '20%', '20%']).alignment('center').layout('noBorders').end;
              pdf.add(filaCargo);
          }
          
        });
        
      }

      abonos = respuesta.estadoCuenta.abonos;
      if(abonos.length > 0) {
        let encabezadoAbonos = new Table([
        [
          new Cell(new Txt('ABONOS').bold().fontSize(10).end).end,
        ]]).widths(['100%']).layout('noBorders').end;
        pdf.add(encabezadoAbonos);

        let gris = true;
        abonos.forEach((element: any) => {
          if(gris){
            gris = !gris;
            let filaAbono = new Table([
              [
                new Cell(new Txt(element.concepto).fontSize(8).end).fillColor('#DDDDDD').end,
                new Cell(new Txt(element.forma).fontSize(8).end).fillColor('#DDDDDD').end,
                new Cell(new Txt(element.metodo).fontSize(8).end).fillColor('#DDDDDD').end,
                new Cell(new Txt(element.created_at).fontSize(10).end).fillColor('#DDDDDD').end,
                new Cell(new Txt('$' + this.generales.milesNumeros(element.monto)).fontSize(8).end).fillColor('#DDDDDD').end,
              ]]).widths(['20%', '20%', '20%', '20%', '20%']).alignment('center').layout('noBorders').end;
              pdf.add(filaAbono);
          }else{
            gris = !gris;
            let filaAbono = new Table([
              [
                new Cell(new Txt(element.concepto).fontSize(8).end).end,
                new Cell(new Txt(element.forma).fontSize(8).end).end,
                new Cell(new Txt(element.metodo).fontSize(8).end).end,
                new Cell(new Txt(element.created_at.split(' ')[0]).fontSize(10).end).end,
                new Cell(new Txt('$' + this.generales.milesNumeros(element.monto)).fontSize(8).end).end,
              ]]).widths(['20%', '20%', '20%', '20%', '20%']).alignment('center').layout('noBorders').end;
              pdf.add(filaAbono);
          }
          
        });
        
      }

      descuentos = respuesta.estadoCuenta.descuentos;
      if(descuentos.length > 0) {
        let encabezadoDescuentos = new Table([
        [
          new Cell(new Txt('DESCUENTOS').bold().fontSize(10).end).end,
        ]]).widths(['100%']).layout('noBorders').end;
        pdf.add(encabezadoDescuentos);

        let gris = true;
        descuentos.forEach((element: any) => {
          if(gris){
            gris = !gris;
            let filaDescuento = new Table([
              [
                new Cell(new Txt(element.concepto).fontSize(8).end).fillColor('#DDDDDD').end,
                new Cell(new Txt('N/A').fontSize(8).end).fillColor('#DDDDDD').end,
                new Cell(new Txt('N/A').fontSize(8).end).fillColor('#DDDDDD').end,
                new Cell(new Txt(element.created_at).fontSize(10).end).fillColor('#DDDDDD').end,
                new Cell(new Txt('$' + this.generales.milesNumeros(element.monto)).fontSize(8).end).fillColor('#DDDDDD').end,
              ]]).widths(['20%', '20%', '20%', '20%', '20%']).alignment('center').layout('noBorders').end;
              pdf.add(filaDescuento);
          }else{
            gris = !gris;
            let filaDescuento = new Table([
              [
                new Cell(new Txt(element.concepto).fontSize(8).end).end,
                new Cell(new Txt('N/A').fontSize(8).end).end,
                new Cell(new Txt('N/A').fontSize(8).end).end,
                new Cell(new Txt(element.created_at).fontSize(10).end).end,
                new Cell(new Txt('$' + this.generales.milesNumeros(element.monto)).fontSize(8).end).end,
              ]]).widths(['20%', '20%', '20%', '20%', '20%']).alignment('center').layout('noBorders').end;
              pdf.add(filaDescuento);
          }
          
        });
        
      }

      devoluciones = respuesta.estadoCuenta.devoluciones;
      if(devoluciones.length > 0) {
        let encabezadoDevoluciones = new Table([
        [
          new Cell(new Txt('DEVOLUCIONES').bold().fontSize(10).end).end,
        ]]).widths(['100%']).layout('noBorders').end;
        pdf.add(encabezadoDevoluciones);

        let gris = true;
        devoluciones.forEach((element: any) => {
          if(gris){
            gris = !gris;
            let filaDevolucion = new Table([
              [
                new Cell(new Txt(element.concepto).fontSize(8).end).fillColor('#DDDDDD').end,
                new Cell(new Txt(element.forma).fontSize(8).end).fillColor('#DDDDDD').end,
                new Cell(new Txt('N/A').fontSize(8).end).fillColor('#DDDDDD').end,
                new Cell(new Txt(element.created_at).fontSize(10).end).fillColor('#DDDDDD').end,
                new Cell(new Txt('-$' + this.generales.milesNumeros(element.monto)).fontSize(8).end).fillColor('#DDDDDD').end,
              ]]).widths(['20%', '20%', '20%', '20%', '20%']).alignment('center').layout('noBorders').end;
              pdf.add(filaDevolucion);
          }else{
            gris = !gris;
            let filaDevolucion = new Table([
              [
                new Cell(new Txt(element.concepto).fontSize(8).end).end,
                new Cell(new Txt(element.forma).fontSize(8).end).end,
                new Cell(new Txt('N/A').fontSize(8).end).end,
                new Cell(new Txt(element.created_at).fontSize(10).end).end,
                new Cell(new Txt('$' + this.generales.milesNumeros(element.monto)).fontSize(8).end).end,
              ]]).widths(['20%', '20%', '20%', '20%', '20%']).alignment('center').layout('noBorders').end;
              pdf.add(filaDevolucion);
          }
          
        });
        
      }

      extras = respuesta.estadoCuenta.extras;
      if(extras.length > 0) {
        let encabezadoExtras = new Table([
        [
          new Cell(new Txt('EXTRAS').bold().fontSize(10).end).end,
        ]]).widths(['100%']).layout('noBorders').end;
        pdf.add(encabezadoExtras);

        let gris = true;
        extras.forEach((element: any) => {
          if(gris){
            gris = !gris;
            let filaExtra = new Table([
              [
                new Cell(new Txt(element.concepto).fontSize(8).end).fillColor('#DDDDDD').end,
                new Cell(new Txt('N/A').fontSize(8).end).fillColor('#DDDDDD').end,
                new Cell(new Txt('N/A').fontSize(8).end).fillColor('#DDDDDD').end,
                new Cell(new Txt(element.created_at).fontSize(10).end).fillColor('#DDDDDD').end,
                new Cell(new Txt('$' + this.generales.milesNumeros(element.monto)).fontSize(8).end).fillColor('#DDDDDD').end
              ]]).widths(['20%', '20%', '20%', '20%', '20%']).alignment('center').layout('noBorders').end;
              pdf.add(filaExtra);
          }else{
            gris = !gris;
            let filaExtra = new Table([
              [
                new Cell(new Txt(element.concepto).fontSize(8).end).end,
                new Cell(new Txt('-').fontSize(8).end).end,
                new Cell(new Txt('-').fontSize(8).end).end,
                new Cell(new Txt(element.created_at).fontSize(10).end).end,
                new Cell(new Txt('$' + this.generales.milesNumeros(element.monto)).fontSize(8).end).end,
              ]]).widths(['20%', '20%', '20%', '20%', '20%']).alignment('center').layout('noBorders').end;
              pdf.add(filaExtra);
          }
          
        });
        
      }

      if(cargos.length > 0) {
        let totalCargos = new Table([
          [
            new Cell(new Txt('Total Cargos:').bold().fontSize(10).end).end,
            new Cell(new Txt('-$' + this.generales.milesNumeros(respuesta.estadoCuenta.totalCargos)).bold().color('red').fontSize(10).end).end,
          ]]).widths(['80%', '20%']).layout('noBorders').alignment('right').end;
          pdf.add(totalCargos);
      }

      if(abonos.length > 0) {
        let totalAbonos = new Table([
          [
            new Cell(new Txt('Total Abonos:').bold().fontSize(10).end).end,
            new Cell(new Txt('$' + this.generales.milesNumeros(respuesta.estadoCuenta.totalAbonos)).bold().color('green').fontSize(10).end).end,
          ]]).widths(['80%', '20%']).layout('noBorders').alignment('right').end;
          pdf.add(totalAbonos);
      }

      if(descuentos.length > 0) {
        let totalDescuentos = new Table([
          [
            new Cell(new Txt('Total Descuentos:').bold().fontSize(10).end).end,
            new Cell(new Txt('$' + this.generales.milesNumeros(respuesta.estadoCuenta.totalDescuentos)).bold().color('green').fontSize(10).end).end,
          ]]).widths(['80%', '20%']).layout('noBorders').alignment('right').end;
          pdf.add(totalDescuentos);
      }

      if(devoluciones.length > 0) {
        let totalDevoluciones = new Table([
          [
            new Cell(new Txt('Total Devoluciones:').bold().fontSize(10).end).end,
            new Cell(new Txt('-$' + this.generales.milesNumeros(respuesta.estadoCuenta.totalDevoluciones)).bold().color('red').fontSize(10).end).end,
          ]]).widths(['80%', '20%']).layout('noBorders').alignment('right').end;
          pdf.add(totalDevoluciones);
      }

      if(extras.length > 0) {
        let totalExtras = new Table([
          [
            new Cell(new Txt('Total Extras:').bold().fontSize(10).end).end,
            new Cell(new Txt('$' + this.generales.milesNumeros(respuesta.estadoCuenta.totalExtras)).bold().color('green').fontSize(10).end).end,
          ]]).widths(['80%', '20%']).layout('noBorders').alignment('right').end;
          pdf.add(totalExtras);
      }

      let total = respuesta.estadoCuenta.total;
      if(parseFloat(total) > 0){
        let totalCargos = new Table([
        [
          new Cell(new Txt('Total:').bold().fontSize(10).end).end,
          new Cell(new Txt('$' + this.generales.milesNumeros(total)).bold().color('green').fontSize(10).end).end,
        ]]).widths(['80%', '20%']).layout('noBorders').alignment('right').end;
        pdf.add(totalCargos);
      }else if(parseFloat(total) === 0){
        let totalCargos = new Table([
          [
            new Cell(new Txt('Total:').bold().fontSize(10).end).end,
            new Cell(new Txt('$' + this.generales.milesNumeros(total)).bold().fontSize(10).end).end,
          ]]).widths(['80%', '20%']).layout('noBorders').alignment('right').end;
          pdf.add(totalCargos);
      }else{
        let totalCargos = new Table([
          [
            new Cell(new Txt('Total:').bold().fontSize(10).end).end,
            new Cell(new Txt('-$' + this.generales.milesNumeros(total)).bold().color('red').fontSize(10).end).end,
          ]]).widths(['80%', '20%']).layout('noBorders').alignment('right').end;
          pdf.add(totalCargos);
      }
            
      pdf.add(pdf.ln(5));


      let decimaFila1 = new Table([
        [
          new Cell(new Txt('__________________________________').bold().fontSize(8).end).end,
        ]]).widths(['100%']).alignment('center').layout('noBorders').end;
      pdf.add(decimaFila1);

      let onceavaFila1 = new Table([
        [
          new Cell(new Txt('FIRMA ASESOR').bold().fontSize(8).end).end,
        ]]).widths(['100%']).alignment('center').layout('noBorders').end;
        pdf.add(onceavaFila1);

      pdf.create().open();
    },
    error => {
      this.generales.mensajeError('Error al generar PDF de ficha ' + ficha);
    });
  }

  async pdfCartaCongelacion(ficha: string, causa: string) {
    this.servicio.cartaCongelacion(ficha).subscribe((respuesta: any) => {
      const pdf = new PdfMakeWrapper();
      pdf.pageMargins([ 40, 40, 40, 40 ]);
      pdf.pageSize('A4');

      let encabezado = new Txt('INSTITUTO LUMIÉRE').fontSize(15).color('#2F75B5').alignment('center').end;
      let columnaInicial = new Table([
        [encabezado]
      ]).layout('noBorders').widths(['100%']).end;
      pdf.add(columnaInicial);
      pdf.add(pdf.ln(2));

      let fecha = new Txt('Guadalajara, Jalisco, a ' + respuesta.fecha).alignment('right').fontSize(12).end;
      let columnaFecha = new Table([
        [fecha]
      ]).layout('noBorders').widths(['100%']).end;
      pdf.add(columnaFecha);
      pdf.add(pdf.ln(5));

      let carta = new Txt(
        'Por este medio queda establecido que ' + 
        respuesta.alumno.toUpperCase() + 
        ', alumno de Instituto Lumiére perteneciente al curso ' + 
        respuesta.curso.toUpperCase() + ' ' + respuesta.categoria.toUpperCase() +
        ' que se imparte en el plantel ' + 
        respuesta.sucursal.toUpperCase() +
        ' en un horario de ' +
        respuesta.modalidad.toUpperCase() + ' de ' + respuesta.horario + 
        ' y por el cual cubrió el pago de $' +
        respuesta.pago + '/100 M.N., solicitó la suspensión temporal del programa integral de capacitación antes mencionado por la razón que se enuncia a continuación:'
      ).fontSize(12).alignment('justify').end;
      let columnaCarta = new Table([
        [carta]
      ]).layout('noBorders').widths(['100%']).end;
      pdf.add(columnaCarta);
      pdf.add(pdf.ln(2));

      let motivo = new Txt(causa.toUpperCase() + '.').fontSize(12).end;
      let columnaMotivo = new Table([
        [motivo]
      ]).layout('noBorders').widths(['100%']).end;
      pdf.add(columnaMotivo);
      pdf.add(pdf.ln(2));

      let condiciones = new Txt('Queda asimismo suscrito que el alimno llevó a cabo esta solicitud libre y voluntariamente y que entiende y acepta los siguientes terminos y condiciones:').fontSize(12).end;
      let columnaCondiciones = new Table([
        [condiciones]
      ]).layout('noBorders').widths(['100%']).end;
      pdf.add(columnaCondiciones);
      pdf.add(pdf.ln(2));

      let condicion1 = new Txt('1. La vigencia de esta prórroga tendrá como límite el ciclo inmediato al de la suspensión. Es decir, el alumno deberá, obligatoriamente, tomar la reposición durante el periodo siguiente.').fontSize(12).end;
      let columnaCondicion1 = new Table([
        [condicion1]
      ]).layout('noBorders').widths(['100%']).end;
      pdf.add(columnaCondicion1);

      let condicion2 = new Txt('2. En caso de existir diferencia en el costo del curso al solicitar la reposición, el alumno se compromete a cubrir el saldo restante.').fontSize(12).end;
      let columnaCondicion2 = new Table([
        [condicion2]
      ]).layout('noBorders').widths(['100%']).end;
      pdf.add(columnaCondicion2);

      let condicion3 = new Txt('3. El alumno tendrá derecho a tomar la reposición del curso en cualquiera de los planteles con que Instituto Lumiére cuenta, en el horario de su elección.').fontSize(12).end;
      let columnaCondicion3 = new Table([
        [condicion3]
      ]).layout('noBorders').widths(['100%']).end;
      pdf.add(columnaCondicion3);

      let condicion4 = new Txt('4. La única persona facultada para tomar el curso de reposición será el alumno que se inscribió inicialmente, es decir, esta modalidad es intransferible.').fontSize(12).end;
      let columnaCondicion4 = new Table([
        [condicion4]
      ]).layout('noBorders').widths(['100%']).end;
      pdf.add(columnaCondicion4);

      let condicion5 = new Txt('5. El alumno se sujetará a cualquier cambio en la planificación de su curso, determinado por Dirección, así como Coordinación académica.').fontSize(12).end;
      let columnaCondicion5 = new Table([
        [condicion5]
      ]).layout('noBorders').widths(['100%']).end;
      pdf.add(columnaCondicion5);
      pdf.add(pdf.ln(5));

      let firma = new Table([
        [
          new Cell(new Txt('__________________________________').bold().fontSize(12).end).end,
          new Cell(new Txt('__________________________________').bold().fontSize(12).end).end,
        ],
        [
          new Cell(new Txt('JULIO SIERRA\nGERENTE DE PLANTEL').fontSize(12).alignment('center').end).end,
          new Cell(new Txt('ESTOY DE ACUERDO CON LO ESTABLECIDO\nEN ESTA CARTA\n' + respuesta.alumno.toUpperCase()).fontSize(12).alignment('center').end).end
        ]
      ]).widths(['50%', '50%']).alignment('center').layout('noBorders').end;
      pdf.add(firma);

      pdf.create().open();
    },
    error => {
      this.generales.mensajeError('Error al generar PDF de ficha ' + ficha);
    });
  }

  async pdfRecibo(recibo: string) {
    let whatsapp = this.generales.whatsapp;
    let face = this.generales.face;
    this.servicio.reciboPago(recibo).subscribe((respuesta: any) => {
      let logo = this.generales.logos;

      const pdf = new PdfMakeWrapper();
      pdf.pageMargins([ 20, 20, 20, 20 ]);
      pdf.pageSize('A4');

      let encabezado = new Txt('RECIBO DE PAGO:').fontSize(10).alignment('center').color('#2F75B5').end;
      let columnaNombreAlumno = new Table([
        [{image: logo, width: 64, height: 20}, encabezado]
      ]).layout('noBorders').widths(['20%', '80%']).end;
      pdf.add(columnaNombreAlumno);
      pdf.add(pdf.ln(1));

      let folio = new Table([
        [
          new Cell(new Txt(respuesta.ficha).bold().fontSize(8).color('#2F75B5').end).alignment('left').end,
          new Cell(new Txt(respuesta.folio).bold().fontSize(8).color('red').end).alignment('right').end
        ]]).widths(['50%', '50%']).layout('noBorders').end;
        pdf.add(folio);

      let enca = new Table([
        [
          new Cell(new Txt('RECIBO ALUMNO').bold().fontSize(8).end).fillColor('#2F75B5').end
        ]]).widths(['100%']).alignment('center').end;
        pdf.add(enca);

      let primeraFila = new Table([
        [
          new Cell(new Txt('FECHA').bold().fontSize(8).end).fillColor('#2F75B5').end,
          new Cell(new Txt(respuesta.fecha.split(' ')[0]).bold().fontSize(8).end).end,
          new Cell(new Txt('ASESOR').bold().fontSize(8).end).fillColor('#2F75B5').end,
          new Cell(new Txt(respuesta.asesor).bold().fontSize(8).end).end,
          new Cell(new Txt('PLANTEL').bold().fontSize(8).end).fillColor('#2F75B5').end,
          new Cell(new Txt(respuesta.plantel).bold().fontSize(8).end).end
        ]]).widths(['17%', '17%', '17%', '17%', '16%', '16%']).alignment('center').end;
      pdf.add(primeraFila);
      
      let segundaFila = new Table([
        [
          new Cell(new Txt('NIVEL').bold().fontSize(8).end).fillColor('#2F75B5').end,
          new Cell(new Txt(respuesta.nivel).bold().fontSize(8).end).end,
          new Cell(new Txt('CATEGORIA').bold().fontSize(8).end).fillColor('#2F75B5').end,
          new Cell(new Txt(respuesta.categoria).bold().fontSize(8).end).end,
          new Cell(new Txt('MODALIDAD').bold().fontSize(8).end).fillColor('#2F75B5').end,
          new Cell(new Txt(respuesta.modalidad).bold().fontSize(8).end).end
        ]]).widths(['17%', '17%', '17%', '17%', '16%', '16%']).alignment('center').end;
      pdf.add(segundaFila);

      let tercerFila = new Table([
        [
          new Cell(new Txt('CURSO').bold().fontSize(8).end).fillColor('#2F75B5').end,
          new Cell(new Txt(respuesta.curso).bold().fontSize(8).end).end,
          new Cell(new Txt('HORARIO').bold().fontSize(8).end).fillColor('#2F75B5').end,
          new Cell(new Txt(respuesta.horario).bold().fontSize(8).end).end,
          new Cell(new Txt('PRECIO').bold().fontSize(8).end).fillColor('#2F75B5').end,
          new Cell(new Txt('$' + this.generales.milesNumeros(respuesta.precio)).bold().fontSize(8).end).end
        ]]).widths(['17%', '17%', '17%', '17%', '16%', '16%']).alignment('center').end;
      pdf.add(tercerFila);

      let cuartaFila = new Table([
        [
          new Cell(new Txt('FECHA DE INICIO').bold().fontSize(8).end).fillColor('#2F75B5').end,
          new Cell(new Txt(respuesta.inicio).bold().fontSize(8).end).end,
          new Cell(new Txt('FECHA TERMINO').bold().fontSize(8).end).fillColor('#2F75B5').end,
          new Cell(new Txt(respuesta.fin).bold().fontSize(8).end).end,
          new Cell(new Txt('SALDO ACTUAL').bold().fontSize(8).end).fillColor('#2F75B5').end,
          new Cell(new Txt('$' + this.generales.milesNumeros(respuesta.restante)).bold().fontSize(8).end).end
        ]]).widths(['17%', '17%', '17%', '17%', '16%', '16%']).alignment('center').end;
      pdf.add(cuartaFila);

      let quintaFila = new Table([
        [
          new Cell(new Txt('RECIBIMOS DE').bold().fontSize(8).end).fillColor('#2F75B5').end,
          new Cell(new Txt(respuesta.alumno).bold().fontSize(8).end).end,
          new Cell(new Txt('POR CONCEPTO DE').bold().fontSize(8).end).fillColor('#2F75B5').end,
          new Cell(new Txt(respuesta.concepto).bold().fontSize(8).end).end
        ]]).widths(['16%', '35%', '16%', '33%']).alignment('center').end;
      pdf.add(quintaFila);

      let sextaFila = new Table([
        [
          new Cell(new Txt('Por concepto de pago a curso de capacitacion').bold().fontSize(8).italics().end).end,
        ]]).widths(['100%']).alignment('center').layout('noBorders').end;
      pdf.add(sextaFila);
          
      let septimaFila = new Table([
        [
          new Cell(new Txt('SALDO ANTERIOR').bold().fontSize(8).end).fillColor('#2F75B5').end,
          new Cell(new Txt('$' + this.generales.milesNumeros(respuesta.anterior)).bold().fontSize(8).end).end,
          new Cell(new Txt('FORMA DE PAGO').bold().fontSize(8).end).fillColor('#2F75B5').end,
          new Cell(new Txt(respuesta.forma).bold().fontSize(8).end).end,
          new Cell(new Txt('MONTO').bold().fontSize(8).end).fillColor('#2F75B5').end,
          new Cell(new Txt('$' + this.generales.milesNumeros(respuesta.monto)).bold().fontSize(8).end).end
        ]]).widths(['17%', '17%', '17%', '17%', '16%', '16%']).alignment('center').end;
      pdf.add(septimaFila);
      
      let octavaFila = new Table([
        [
          new Cell(new Txt('Banco').bold().fontSize(8).end).fillColor('#2F75B5').end,
          new Cell(new Txt(respuesta.banco).bold().fontSize(8).end).end,
          new Cell(new Txt('No. DE AUTORIZACIÓN').bold().fontSize(8).end).fillColor('#2F75B5').end,
          new Cell(new Txt(respuesta.autorizacion).bold().fontSize(8).end).end,
          new Cell(new Txt('FECHA').bold().fontSize(8).end).fillColor('#2F75B5').end,
          new Cell(new Txt(respuesta.fechaPago).bold().fontSize(8).end).end
        ]]).widths(['17%', '17%', '17%', '17%', '16%', '16%']).alignment('center').end;
      pdf.add(octavaFila);

      let novenaFila = new Table([
        [
          new Cell(new Txt('En caso de cancelación o cambio de curso, así como cambios en el proceso de admisión, no habrá devolución por el importe pagado. Para facturación se tiene un lapso de 21 días hábiles').bold().fontSize(8).italics().end).end,
        ]]).widths(['100%']).alignment('center').layout('noBorders').end;
      pdf.add(novenaFila);
      
      pdf.add(pdf.ln(3));
              
      let decimaFila = new Table([
        [
          new Cell(new Txt('__________________________________').bold().fontSize(8).end).end,
          new Cell(new Txt('!Donde forjamos triunfadores¡').fontSize(8).italics().color('#3075CF').end).end,
          new Cell(new Txt('__________________________________').bold().fontSize(8).end).end,
        ]]).widths(['33%', '33%', '34%']).alignment('center').layout('noBorders').end;
      pdf.add(decimaFila);

      let onceavaFila = new Table([
        [
          new Cell(new Txt('FIRMA ASESOR').bold().fontSize(8).end).end,
          new Cell(new Txt('').fontSize(8).italics().color('#3075CF').end).end,
          new Cell(new Txt('FIRMA DE QUIEN RECIBE').bold().fontSize(8).end).end,
        ]]).widths(['33%', '33%', '34%']).alignment('center').layout('noBorders').end;
        pdf.add(onceavaFila);

        pdf.add(pdf.ln(1));

      let doceavaFila = new Table([
        [
          {image: whatsapp, width: 30, height: 30},
          new Cell(new Txt('\n¡Comunicate con tu asesor al numero '+respuesta.telefonoSucursal+'!').color('gray').fontSize(8).end).end,
          new Cell(new QR('https://www.cursoslumiere.com/Documentos/TERMINOS%20Y%20CONDICIONES.pdf').bold().fontSize(8).fit(70).end).end,
          {image: face, width: 30, height: 30},
          new Cell(new Txt('\nhttps://www.facebook.com/CursosLumiere/').color('gray').fontSize(8).end).end,
        ]]).widths(['6%', '27%', '33%', '6%', '28%']).alignment('center').layout('noBorders').end;
      pdf.add(doceavaFila);

      let treceavaFila = new Table([
        [
          new Cell(new Txt('').bold().fontSize(8).end).end,
          new Cell(new Txt('CONSULTA TERMINOS Y CONDICIONES').fontSize(8).italics().color('#3075CF').end).end,
          new Cell(new Txt('').bold().fontSize(8).end).end,
        ]]).widths(['33%', '33%', '34%']).alignment('center').layout('noBorders').end;
        pdf.add(treceavaFila);

      let cut = new Txt(this.generales.tijeras).fontSize(8).italics().end;
      let columnaCUT = new Table([
        [cut]
      ]).layout('noBorders').end;
      pdf.add(columnaCUT);

      let encabezado1 = new Txt('RECIBO DE PAGO:').fontSize(10).alignment('center').color('#2F75B5').end;
      let columnaNombreAlumno1 = new Table([
        [{image: logo, width: 64, height: 20}, encabezado1]
      ]).layout('noBorders').widths(['20%', '80%']).end;
      pdf.add(columnaNombreAlumno1);
      pdf.add(pdf.ln(1));

      let folio1 = new Table([
        [
          new Cell(new Txt(respuesta.folio).bold().fontSize(8).color('red').end).end
        ]]).widths(['100%']).alignment('right').layout('noBorders').end;
        pdf.add(folio1);

      let enca1 = new Table([
        [
          new Cell(new Txt('RECIBO ALUMNO').bold().fontSize(8).end).fillColor('#2F75B5').end
        ]]).widths(['100%']).alignment('center').end;
        pdf.add(enca1);

      let primeraFila1 = new Table([
        [
          new Cell(new Txt('FECHA').bold().fontSize(8).end).fillColor('#2F75B5').end,
          new Cell(new Txt(respuesta.fecha.split(' ')[0]).bold().fontSize(8).end).end,
          new Cell(new Txt('ASESOR').bold().fontSize(8).end).fillColor('#2F75B5').end,
          new Cell(new Txt(respuesta.asesor).bold().fontSize(8).end).end,
          new Cell(new Txt('PLANTEL').bold().fontSize(8).end).fillColor('#2F75B5').end,
          new Cell(new Txt(respuesta.plantel).bold().fontSize(8).end).end
        ]]).widths(['17%', '17%', '17%', '17%', '16%', '16%']).alignment('center').end;
      pdf.add(primeraFila1);
      
      let segundaFila1 = new Table([
        [
          new Cell(new Txt('NIVEL').bold().fontSize(8).end).fillColor('#2F75B5').end,
          new Cell(new Txt(respuesta.nivel).bold().fontSize(8).end).end,
          new Cell(new Txt('CATEGORIA').bold().fontSize(8).end).fillColor('#2F75B5').end,
          new Cell(new Txt(respuesta.categoria).bold().fontSize(8).end).end,
          new Cell(new Txt('MODALIDAD').bold().fontSize(8).end).fillColor('#2F75B5').end,
          new Cell(new Txt(respuesta.modalidad).bold().fontSize(8).end).end
        ]]).widths(['17%', '17%', '17%', '17%', '16%', '16%']).alignment('center').end;
      pdf.add(segundaFila1);

      let tercerFila1 = new Table([
        [
          new Cell(new Txt('CURSO').bold().fontSize(8).end).fillColor('#2F75B5').end,
          new Cell(new Txt(respuesta.curso).bold().fontSize(8).end).end,
          new Cell(new Txt('HORARIO').bold().fontSize(8).end).fillColor('#2F75B5').end,
          new Cell(new Txt(respuesta.horario).bold().fontSize(8).end).end,
          new Cell(new Txt('PRECIO').bold().fontSize(8).end).fillColor('#2F75B5').end,
          new Cell(new Txt('$' + this.generales.milesNumeros(respuesta.precio)).bold().fontSize(8).end).end
        ]]).widths(['17%', '17%', '17%', '17%', '16%', '16%']).alignment('center').end;
      pdf.add(tercerFila1);

      let cuartaFila1 = new Table([
        [
          new Cell(new Txt('FECHA DE INICIO').bold().fontSize(8).end).fillColor('#2F75B5').end,
          new Cell(new Txt(respuesta.inicio).bold().fontSize(8).end).end,
          new Cell(new Txt('FECHA TERMINO').bold().fontSize(8).end).fillColor('#2F75B5').end,
          new Cell(new Txt(respuesta.fin).bold().fontSize(8).end).end,
          new Cell(new Txt('SALDO ACTUAL').bold().fontSize(8).end).fillColor('#2F75B5').end,
          new Cell(new Txt('$' + this.generales.milesNumeros(respuesta.restante)).bold().fontSize(8).end).end
        ]]).widths(['17%', '17%', '17%', '17%', '16%', '16%']).alignment('center').end;
      pdf.add(cuartaFila1);

      let quintaFila1 = new Table([
        [
          new Cell(new Txt('RECIBIMOS DE').bold().fontSize(8).end).fillColor('#2F75B5').end,
          new Cell(new Txt(respuesta.alumno).bold().fontSize(8).end).end,
          new Cell(new Txt('POR CONCEPTO DE').bold().fontSize(8).end).fillColor('#2F75B5').end,
          new Cell(new Txt(respuesta.concepto).bold().fontSize(8).end).end
        ]]).widths(['16%', '35%', '16%', '33%']).alignment('center').end;
      pdf.add(quintaFila1);

      let sextaFila1 = new Table([
        [
          new Cell(new Txt('Por concepto de pago a curso de capacitacion').bold().fontSize(8).italics().end).end,
        ]]).widths(['100%']).alignment('center').layout('noBorders').end;
      pdf.add(sextaFila1);
          
      let septimaFila1 = new Table([
        [
          new Cell(new Txt('SALDO ANTERIOR').bold().fontSize(8).end).fillColor('#2F75B5').end,
          new Cell(new Txt('$' + this.generales.milesNumeros(respuesta.anterior)).bold().fontSize(8).end).end,
          new Cell(new Txt('FORMA DE PAGO').bold().fontSize(8).end).fillColor('#2F75B5').end,
          new Cell(new Txt(respuesta.forma).bold().fontSize(8).end).end,
          new Cell(new Txt('MONTO').bold().fontSize(8).end).fillColor('#2F75B5').end,
          new Cell(new Txt('$' + this.generales.milesNumeros(respuesta.monto)).bold().fontSize(8).end).end
        ]]).widths(['17%', '17%', '17%', '17%', '16%', '16%']).alignment('center').end;
      pdf.add(septimaFila1);
      
      let octavaFila1 = new Table([
        [
          new Cell(new Txt('Banco').bold().fontSize(8).end).fillColor('#2F75B5').end,
          new Cell(new Txt(respuesta.banco).bold().fontSize(8).end).end,
          new Cell(new Txt('No. DE AUTORIZACIÓN').bold().fontSize(8).end).fillColor('#2F75B5').end,
          new Cell(new Txt(respuesta.autorizacion).bold().fontSize(8).end).end,
          new Cell(new Txt('FECHA').bold().fontSize(8).end).fillColor('#2F75B5').end,
          new Cell(new Txt(respuesta.fechaPago).bold().fontSize(8).end).end
        ]]).widths(['17%', '17%', '17%', '17%', '16%', '16%']).alignment('center').end;
      pdf.add(octavaFila1);

      let novenaFila1 = new Table([
        [
          new Cell(new Txt('En caso de cancelación o cambio de curso, así como cambios en el proceso de admisión, no habrá devolución por el importe pagado. Para facturación se tiene un lapso de 21 días hábiles').bold().fontSize(8).italics().end).end,
        ]]).widths(['100%']).alignment('center').layout('noBorders').end;
      pdf.add(novenaFila1);
      
      pdf.add(pdf.ln(3));
              
      let decimaFila1 = new Table([
        [
          new Cell(new Txt('__________________________________').bold().fontSize(8).end).end,
          new Cell(new Txt('!Donde forjamos triunfadores¡').fontSize(8).italics().color('#3075CF').end).end,
          new Cell(new Txt('__________________________________').bold().fontSize(8).end).end,
        ]]).widths(['33%', '33%', '34%']).alignment('center').layout('noBorders').end;
      pdf.add(decimaFila1);

      let onceavaFila1 = new Table([
        [
          new Cell(new Txt('FIRMA ASESOR').bold().fontSize(8).end).end,
          new Cell(new Txt('').fontSize(8).italics().color('#3075CF').end).end,
          new Cell(new Txt('FIRMA DE QUIEN RECIBE').bold().fontSize(8).end).end,
        ]]).widths(['33%', '33%', '34%']).alignment('center').layout('noBorders').end;
        pdf.add(onceavaFila1);

        pdf.add(pdf.ln(1));

      let doceavaFila1 = new Table([
        [
          {image: whatsapp, width: 30, height: 30},
          new Cell(new Txt('\n¡Comunicate con tu asesor al numero '+respuesta.telefonoSucursal+'!').color('gray').fontSize(8).end).end,
          new Cell(new QR('https://www.cursoslumiere.com/Documentos/TERMINOS%20Y%20CONDICIONES.pdf').bold().fontSize(8).fit(70).end).end,
          {image: face, width: 30, height: 30},
          new Cell(new Txt('\nhttps://www.facebook.com/CursosLumiere/').color('gray').fontSize(8).end).end,
        ]]).widths(['6%', '27%', '33%', '6%', '28%']).alignment('center').layout('noBorders').end;
      pdf.add(doceavaFila1);

      let treceavaFila1 = new Table([
        [
          new Cell(new Txt('').bold().fontSize(8).end).end,
          new Cell(new Txt('CONSULTA TERMINOS Y CONDICIONES').fontSize(8).italics().color('#3075CF').end).end,
          new Cell(new Txt('').bold().fontSize(8).end).end,
        ]]).widths(['33%', '33%', '34%']).alignment('center').layout('noBorders').end;
        pdf.add(treceavaFila1);

      pdf.create().open();
    },
    error => {
      this.generales.interpretarError(error);
    });
  }

  async pdfIngreso(ingreso: any) {
    this.servicio.ingreso(ingreso).subscribe((respuesta: any) => {
      let logo = this.generales.logos;
      const pdf = new PdfMakeWrapper();
      pdf.pageMargins([ 20, 20, 20, 20 ]);
      pdf.pageSize('A4');

      if(!respuesta.activo){
        pdf.watermark(new Txt('Cancelado').color('red').end); 
      }

      let tablaInformacion = new Table([
        [new Cell(new Txt(respuesta.folio).bold().fontSize(8).end).fillColor('black').color('white').end],
        [new Cell(new Txt(respuesta.plantel).bold().fontSize(8).end).end],
        [new Cell(new Txt(respuesta.fecha).bold().fontSize(8).end).end],
        [new Cell(new Txt(respuesta.hora).bold().fontSize(8).end).end]
      ]).layout('noBorders').widths(['100%']).alignment('center').end;

      let encabezado = new Txt('\n\nRECIBO DE PAGO:').fontSize(10).alignment('center').color('#2F75B5').end;
      let columnaNombreAlumno = new Table([
        [{image: logo, width: 64, height: 20}, encabezado, tablaInformacion]
      ]).layout('noBorders').widths(['33%', '33%', '33%']).end;
      pdf.add(columnaNombreAlumno);
      pdf.add(pdf.ln(1));

      let tablaColumnas = new Table([
        [new Cell(new Txt('ADMINISTRATIVO').bold().fontSize(8).color('white').end).fillColor('black').end],
        [new Cell(new Txt('CONCEPTO').bold().fontSize(8).color('white').end).fillColor('black').end],
        [new Cell(new Txt('MONTO').bold().fontSize(8).color('white').end).fillColor('black').end],
        [new Cell(new Txt('FORMA DE PAGO').bold().fontSize(8).color('white').end).fillColor('black').end],
        [new Cell(new Txt('RUBRO').bold().fontSize(8).color('white').end).fillColor('black').end],
        [new Cell(new Txt('TIPO').bold().fontSize(8).color('white').end).fillColor('black').end]
      ]).layout('noBorders').widths(['100%']).end;

      let tablaDatos = new Table([
        [new Txt(respuesta.usuario).fontSize(8).end],
        [new Txt(respuesta.concepto).fontSize(8).end],
        [new Txt('$' + this.generales.milesNumeros(respuesta.monto)).fontSize(8).end],
        [new Txt(respuesta.forma).fontSize(8).end],
        [new Txt(respuesta.rubro).fontSize(8).end],
        [new Txt(respuesta.tipo).fontSize(8).end]
      ]).layout('noBorders').widths(['100%']).end;

      let datos = new Table([
        [new Cell(tablaColumnas).fillColor('black').end, tablaDatos]
      ]).widths(['25%', '75%']).alignment('center').end;

      pdf.add(datos);
      pdf.add(pdf.ln(1));

      let tablaObservaciones = new Table([
        [new Cell(new Txt('OBSERVACIONES').color('white').fontSize(8).end).fillColor('black').end],
        [new Txt(respuesta.observaciones).fontSize(8).end]
      ]).widths(['100%']).alignment('center').end;

      pdf.add(tablaObservaciones);

      pdf.add(pdf.ln(4));

      let tablaFirmas = new Table([
        [new Txt('_____________________________').end, new Txt('_____________________________').end],
        [new Txt('FIRMA DEL GERENTE').end, new Txt('FIRMA DE \n' + respuesta.empleado).end]
      ]).layout('noBorders').widths(['50%', '50%']).alignment('center').end;

      pdf.add(tablaFirmas);

      let cut = new Txt(this.generales.tijeras).fontSize(8).italics().end;
      let columnaCUT = new Table([
        [cut]
      ]).layout('noBorders').end;
      pdf.add(columnaCUT);


      let tablaInformacion1 = new Table([
        [new Cell(new Txt(respuesta.folio).bold().fontSize(8).end).fillColor('black').color('white').end],
        [new Cell(new Txt(respuesta.plantel).bold().fontSize(8).end).end],
        [new Cell(new Txt(respuesta.fecha).bold().fontSize(8).end).end],
        [new Cell(new Txt(respuesta.hora).bold().fontSize(8).end).end]
      ]).layout('noBorders').widths(['100%']).alignment('center').end;

      let encabezado1 = new Txt('\n\nRECIBO DE PAGO:').fontSize(10).alignment('center').color('#2F75B5').end;
      let columnaNombreAlumno1 = new Table([
        [{image: logo, width: 64, height: 20}, encabezado1, tablaInformacion1]
      ]).layout('noBorders').widths(['33%', '33%', '33%']).end;
      pdf.add(columnaNombreAlumno1);
      pdf.add(pdf.ln(1));

      let tablaColumnas1 = new Table([
        [new Cell(new Txt('ADMINISTRATIVO').bold().fontSize(8).color('white').end).fillColor('black').end],
        [new Cell(new Txt('CONCEPTO').bold().fontSize(8).color('white').end).fillColor('black').end],
        [new Cell(new Txt('MONTO').bold().fontSize(8).color('white').end).fillColor('black').end],
        [new Cell(new Txt('FORMA DE PAGO').bold().fontSize(8).color('white').end).fillColor('black').end],
        [new Cell(new Txt('RUBRO').bold().fontSize(8).color('white').end).fillColor('black').end],
        [new Cell(new Txt('TIPO').bold().fontSize(8).color('white').end).fillColor('black').end]
      ]).layout('noBorders').widths(['100%']).end;

      let tablaDatos1 = new Table([
        [new Txt(respuesta.usuario).fontSize(8).end],
        [new Txt(respuesta.concepto).fontSize(8).end],
        [new Txt('$' + this.generales.milesNumeros(respuesta.monto)).fontSize(8).end],
        [new Txt(respuesta.forma).fontSize(8).end],
        [new Txt(respuesta.rubro).fontSize(8).end],
        [new Txt(respuesta.tipo).fontSize(8).end]
      ]).layout('noBorders').widths(['100%']).end;

      let datos1 = new Table([
        [new Cell(tablaColumnas1).fillColor('black').end, tablaDatos1]
      ]).widths(['25%', '75%']).alignment('center').end;

      pdf.add(datos1);
      pdf.add(pdf.ln(1));

      let tablaObservaciones1 = new Table([
        [new Cell(new Txt('OBSERVACIONES').color('white').fontSize(8).end).fillColor('black').end],
        [new Txt(respuesta.observaciones).fontSize(8).end]
      ]).widths(['100%']).alignment('center').end;

      pdf.add(tablaObservaciones1);

      pdf.add(pdf.ln(4));

      let tablaFirmas1 = new Table([
        [new Txt('_____________________________').end, new Txt('_____________________________').end],
        [new Txt('FIRMA DEL GERENTE').end, new Txt('FIRMA DE \n' + respuesta.empleado).end]
      ]).layout('noBorders').widths(['50%', '50%']).alignment('center').end;

      pdf.add(tablaFirmas1);

      pdf.create().open();
    },
    error => {
      this.generales.interpretarError(error);
    });
  }

  async pdfEgreso(egreso: any) {
    this.servicio.egreso(egreso).subscribe((respuesta: any) => {
      let logo = this.generales.logos;
      const pdf = new PdfMakeWrapper();
      pdf.pageMargins([ 20, 20, 20, 20 ]);
      pdf.pageSize('A4');

      if(!respuesta.activo){
        pdf.watermark(new Txt('Cancelado').color('red').end); 
      }

      let tablaInformacion = new Table([
        [new Cell(new Txt(respuesta.folio).bold().fontSize(8).end).fillColor('black').color('white').end],
        [new Cell(new Txt(respuesta.plantel).bold().fontSize(8).end).end],
        [new Cell(new Txt(respuesta.fecha).bold().fontSize(8).end).end],
        [new Cell(new Txt(respuesta.hora + ' hrs.').bold().fontSize(8).end).end]
      ]).layout('noBorders').widths(['100%']).alignment('center').end;

      let encabezado = new Txt('\n\nCOMPROBANTE DE EGRESOS:').fontSize(10).alignment('center').color('#2F75B5').end;
      let columnaNombreAlumno = new Table([
        [{image: logo, width: 64, height: 20}, encabezado, tablaInformacion]
      ]).layout('noBorders').widths(['33%', '33%', '33%']).end;
      pdf.add(columnaNombreAlumno);
      pdf.add(pdf.ln(1));

      let tablaColumnas = new Table([
        [new Cell(new Txt('ADMINISTRATIVO').bold().fontSize(8).color('white').end).fillColor('black').end],
        [new Cell(new Txt('CONCEPTO').bold().fontSize(8).color('white').end).fillColor('black').end],
        [new Cell(new Txt('MONTO').bold().fontSize(8).color('white').end).fillColor('black').end],
        [new Cell(new Txt('FORMA DE PAGO').bold().fontSize(8).color('white').end).fillColor('black').end],
        [new Cell(new Txt('RUBRO').bold().fontSize(8).color('white').end).fillColor('black').end],
        [new Cell(new Txt('TIPO').bold().fontSize(8).color('white').end).fillColor('black').end]
      ]).layout('noBorders').widths(['100%']).end;

      let tablaDatos = new Table([
        [new Txt(respuesta.usuario).fontSize(8).end],
        [new Txt(respuesta.concepto).fontSize(8).end],
        [new Txt('$' + this.generales.milesNumeros(respuesta.monto)).fontSize(8).end],
        [new Txt(respuesta.forma).fontSize(8).end],
        [new Txt(respuesta.rubro).fontSize(8).end],
        [new Txt(respuesta.tipo).fontSize(8).end]
      ]).layout('noBorders').widths(['100%']).end;

      let datos = new Table([
        [new Cell(tablaColumnas).fillColor('black').end, tablaDatos]
      ]).widths(['25%', '75%']).alignment('center').end;

      pdf.add(datos);
      pdf.add(pdf.ln(1));

      let tablaObservaciones = new Table([
        [new Cell(new Txt('OBSERVACIONES').color('white').fontSize(8).end).fillColor('black').end],
        [new Txt(respuesta.observaciones).fontSize(8).end]
      ]).widths(['100%']).alignment('center').end;

      pdf.add(tablaObservaciones);

      pdf.add(pdf.ln(4));

      let tablaFirmas = new Table([
        [new Txt('_____________________________').end, new Txt('_____________________________').end],
        [new Txt('FIRMA DEL GERENTE').end, new Txt('FIRMA DE \n' + respuesta.empleado).end]
      ]).layout('noBorders').widths(['50%', '50%']).alignment('center').end;

      pdf.add(tablaFirmas);

      let cut = new Txt(this.generales.tijeras).fontSize(8).italics().end;
      let columnaCUT = new Table([
        [cut]
      ]).layout('noBorders').end;
      pdf.add(columnaCUT);


      let tablaInformacion1 = new Table([
        [new Cell(new Txt(respuesta.folio).bold().fontSize(8).end).fillColor('black').color('white').end],
        [new Cell(new Txt(respuesta.plantel).bold().fontSize(8).end).end],
        [new Cell(new Txt(respuesta.fecha).bold().fontSize(8).end).end],
        [new Cell(new Txt(respuesta.hora + ' hrs').bold().fontSize(8).end).end]
      ]).layout('noBorders').widths(['100%']).alignment('center').end;

      let encabezado1 = new Txt('\n\nCOMPROBANTE DE EGRESOS:').fontSize(10).alignment('center').color('#2F75B5').end;
      let columnaNombreAlumno1 = new Table([
        [{image: logo, width: 64, height: 20}, encabezado1, tablaInformacion1]
      ]).layout('noBorders').widths(['33%', '33%', '33%']).end;
      pdf.add(columnaNombreAlumno1);
      pdf.add(pdf.ln(1));

      let tablaColumnas1 = new Table([
        [new Cell(new Txt('ADMINISTRATIVO').bold().fontSize(8).color('white').end).fillColor('black').end],
        [new Cell(new Txt('CONCEPTO').bold().fontSize(8).color('white').end).fillColor('black').end],
        [new Cell(new Txt('MONTO').bold().fontSize(8).color('white').end).fillColor('black').end],
        [new Cell(new Txt('FORMA DE PAGO').bold().fontSize(8).color('white').end).fillColor('black').end],
        [new Cell(new Txt('RUBRO').bold().fontSize(8).color('white').end).fillColor('black').end],
        [new Cell(new Txt('TIPO').bold().fontSize(8).color('white').end).fillColor('black').end]
      ]).layout('noBorders').widths(['100%']).end;

      let tablaDatos1 = new Table([
        [new Txt(respuesta.usuario).fontSize(8).end],
        [new Txt(respuesta.concepto).fontSize(8).end],
        [new Txt('$' + this.generales.milesNumeros(respuesta.monto)).fontSize(8).end],
        [new Txt(respuesta.forma).fontSize(8).end],
        [new Txt(respuesta.rubro).fontSize(8).end],
        [new Txt(respuesta.tipo).fontSize(8).end]
      ]).layout('noBorders').widths(['100%']).end;

      let datos1 = new Table([
        [new Cell(tablaColumnas1).fillColor('black').end, tablaDatos1]
      ]).widths(['25%', '75%']).alignment('center').end;

      pdf.add(datos1);
      pdf.add(pdf.ln(1));

      let tablaObservaciones1 = new Table([
        [new Cell(new Txt('OBSERVACIONES').color('white').fontSize(8).end).fillColor('black').end],
        [new Txt(respuesta.observaciones).fontSize(8).end]
      ]).widths(['100%']).alignment('center').end;

      pdf.add(tablaObservaciones1);

      pdf.add(pdf.ln(4));

      let tablaFirmas1 = new Table([
        [new Txt('_____________________________').end, new Txt('_____________________________').end],
        [new Txt('FIRMA DEL GERENTE').end, new Txt('FIRMA DE \n' + respuesta.empleado).end]
      ]).layout('noBorders').widths(['50%', '50%']).alignment('center').end;

      pdf.add(tablaFirmas1);

      pdf.create().open();
    },
    error => {
      this.generales.interpretarError(error);
    });
  }

  async pdfNomina(nomina: any) {
    this.servicio.nomina(nomina).subscribe((respuesta: any) => {
      let logo = this.generales.logos;
      const pdf = new PdfMakeWrapper();
      pdf.pageMargins([ 20, 20, 20, 20 ]);
      pdf.pageSize('A4');


      let tablaInformacion = new Table([
        [
          new Cell(new Txt('N° de Folio').bold().fontSize(8).end).fillColor('black').color('white').end,
          new Cell(new Txt(respuesta.folio).bold().fontSize(8).end).end
        ]
      ]).widths(['50%', '50%']).alignment('center').end;

      let encabezado = new Txt('\n\nRECIBO DE NOMINA:').fontSize(10).alignment('center').color('#2F75B5').end;
      let columnaNombreAlumno = new Table([
        [{image: logo, width: 64, height: 20}, encabezado, tablaInformacion]
      ]).layout('noBorders').widths(['33%', '33%', '33%']).end;
      pdf.add(columnaNombreAlumno);

      pdf.add(pdf.ln(1));

      let tablaDatos = new Table([
        [
          new Cell(new Txt('Nombre del Colaborador').bold().fontSize(8).end).fillColor('#2F75B5').color('white').end,
          new Cell(new Txt(respuesta.colaborador).bold().fontSize(8).end).end
        ],
        [
          new Cell(new Txt('Departamento').bold().fontSize(8).end).fillColor('#2F75B5').color('white').end,
          new Cell(new Txt(respuesta.departamento).bold().fontSize(8).end).end
        ],
        [
          new Cell(new Txt('Puesto').bold().fontSize(8).end).fillColor('#2F75B5').color('white').end,
          new Cell(new Txt(respuesta.puesto).bold().fontSize(8).end).end
        ],
        [
          new Cell(new Txt('Lugar de Trabajo').bold().fontSize(8).end).fillColor('#2F75B5').color('white').end,
          new Cell(new Txt(respuesta.sucursal).bold().fontSize(8).end).end
        ]
      ]).widths(['30%', '70%']).alignment('center').end;
      pdf.add(tablaDatos);
      pdf.add(pdf.ln(2));

      let fechas = new Table([
        [
          new Cell(new Txt('Periodo del:').bold().fontSize(8).end).fillColor('#2F75B5').color('white').end,
          new Cell(new Txt(respuesta.fechaInicio).bold().fontSize(8).end).end,
          new Cell(new Txt('al:').bold().fontSize(8).end).fillColor('#2F75B5').color('white').end,
          new Cell(new Txt(respuesta.fechaFin).bold().fontSize(8).end).end,
          new Cell(new Txt('Fecha de Expedición:').bold().fontSize(8).end).fillColor('#2F75B5').color('white').end,
          new Cell(new Txt(respuesta.fechaExpedicion).bold().fontSize(8).end).end
        ]
      ]).widths(['15%', '20%', '5%', '20%', '20%', '20%']).alignment('center').end;
      pdf.add(fechas);

      pdf.add(pdf.ln(2));

      if(parseInt(respuesta.tipo) === 1){
        let datosNomina = new Array<any>();
        respuesta.percepciones.forEach((element: any) => {
          datosNomina.push(
            new Table([
              [
                new Cell(new Txt(element.concepto).bold().fontSize(8).end).end,
                new Cell(new Txt('$' + this.generales.milesNumeros(element.valorUnitario)).bold().fontSize(8).end).end,
                new Cell(new Txt(element.cantidad).bold().fontSize(8).end).end,
                new Cell(new Txt('$' + this.generales.milesNumeros(element.monto)).bold().fontSize(8).end).end,
                new Cell(new Txt('-').bold().fontSize(8).end).end
              ]
            ]).widths(['20%', '20%', '20%', '20%', '20%']).layout('noBorders').alignment('center').end
          );
        });
        respuesta.deducciones.forEach((element: any) => {
          datosNomina.push(
            new Table([
              [
                new Cell(new Txt(element.concepto).bold().fontSize(8).end).end,
                new Cell(new Txt('$' + this.generales.milesNumeros(element.valorUnitario)).bold().fontSize(8).end).end,
                new Cell(new Txt(element.cantidad).bold().fontSize(8).end).end,
                new Cell(new Txt('-').bold().fontSize(8).end).end,
                new Cell(new Txt('$' + this.generales.milesNumeros(element.monto)).bold().fontSize(8).end).end
              ]
            ]).widths(['20%', '20%', '20%', '20%', '20%']).layout('noBorders').alignment('center').end
          );
        });
    
        let encabezados = new Table([
          [
            new Cell(new Txt('Concepto').bold().fontSize(8).end).fillColor('#2F75B5').color('white').end,
            new Cell(new Txt('Valor Unitario').bold().fontSize(8).end).fillColor('#2F75B5').color('white').end,
            new Cell(new Txt('Cantidad').bold().fontSize(8).end).fillColor('#2F75B5').color('white').end,
            new Cell(new Txt('Percepciones').bold().fontSize(8).end).fillColor('#2F75B5').color('white').end,
            new Cell(new Txt('Deducciones').bold().fontSize(8).end).fillColor('#2F75B5').color('white').end,
          ]
        ]).widths(['20%', '20%', '20%', '20%', '20%']).alignment('center').end;
        pdf.add(encabezados);
    
        let datos = new Table([
          [datosNomina]
        ]).widths(['100%']).alignment('center').end;
        pdf.add(datos);
      }else{
        let datosNomina = new Array<any>();
        respuesta.percepciones.forEach((element: any) => {
          datosNomina.push(
            new Table([
              [
                new Cell(new Txt(element.concepto).bold().fontSize(8).end).end,
                new Cell(new Txt('$' + this.generales.milesNumeros(element.monto)).bold().fontSize(8).end).end,
                new Cell(new Txt('-').bold().fontSize(8).end).end,
              ]
            ]).widths(['34%', '33%', '33%']).layout('noBorders').alignment('center').end
          );
        });
        respuesta.deducciones.forEach((element: any) => {
          datosNomina.push(
            new Table([
              [
                new Cell(new Txt(element.concepto).bold().fontSize(8).end).end,
                new Cell(new Txt('-').bold().fontSize(8).end).end,
                new Cell(new Txt('$' + this.generales.milesNumeros(element.monto)).bold().fontSize(8).end).end,
              ]
            ]).widths(['34%', '33%', '33%']).layout('noBorders').alignment('center').end
          );
        });
    
        let encabezados = new Table([
          [
            new Cell(new Txt('Concepto').bold().fontSize(8).end).fillColor('#2F75B5').color('white').end,
            new Cell(new Txt('Percepciones').bold().fontSize(8).end).fillColor('#2F75B5').color('white').end,
            new Cell(new Txt('Deducciones').bold().fontSize(8).end).fillColor('#2F75B5').color('white').end,
          ]
        ]).widths(['34%', '33%', '33%']).alignment('center').end;
        pdf.add(encabezados);
    
        let datos = new Table([
          [datosNomina]
        ]).widths(['100%']).alignment('center').end;
        pdf.add(datos);
      }

      

      pdf.add(pdf.ln(2));

      let totalPercepcionesEfectivo = 0;
      let totalPercepcionesDeposito = 0;
      let totalDeduccionesEfectivo = 0;
      let totalDeduccionesDeposito = 0;

      respuesta.percepciones.forEach((element: any) => {
        if (parseInt(element.idFormaPago) === 1) {
          totalPercepcionesEfectivo += parseFloat(element.monto);
        } else {
          totalPercepcionesDeposito += parseFloat(element.monto);
        }
      });

      respuesta.deducciones.forEach((element: any) => {
        if (parseInt(element.idFormaPago) === 1) {
          totalDeduccionesEfectivo += parseFloat(element.monto);
        } else {
          totalDeduccionesDeposito += parseFloat(element.monto);
        }
      });

      let tablaTotales = new Table([
        [
          new Cell(new Txt('Percepciones en Efectivo:').fontSize(8).end).end,
          new Cell(new Txt('$' + this.generales.milesNumeros(totalPercepcionesEfectivo.toString())).fontSize(8).end).alignment('right').end,
        ],
        [
          new Cell(new Txt('Percepciones en Depósito:').fontSize(8).end).end,
          new Cell(new Txt('$' + this.generales.milesNumeros(totalPercepcionesDeposito.toString())).fontSize(8).end).alignment('right').end,
        ],
        [
          new Cell(new Txt('Deducciones en Efectivo:').fontSize(8).end).end,
          new Cell(new Txt('$' + this.generales.milesNumeros(totalDeduccionesEfectivo.toString())).fontSize(8).end).alignment('right').end,
        ],
        [
          new Cell(new Txt('Deducciones en Depósito:').fontSize(8).end).end,
          new Cell(new Txt('$' + this.generales.milesNumeros(totalDeduccionesDeposito.toString())).fontSize(8).end).alignment('right').end,
        ],
        [
          new Cell(new Txt('--------------------------------------------------').fontSize(8).color('gray').end).colSpan(2).end,
          null
        ],
        [
          new Cell(new Txt('Subtotal de la Nómina:').bold().fontSize(8).end).end,
          new Cell(new Txt('$' + this.generales.milesNumeros(respuesta.total)).bold().fontSize(8).end).alignment('right').end,
        ]
      ]).widths(['70%', '30%']).layout('noBorders').end

      let tablaIntermedia = new Table([
        [tablaTotales, null]
      ]).widths(['50%', '50%']).layout('noBorders').end
      pdf.add(tablaIntermedia);

      pdf.add(pdf.ln(2));

      let tablaObservaciones = new Table([
        [new Cell(new Txt('Observaciones').bold().fontSize(8).end).fillColor('#2F75B5').color('white').end],
        [new Cell(new Txt(respuesta.observaciones).bold().fontSize(8).end).end],
      ]).widths(['100%']).alignment('center').end

      pdf.add(tablaObservaciones);

      pdf.add(pdf.ln(1));

      let tablaLeyenda = new Table([
        [new Cell(new Txt('RECIBI DE INSTITUTO LUMIERE LA CANTIDAD NETA INDICADA EN EL PRESENTE RECIBO, HECHOS LOS DESCUENTOS AUTORIZADOS CONFIRMO QUE LA FECHA NO SE ME ADEUDA NINGUNA CANTIDAD POR OTRO CONCEPTO DE LEY').fontSize(10).end).end],
      ]).widths(['100%']).end

      let tablaFirmaEmpleado = new Table([
        [
          new Cell(new Txt('Nombre del Colaborador').bold().fontSize(8).end).fillColor('#2F75B5').color('white').end,
          new Cell(new Txt('Firma').bold().fontSize(8).end).fillColor('#2F75B5').color('white').end,
        ],
        [
          new Cell(new Txt('\n\n\n').bold().fontSize(8).end).end,
          new Cell(new Txt('\n\n\n').bold().fontSize(8).end).end
        ],
        [
          new Cell(new Txt('Fecha de cobro').bold().fontSize(8).end).fillColor('#2F75B5').color('white').end,
          new Cell(new Txt(respuesta.hoy).bold().fontSize(8).end).end
        ]
      ]).widths(['50%', '50%']).alignment('center').end;

      let firmaUno = new Table([
        [tablaLeyenda, null, tablaFirmaEmpleado]
      ]).widths(['45%', '10%', '45%']).layout('noBorders').end;

      pdf.add(firmaUno);

      let auditoria = new Table([
        [new Cell(new Txt('Firma de auditoria').bold().fontSize(8).end).fillColor('#2F75B5').color('white').end],
        [new Cell(new Txt('\n\n\n').bold().fontSize(8).end).end]
      ]).widths(['100%']).end

      let firmaGerente = new Table([
        [
          new Cell(new Txt('Nombre del Gerente').bold().fontSize(8).end).fillColor('#2F75B5').color('white').end,
          new Cell(new Txt('Firma').bold().fontSize(8).end).fillColor('#2F75B5').color('white').end,
        ],
        [
          new Cell(new Txt('\n\n\n').bold().fontSize(8).end).end,
          new Cell(new Txt('\n\n\n').bold().fontSize(8).end).end
        ],
      ]).widths(['50%', '50%']).alignment('center').end

      let firmaDos = new Table([
        [auditoria, null, firmaGerente]
      ]).widths(['45%', '10%', '45%']).layout('noBorders').end;
      pdf.add(firmaDos);

      pdf.create().open();
      
    },
    error => {
      this.generales.interpretarError(error);
    });
  }

  async pdfCorte(body: any) {
    this.servicio.corte(body).subscribe((respuesta: any) => {
      let logo = this.generales.logos;
      const pdf = new PdfMakeWrapper();
      pdf.pageMargins([ 20, 20, 20, 20 ]);
      pdf.pageSize('A4');

      
      let columnaLogotipo = new Table([
        [{image: logo, width: 64, height: 20}]
      ]).layout('noBorders').widths(['100%']).end;
      pdf.add(columnaLogotipo);

      let encabezado = new Txt('Corte de Caja:').fontSize(15).alignment('center').color('#2F75B5').end;
      let columnaEncabezado = new Table([
        [encabezado]
      ]).layout('noBorders').widths(['100%']).alignment('center').end;
      pdf.add(columnaEncabezado);
      pdf.add(pdf.ln(2));

      let informacionEmpleado = new Table([
        [
          new Cell(new Txt('Fecha del Corte: ' + respuesta.fechaCorte).fontSize(12).end).alignment('left').end,
          new Cell(new Txt('Usuario: ' + respuesta.usuario).fontSize(12).end).alignment('right').end
        ]
      ]).widths(['50%', '50%']).alignment('center').layout('noBorders').end;
      pdf.add(informacionEmpleado);
      pdf.add(pdf.ln(2));

      //Ingresos Agregados
      if(respuesta.ingresos.length > 0){
        let encabezadoIngresos = new Table([
          [
            new Cell(new Txt('Ingresos').fontSize(10).bold().end).alignment('left').end,
          ]
        ]).widths(['100%']).layout('noBorders').end;
        pdf.add(encabezadoIngresos);
  
        let tablaIngresosAgregados = new Table([
          [
            new Cell(new Txt('Folio').fontSize(10).color('white').bold().end).fillColor('#2F75B5').end,
            new Cell(new Txt('Rubro').fontSize(10).color('white').bold().end).fillColor('#2F75B5').end,
            new Cell(new Txt('Concepto').fontSize(10).color('white').bold().end).fillColor('#2F75B5').end,
            new Cell(new Txt('Monto').fontSize(10).color('white').bold().end).fillColor('#2F75B5').end,
            new Cell(new Txt('Forma de Pago').fontSize(10).color('white').bold().end).fillColor('#2F75B5').end,
            new Cell(new Txt('Referencia').fontSize(10).color('white').bold().end).fillColor('#2F75B5').end,
            new Cell(new Txt('Fecha').fontSize(10).color('white').bold().end).fillColor('#2F75B5').end,
          ]
        ]).widths(['10%', '14%', '20%', '13%', '15%', '11%', '17%']).alignment('center').end;
        pdf.add(tablaIngresosAgregados);
        
        let ingreso = new Table(
          respuesta.ingresos
        ).widths(['10%', '14%', '20%', '13%', '15%', '11%', '17%']).fontSize(8).bold().alignment('center').end
        pdf.add(ingreso);
        pdf.add(pdf.ln(1));
  
        let totalesEncabezado = new Table([
          [
            new Cell(new Txt('Totales Ingresos').fontSize(10).color('white').bold().end).fillColor('#2F75B5').alignment('center').colSpan(2).end,
          ]
        ]).widths(['20%', '20%']).end;
        pdf.add(totalesEncabezado);
  
        let totalIngresos = new Table(
          respuesta.totalIngresos
        ).widths(['20%', '20%']).fontSize(8).bold().end
        pdf.add(totalIngresos);
  
        pdf.add(pdf.ln(1));
      }else{
        let encabezadoIngresos = new Table([
          [
            new Cell(new Txt('No hay ingresos').fontSize(10).bold().end).alignment('left').end,
          ]
        ]).widths(['100%']).layout('noBorders').end;
        pdf.add(encabezadoIngresos);
      }

      //Egresos Agregados
      if(respuesta.egresos.length > 0){
        let encabezadoEgresos = new Table([
          [
            new Cell(new Txt('Egresos').fontSize(10).bold().end).alignment('left').end,
          ]
        ]).widths(['100%']).layout('noBorders').end;
        pdf.add(encabezadoEgresos);
  
        let tablaEgresosAgregados = new Table([
          [
            new Cell(new Txt('Folio').fontSize(10).color('white').bold().end).fillColor('#2F75B5').end,
            new Cell(new Txt('Rubro').fontSize(10).color('white').bold().end).fillColor('#2F75B5').end,
            new Cell(new Txt('Concepto').fontSize(10).color('white').bold().end).fillColor('#2F75B5').end,
            new Cell(new Txt('Monto').fontSize(10).color('white').bold().end).fillColor('#2F75B5').end,
            new Cell(new Txt('Forma de Pago').fontSize(10).color('white').bold().end).fillColor('#2F75B5').end,
            new Cell(new Txt('Referencia').fontSize(10).color('white').bold().end).fillColor('#2F75B5').end,
            new Cell(new Txt('Fecha').fontSize(10).color('white').bold().end).fillColor('#2F75B5').end,
          ]
        ]).widths(['10%', '14%', '20%', '13%', '15%', '11%', '17%']).alignment('center').end;
        pdf.add(tablaEgresosAgregados);
        
        let egreso = new Table(
          respuesta.egresos
        ).widths(['10%', '14%', '20%', '13%', '15%', '11%', '17%']).fontSize(8).bold().alignment('center').end
        pdf.add(egreso);
        pdf.add(pdf.ln(1));
  
        let totalesEncabezadoE = new Table([
          [
            new Cell(new Txt('Totales Egresos').fontSize(10).color('white').bold().end).fillColor('#2F75B5').alignment('center').colSpan(2).end,
          ]
        ]).widths(['20%', '20%']).end;
        pdf.add(totalesEncabezadoE);
  
        let totalEgresos = new Table(
          respuesta.totalEgresos
        ).widths(['20%', '20%']).fontSize(8).bold().end
        pdf.add(totalEgresos);
  
        pdf.add(pdf.ln(1));
      }else{
        let encabezadoEgresos = new Table([
          [
            new Cell(new Txt('No hay egresos').fontSize(10).bold().end).alignment('left').end,
          ]
        ]).widths(['100%']).layout('noBorders').end;
        pdf.add(encabezadoEgresos);
      }

      //Inscripciones
      if(respuesta.inscripciones.length > 0){
        let encabezadoInscripciones = new Table([
          [
            new Cell(new Txt('Inscripciones').fontSize(10).bold().end).alignment('left').end,
          ]
        ]).widths(['100%']).layout('noBorders').end;
        pdf.add(encabezadoInscripciones);
  
        let tablaInscripciones = new Table([
          [
            new Cell(new Txt('Alumno').fontSize(10).color('white').bold().end).fillColor('#2F75B5').end,
            new Cell(new Txt('Ficha').fontSize(10).color('white').bold().end).fillColor('#2F75B5').end,
            new Cell(new Txt('Fecha').fontSize(10).color('white').bold().end).fillColor('#2F75B5').end
          ]
        ]).widths(['50%', '25%', '25%']).alignment('center').end;
        pdf.add(tablaInscripciones);
        
        let inscripciones = new Table(
          respuesta.inscripciones
        ).widths(['50%', '25%', '25%']).fontSize(8).bold().alignment('center').end
        pdf.add(inscripciones);
        pdf.add(pdf.ln(1));
      }else{
        let encabezadoIncripciones = new Table([
          [
            new Cell(new Txt('No hay inscripciones').fontSize(10).bold().end).alignment('left').end,
          ]
        ]).widths(['100%']).layout('noBorders').end;
        pdf.add(encabezadoIncripciones);
      }

      pdf.add(pdf.ln(2));

      //Saldos
      let encabezadoSaldos = new Table([
        [
          new Cell(new Txt('Saldos').fontSize(10).bold().end).alignment('left').end,
        ]
      ]).widths(['100%']).layout('noBorders').end;
      pdf.add(encabezadoSaldos);

      let saldo = respuesta.saldoTotal;
      let saldoInicial = parseFloat(saldo);
      saldoInicial = saldoInicial + parseFloat(respuesta.montoEgresos);
      saldoInicial = saldoInicial - parseFloat(respuesta.montoIngresos);

      let tablaInscripciones = new Table([
        [
          new Cell(new Txt('Saldo inicial en sucursal').fontSize(10).color('white').bold().end).fillColor('#2F75B5').end,
          new Cell(new Txt('$' + this.generales.milesNumeros(saldoInicial.toString())).fontSize(10).bold().end).end
        ],
        [
          new Cell(new Txt('Saldo actual en sucursal').fontSize(10).color('white').bold().end).fillColor('#2F75B5').end,
          new Cell(new Txt('$' + this.generales.milesNumeros(respuesta.saldoTotal)).fontSize(10).bold().end).end
        ],
        [
          new Cell(new Txt('Saldo en vale administrativo').fontSize(10).color('white').bold().end).fillColor('#2F75B5').end,
          new Cell(new Txt('$' + this.generales.milesNumeros(respuesta.vale)).fontSize(10).bold().end).end
        ]
      ]).widths(['40%', '20%']).alignment('center').end;
      pdf.add(tablaInscripciones);

      pdf.add(pdf.ln(10));


      let decimaFila1 = new Table([
        [
          new Cell(new Txt('__________________________________').bold().fontSize(8).end).end,
        ]]).widths(['100%']).alignment('center').layout('noBorders').end;
      pdf.add(decimaFila1);

      let onceavaFila1 = new Table([
        [
          new Cell(new Txt('FIRMA ASESOR').bold().fontSize(8).end).end,
        ]]).widths(['100%']).alignment('center').layout('noBorders').end;
        pdf.add(onceavaFila1);

        pdf.add(pdf.ln(1));

      pdf.create().open();
      
    },
    error => {
      this.generales.interpretarError(error);
    });
  }

  async pdfBoletaAlumno(alumno: any){
    this.servicio.boletaAlumno(alumno).subscribe((respuesta: any) => {
      let logo = this.generales.logos;
      const pdf = new PdfMakeWrapper();
      pdf.pageMargins([ 20, 20, 20, 20 ]);
      pdf.pageSize('A4');

      
      let columnaLogotipo = new Table([
        [{image: logo, width: 64, height: 20}]
      ]).layout('noBorders').widths(['100%']).end;
      pdf.add(columnaLogotipo);

      let encabezado = new Txt('Boleta de Calificaciones').fontSize(15).alignment('center').color('#2F75B5').end;
      let columnaEncabezado = new Table([
        [encabezado]
      ]).layout('noBorders').widths(['100%']).alignment('center').end;
      pdf.add(columnaEncabezado);
      pdf.add(pdf.ln(2));

      let columnaDatosAlumno = new Table([
        [new Txt('Alumno: ' + respuesta.ficha.alumno).fontSize(11).end],
        [new Txt('Curso: ' + respuesta.ficha.curso).fontSize(11).end],
        [new Txt('Calendario: ' + respuesta.ficha.calendario).fontSize(11).end],
        [new Txt('Promedio Alumno:' + respuesta.ficha.promedio).fontSize(11).end]
      ]).layout('noBorders').widths(['100%']).end;
      pdf.add(columnaDatosAlumno);
      pdf.add(pdf.ln(2));
      
      let examenes = respuesta.examenes;
      let encabezados = new Array();
      let sizes = new Array();
      let listaExamenes = new Array();

      respuesta.encabezados.forEach((element: any) => {
        encabezados.push(new Cell(new Txt(element).fontSize(8).bold().end).fillColor('#AFC6DD').end);
      });
      listaExamenes.push(encabezados);

      let size = 100 / encabezados.length;
      encabezados.forEach((elemento: any) => {
        sizes.push(size.toString()+'%');
      });

      examenes.forEach((examen: any) => {
        let arregloExamenes = new Array();
        arregloExamenes.push(new Txt(examen.nombre).fontSize(8).end);
        examen.secciones.forEach((seccion: any) => {
          if(seccion.promedio !== '-'){
            arregloExamenes.push(new Txt(parseInt(seccion.promedio).toString()).fontSize(8).end);
          }else{
            arregloExamenes.push(new Txt(seccion.promedio).fontSize(8).end);
          }
          
        });
        
        arregloExamenes.push(new Txt(examen.promedio).fontSize(8).end);
        arregloExamenes.push(new Txt(examen.total).fontSize(8).end);
        arregloExamenes.push(new Txt(respuesta.ficha.puntaje).fontSize(8).end);
        arregloExamenes.push(new Txt(examen.diferencia).fontSize(8).end);
        
        if(examen.diferencia >= 0){
          arregloExamenes.push(new Txt('ADMITIDO').fontSize(8).color('green').end);
        }else{
          arregloExamenes.push(new Txt('NO ADMITIDO').fontSize(8).color('red').end);
        }
        listaExamenes.push(arregloExamenes);
      });
      
      if(listaExamenes.length > 1){
        let tablaExamenes = new Table(
          listaExamenes
        ).widths(sizes).alignment('center').end;
  
        pdf.add(tablaExamenes);
      }else{
        let columnaExamenes = new Table([
          [new Txt('Aun no existen calificaciones disponibles').fontSize(11).end]
        ]).layout('noBorders').widths(['100%']).alignment('center').end;
        pdf.add(columnaExamenes);
        pdf.add(pdf.ln(2));
      }

      pdf.create().open();
      
    },
    error => {
      this.generales.interpretarError(error);
    });
  }

  async pdfBoletaGrupo(body: any){
    this.servicio.boletaGrupo(body).subscribe((respuesta: any) => {
      let logo = this.generales.logo;
      const pdf = new PdfMakeWrapper();
      pdf.pageMargins([ 20, 20, 20, 20 ]);
      pdf.pageSize('A4');

      
      let columnaLogotipo = new Table([
        [{image: logo, width: 64, height: 20}]
      ]).layout('noBorders').widths(['100%']).end;
      pdf.add(columnaLogotipo);

      let encabezado = new Txt('Boleta de Calificaciones de Grupo').fontSize(15).alignment('center').color('#2F75B5').end;
      let columnaEncabezado = new Table([
        [encabezado]
      ]).layout('noBorders').widths(['100%']).alignment('center').end;
      pdf.add(columnaEncabezado);
      pdf.add(pdf.ln(2));

      let size = 70 / (respuesta[0].length - 1);
      let sizes = new Array();
      let listaFinal = new Array();
      sizes.push('30%');
      respuesta[0].forEach((element: any) => {
        sizes.push(size.toString() + '%');
      });

      let inicio = false;
      respuesta.forEach((elemento: any) => {
        let parte = new Array();
        elemento.forEach((registro: any) => {
          if(!inicio){
            parte.push(new Cell(new Txt(registro).fontSize(8).bold().end).fillColor('#AFC6DD').end);
          }else{
            parte.push(new Txt(registro).fontSize(8).end);
          }
        });
        listaFinal.push(parte);
        inicio = true;
      });

      if(listaFinal.length > 1){
        let tablaExamenes = new Table(
          listaFinal
        ).widths(sizes).alignment('center').end;
  
        pdf.add(tablaExamenes);
      }else{
        let columnaExamenes = new Table([
          [new Txt('Aun no existen calificaciones disponibles').fontSize(11).end]
        ]).layout('noBorders').widths(['100%']).alignment('center').end;
        pdf.add(columnaExamenes);
        pdf.add(pdf.ln(2));
      }

      pdf.create().open();
      
    },
    error => {
      this.generales.interpretarError(error);
    });
  }

  pdfPrueba(){
    const pdf = new PdfMakeWrapper();
    pdf.pageMargins([ 20, 20, 20, 20 ]);
    pdf.pageSize('A4');

    pdf.add('Hola Mundo');
    pdf.create().open();
  }
}
