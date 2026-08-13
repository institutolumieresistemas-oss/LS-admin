import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';
import { ConfiguracionBannerService } from '../../../../servicios/configuracion-banner.service';

@Component({
  selector: 'app-modal-configuracion-banner',
  templateUrl: './modal-configuracion-banner.component.html',
  styleUrl: './modal-configuracion-banner.component.css'
})
export class ModalConfiguracionBannerComponent {
  listaImagenes: any;
  banner: any;
  @Input() configuracion: any;
  constructor(private generales: GeneralesService,
              private servicio: ConfiguracionBannerService) { }

  ngOnInit(): void {
    this.mostrar();
  }

  mostrar(){
    this.servicio.mostrar({idConfiguracion: this.configuracion}).subscribe(respuesta => {
      this.listaImagenes = respuesta;
    },
    error => {
      
      this.generales.interpretarError(error);
    });
  }

  guardar(){
    const body = {
      banner: this.banner,
      idConfiguracion: this.configuracion
    };
    this.servicio.nuevo(body).subscribe(respuesta => {
      this.generales.mensajeCorrecto('Banner guardado correctamente');
      this.generales.cerrarModal();
    },
    error => {
      this.generales.interpretarError(error);
    });
  }

  eliminar(imagen: any){
    this.servicio.eliminar(imagen).subscribe(respuesta => {
      this.generales.mensajeCorrecto('Banner eliminado correctamente');
      this.mostrar();
    },
    error => {
      this.generales.interpretarError(error);
    });
  }

  actualizarBanners() {
    this.servicio.actualizar({banners: this.listaImagenes}).subscribe(respuesta => {
      this.generales.mensajeCorrecto('Posiciones actualizadas correctamente');
    },
    error => {
      this.generales.interpretarError(error);
    });
  }

  drop(event: any) {
    moveItemInArray(this.listaImagenes, event.previousIndex, event.currentIndex);
  }
}
