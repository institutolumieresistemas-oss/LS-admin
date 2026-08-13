import { Component, Input, OnInit, Output, EventEmitter, HostListener, ElementRef, signal } from '@angular/core';

@Component({
  selector: 'app-descripcion-seguimientos',
  templateUrl: './descripcion-seguimientos.component.html',
  styleUrls: ['./descripcion-seguimientos.component.css']
})
export class DescripcionSeguimientosComponent implements OnInit {
  @Input() descripcion: any;
  @Output() emitidorEstatusCita = new EventEmitter<any>();

  dropdownAbierto = signal(false);

  constructor(private eRef: ElementRef) { }

  ngOnInit(): void { 
    
  }

  toggleDropdown(event: MouseEvent): void {
    event.stopPropagation();
    this.dropdownAbierto.update(v => !v);
  }

  cerrarDropdown(): void {
    this.dropdownAbierto.set(false);
  }

  // Cierra el dropdown al hacer click fuera del componente
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.dropdownAbierto.set(false);
    }
  }

  mostrarCita(): boolean {
    return parseInt(this.descripcion.idCita) > 0;
  }

  citaEditable(): boolean {
    if (!this.descripcion) {
      return false;
    }
    if (this.descripcion.idEstatusCita !== undefined && this.descripcion.idEstatusCita !== null && this.descripcion.idEstatusCita !== '') {
      return parseInt(this.descripcion.idEstatusCita) === 1;
    }
    if (this.descripcion.estatusCita) {
      return this.descripcion.estatusCita.toLowerCase().trim() === 'en proceso';
    }
    return false;
  }

  emitirEstatusCita(estatus: number): void {
    this.emitidorEstatusCita.emit({
      idCita: this.descripcion.idCita,
      estatus
    });
    this.cerrarDropdown();
  }
}
