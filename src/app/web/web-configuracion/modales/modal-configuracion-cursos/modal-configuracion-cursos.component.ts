import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input } from '@angular/core';
import { ConfiguracionCursosService } from '../../../../servicios/configuracion-cursos.service';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-modal-configuracion-cursos',
  templateUrl: './modal-configuracion-cursos.component.html',
  styleUrl: './modal-configuracion-cursos.component.css'
})
export class ModalConfiguracionCursosComponent {
  listaCursos: any;
  listaAsignados: any;
  busqueda = {
    idCalendario: 0,
    idCategoria: 0,
    idCurso: 0
  };
  listas = {
    calendarios: '',
    categorias: '',
    cursos: '',
    altas: ''
  }
  mensaje: any;
  @Input() configuracion: any;
  constructor(private generales: GeneralesService,
              private pagina: ConfiguracionCursosService) { }

  ngOnInit(): void {
    this.mostrar();
  }

  buscar(){
    this.listaCursos = this.generales.sublistaMultiples(this.listas.altas, this.busqueda);
    
  }

  mostrar(){
    this.pagina.mostrar({idConfiguracion: this.configuracion}).subscribe((respuesta: any) => {
      this.listas = respuesta.listas;
      this.listaAsignados = respuesta.datos;
    },
    error => {
      this.generales.interpretarError(error);
    });
  }

  nuevo(){
    const body = {
      lista: this.listaAsignados,
      idConfiguracion: this.configuracion,
      texto: this.mensaje
    };
    this.pagina.nuevo(body).subscribe(respuesta => {
      this.generales.mensajeCorrecto('Cursos configurados correctamente');
      this.mostrar();
    }, 
    error => {
      this.generales.interpretarError(error);
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
}
