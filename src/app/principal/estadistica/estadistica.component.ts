import { Component, OnInit } from '@angular/core';
import { Chart, PointElement, LinearScale, Title, BarController, BarElement, CategoryScale } from 'chart.js';
import { GeneralesService } from '../../servicios/generales.service';
import { ReportesService } from '../../servicios/reportes.service';
Chart.register(BarController, BarElement, PointElement, LinearScale, Title, CategoryScale);

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrl: './estadistica.component.css'
})
export class EstadisticaComponent {
  etiqueta = '';
  datos: any;
  sucursales: any;
  listaCalendarios: any;
  listaNiveles: any;
  listaSubniveles: any;
  listaCategorias: any;
  listaSucursales: any;
  busqueda = {
    idCalendario: 0,
    idNivel: 0,
    idSubnivel: 0,
    idCategoria: 0
  };
  existe = true;
  totalInscritos = 0;
  metasMes: any;
  metasCategorias: any;
  metasCursos: any;
  metaGeneralLicenciatura: any;
  metaGeneralPrepa: any;

  calendario = localStorage.getItem('calendario');
  cargando = false;
  sucursal = localStorage.getItem('sucursal')?.toString();
  sucursalSeleccionada: any;
  sucursalOtras: any;
  constructor(public generales: GeneralesService,
              private reportes: ReportesService) { }

  ngOnInit(): void {
    this.generales.delay(2000).then(fun => {
      this.traerDatos();
    });
    this.sucursalSeleccionada = (this.sucursal === '1') ? 1 : this.sucursal;
    this.sucursalOtras = (this.sucursal === '1') ? 1 : this.sucursal;
  }
  
  traerDatos() {
    this.reportes.inscripciones(this.calendario).subscribe((respuesta: any) => {
      this.metasMes = respuesta.metasMes;
      this.metaGeneralLicenciatura = respuesta.metaGeneralLicenciatura;
      this.metaGeneralPrepa = respuesta.metaGeneralPrepa;
      this.metasCategorias = respuesta.metasCategorias;
      this.metasCursos = respuesta.metasCursos;
      this.totalInscritos = respuesta.total;
      this.datos = respuesta.datos;
      this.sucursales = respuesta.sucursales;

      this.listaCalendarios = respuesta.selects.calendarios;
      this.listaNiveles = respuesta.selects.niveles;
      this.listaSubniveles = respuesta.selects.subniveles;
      this.listaCategorias = respuesta.selects.categorias;
      this.listaSucursales = respuesta.selects.sucursales;
      let data = {
        labels: this.sucursales,
        datasets: [{
          label: this.etiqueta,
          data: this.datos,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 22, 114, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)',
            'rgba(0, 0, 0, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 1, 115)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)',
            'rgba(0, 0, 0)'
          ],
          borderWidth: 1
        }]
      };
      this.renderizarGrafica(data);
    },
    error => {
      this.generales.interpretarError(error);
    });
  }

  buscar() {
    if(!this.generales.validarEntero(this.busqueda.idCalendario) && !this.generales.validarEntero(this.busqueda.idNivel)
       && !this.generales.validarEntero(this.busqueda.idSubnivel) && !this.generales.validarEntero(this.busqueda.idCategoria)){
         this.existe = false;
      this.reportes.buscar(this.busqueda).subscribe((respuesta: any) => {
        this.existe = true;
        this.totalInscritos = respuesta.total;
        this.datos = respuesta.datos;
        this.sucursales = respuesta.sucursales;
        let data = {
          labels: this.sucursales,
          datasets: [{
            data: this.datos,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 22, 114, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(201, 203, 207, 0.2)',
              'rgba(0, 0, 0, 0.2)'
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 1, 115)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
              'rgb(201, 203, 207)',
              'rgba(0, 0, 0)'
            ],
            borderWidth: 1
          }]
        };
        this.generales.delay(100).then(fun => {
          this.renderizarGrafica(data);  
        });
      },
      error => {
        this.existe = true;
        this.generales.interpretarError(error);
      });
    }
  }

  renderizarGrafica(data: any) {
    const chart = new Chart("grafica", {
      type: 'bar',
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
    });
  }

  recargar(){
    window.location.reload();
  }
}
