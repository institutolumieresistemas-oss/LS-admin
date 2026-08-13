import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-modal-plantilla-ponderacion',
  templateUrl: './modal-plantilla-ponderacion.component.html',
  styleUrl: './modal-plantilla-ponderacion.component.css'
})
export class ModalPlantillaPonderacionComponent implements OnInit {
  @Input() plantilla: any;
  @Input() seccionesDisponibles: any[] = [];
  @Output() emitidor = new EventEmitter<any>();

  nombre: string = '';
  descripcion: string = '';
  seccionesPlantilla: any[] = [];

  idSeccionNueva: any = null;
  areaNueva: string = 'Verbal';
  porcentajeAreaNueva: number = 50;
  totalPreguntasNueva: number = 0;

  constructor(private generales: GeneralesService) {}

  ngOnInit(): void {
    if (this.plantilla && this.plantilla.id) {
      this.nombre = this.plantilla.nombre;
      this.descripcion = this.plantilla.descripcion || '';
      this.seccionesPlantilla = Array.isArray(this.plantilla.secciones) 
        ? this.plantilla.secciones.map((s: any) => ({
            idSeccion: s.idSeccion,
            seccionNombre: s.seccionNombre || 'Sección',
            area: s.area || 'Verbal',
            porcentajeArea: s.porcentajeArea || 50,
            totalPreguntas: s.totalPreguntas || 0
          }))
        : [];
    } else {
      // Valores por defecto predeterminados para UDG 50/50
      this.nombre = 'Estructura Oficial PAA UDG (50/50)';
      this.descripcion = 'Área Verbal 50% (Lectura + Redacción) y Área Matemática 50%';
    }
  }

  agregarSeccion() {
    if (!this.idSeccionNueva) {
      this.generales.mensajeError('Selecciona una sección.');
      return;
    }

    const secFound = this.seccionesDisponibles.find(s => s.id == this.idSeccionNueva);
    const nombreSec = secFound ? secFound.nombre : 'Sección ' + this.idSeccionNueva;

    this.seccionesPlantilla.push({
      idSeccion: this.idSeccionNueva,
      seccionNombre: nombreSec,
      area: this.areaNueva,
      porcentajeArea: this.porcentajeAreaNueva,
      totalPreguntas: this.totalPreguntasNueva
    });

    // Resetear form de sección nueva
    this.idSeccionNueva = null;
  }

  eliminarSeccion(index: number) {
    this.seccionesPlantilla.splice(index, 1);
  }

  guardar() {
    if (!this.nombre || this.nombre.trim() === '') {
      this.generales.mensajeError('Ingresa un nombre para la plantilla.');
      return;
    }

    const payload: any = {
      nombre: this.nombre,
      descripcion: this.descripcion,
      secciones: this.seccionesPlantilla
    };

    if (this.plantilla && this.plantilla.id) {
      payload.id = this.plantilla.id;
    }

    this.emitidor.emit(payload);
  }

  cerrar() {
    this.generales.cerrarModal();
  }
}
