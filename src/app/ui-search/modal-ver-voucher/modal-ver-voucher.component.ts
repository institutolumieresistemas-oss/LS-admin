import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { GeneralesService } from '../../servicios/generales.service';

@Component({
  selector: 'app-modal-ver-voucher',
  templateUrl: './modal-ver-voucher.component.html',
  styleUrl: './modal-ver-voucher.component.css'
})
export class ModalVerVoucherComponent implements OnChanges {
  @Input() voucher: any = '';
  @Input() titulo: string = 'Voucher de Pago';

  esPdf = false;
  esImagen = false;
  voucherProcesado = '';
  pdfSafeUrl: SafeResourceUrl | null = null;
  rotacion = 0;

  constructor(
    private sanitizer: DomSanitizer,
    public generales: GeneralesService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['voucher']) {
      this.procesarVoucher();
    }
  }

  procesarVoucher(): void {
    this.rotacion = 0;
    this.esPdf = false;
    this.esImagen = false;
    this.pdfSafeUrl = null;
    let v = this.voucher;

    if (!v || typeof v !== 'string' || v.trim() === '') {
      this.voucherProcesado = '';
      return;
    }

    v = v.trim();

    // 1. Detectar si es un PDF o URL de PDF
    if (
      v.toLowerCase().endsWith('.pdf') ||
      v.startsWith('data:application/pdf') ||
      v.startsWith('JVBERi0') // Base64 de %PDF
    ) {
      this.esPdf = true;
      if (v.startsWith('JVBERi0')) {
        v = 'data:application/pdf;base64,' + v;
      }
      this.voucherProcesado = v;
      this.pdfSafeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(v);
      return;
    }

    // 2. Detectar si es una imagen
    this.esImagen = true;
    if (v.startsWith('data:image/')) {
      this.voucherProcesado = v;
    } else if (v.startsWith('http://') || v.startsWith('https://') || v.startsWith('/') || v.startsWith('assets/')) {
      this.voucherProcesado = v;
    } else {
      // Es una cadena Base64 pura sin prefijo
      if (v.startsWith('/9j/')) {
        this.voucherProcesado = 'data:image/jpeg;base64,' + v;
      } else if (v.startsWith('iVBORw0KGgo')) {
        this.voucherProcesado = 'data:image/png;base64,' + v;
      } else if (v.startsWith('UklGR')) {
        this.voucherProcesado = 'data:image/webp;base64,' + v;
      } else if (v.startsWith('R0lGOD')) {
        this.voucherProcesado = 'data:image/gif;base64,' + v;
      } else {
        // Por defecto asumir JPEG
        this.voucherProcesado = 'data:image/jpeg;base64,' + v;
      }
    }
  }

  rotarImagen(): void {
    this.rotacion = (this.rotacion + 90) % 360;
  }

  abrirEnNuevaPestana(): void {
    if (!this.voucherProcesado) return;
    
    if (this.voucherProcesado.startsWith('data:')) {
      const win = window.open();
      if (win) {
        if (this.esPdf) {
          win.document.write(`<iframe src="${this.voucherProcesado}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`);
        } else {
          win.document.write(`<img src="${this.voucherProcesado}" style="max-width:100%; height:auto; display:block; margin:20px auto;" />`);
        }
      }
    } else {
      window.open(this.voucherProcesado, '_blank');
    }
  }

  cerrar(): void {
    this.generales.cerrarModal();
  }
}
