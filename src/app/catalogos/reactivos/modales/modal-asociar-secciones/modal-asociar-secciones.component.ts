import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';
import { ReactivosService } from '../../../../servicios/reactivos.service';
import { AplicacionSeccionesService } from '../../../../servicios/aplicacion-secciones.service';

@Component({
  selector: 'app-modal-asociar-secciones',
  templateUrl: './modal-asociar-secciones.component.html',
  styleUrl: './modal-asociar-secciones.component.css'
})
export class ModalAsociarSeccionesComponent implements OnInit {
  @Output() emitidor = new EventEmitter<any>();
  @Input() reactivo: any;
  seccionesDisponibles: any[] = [];
  selecciones: { [idSeccion: number]: boolean } = {};

  constructor(
    private generales: GeneralesService,
    private reactivosService: ReactivosService,
    private seccionesService: AplicacionSeccionesService
  ) { }

  ngOnInit(): void {
    this.cargarSecciones();
  }

  cargarSecciones() {
    this.seccionesService.catalogo().subscribe((respuesta: any) => {
      this.seccionesDisponibles = respuesta;
      
      // Initialize selected checkboxes based on current associated sections
      if (this.reactivo && this.reactivo.secciones) {
        this.reactivo.secciones.forEach((sec: any) => {
          this.selecciones[sec.id] = true;
        });
      }
    });
  }

  guardar() {
    const selectedIds = Object.keys(this.selecciones)
      .map(id => Number(id))
      .filter(id => this.selecciones[id] === true);

    this.reactivosService.asociarSecciones(this.reactivo.id, selectedIds).subscribe(() => {
      this.generales.mensajeCorrecto('Secciones asociadas con éxito');
      this.emitidor.emit(true);
      this.generales.cerrarModal();
    });
  }

  cerrar() {
    this.generales.cerrarModal();
  }
}
