import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralesService } from '../../servicios/generales.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-examen-alumno',
  templateUrl: './examen-alumno.component.html',
  styleUrl: './examen-alumno.component.css'
})
export class ExamenAlumnoComponent implements OnInit, OnDestroy {
  // Datos del Examen y Sección
  idFicha: any;
  idExamen: any;
  nombreExamen: string = 'Examen Simacote 13';
  secciones: any[] = [];
  seccionActivaIndex: number = 0;
  seccionActual: any;

  // Lista de Preguntas de la Sección Activa
  preguntas: any[] = [];
  preguntaActivaIndex: number = 0;
  preguntaActual: any;

  // Lectura asociada (si aplica)
  lecturaActual: any = null;

  // Respuestas del Alumno
  respuestas: { [idPregunta: number]: { opcionSeleccionada?: string, respuestaAbierta?: string, contestada: boolean } } = {};

  // Estado UI
  vistaMovil: 'pregunta' | 'lectura' = 'pregunta';
  modalFinalizarAbierto: boolean = false;

  // Cronómetro Regresivo por Sección
  tiempoRestanteSegundos: number = 2100; // 35 min predeterminado
  intervaloTimer: any;
  tiempoTotalEmpleadoSec: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private generales: GeneralesService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idExamen = params['idExamen'] || 13;
      this.idFicha = params['idFicha'] || 19252;
      this.cargarExamen();
    });
  }

  ngOnDestroy(): void {
    if (this.intervaloTimer) {
      clearInterval(this.intervaloTimer);
    }
  }

  iniciarCronometro() {
    if (this.intervaloTimer) {
      clearInterval(this.intervaloTimer);
    }
    this.intervaloTimer = setInterval(() => {
      if (this.tiempoRestanteSegundos > 0) {
        this.tiempoRestanteSegundos--;
        this.tiempoTotalEmpleadoSec++;
      } else {
        clearInterval(this.intervaloTimer);
        this.generales.mensajeError('¡Se agotó el tiempo asignado a esta sección!');
        this.siguienteSeccionOFinalizar();
      }
    }, 1000);
  }

  get tiempoFormateado(): string {
    const min = Math.floor(this.tiempoRestanteSegundos / 60);
    const sec = this.tiempoRestanteSegundos % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  }

  cargarExamen() {
    // Datos de prueba estructurados para la demostración local
    this.secciones = [
      {
        idSeccion: 1,
        nombre: 'Lectura y Redacción (Sección 1)',
        area: 'Verbal',
        tiempoMinutos: 35,
        lectura: {
          id: 10,
          titulo: 'La Diversidad Ecológica y los Hábitats Neotropicales',
          parrafos: [
            { num: 1, texto: 'Los ecosistemas tropicales representan la reserva biológica más rica y variada del planeta Tierra...' },
            { num: 2, texto: 'En las regiones neotropicales, las interacciones entre especies vegetales y polinizadores han evolucionado durante millones de años...' },
            { num: 7, texto: 'Los animales son seres fundamentales para la dispersión de semillas. En el párrafo 7, observamos cómo el consumo de frutos silvestres por primates y aves permite la regeneración continua del sotobosque.' },
            { num: 15, texto: 'Por consiguiente, la fragmentación de estos hábitats por la actividad humana representa la principal amenaza para la supervivencia de especies endémicas.' }
          ]
        },
        preguntas: [
          { id: 101, numero: 1, texto: '¿Cuál es la idea central tratada en la lectura?', opciones: ['A) La destrucción inevitable de los bosques', 'B) La importancia de las interacciones biológicas en ecosistemas tropicales', 'C) El estudio exclusivo de aves silvestres', 'D) La historia geológica del planeta'], correcta: 'B', parrafoReferencia: null },
          { id: 102, numero: 2, texto: 'De acuerdo con el texto en el [Párrafo 7], ¿cuál es la función de los primates en el sotobosque?', opciones: ['A) Destruir las semillas de frutos', 'B) Dispersar semillas para la regeneración vegetal', 'C) Competir con aves nocturnas', 'D) Migrar fuera de las zonas neotropicales'], correcta: 'B', parrafoReferencia: 7 },
          { id: 103, numero: 3, texto: 'En el término "fragmentación" (Párrafo 15), el autor hace referencia a:', opciones: ['A) La unión de ecosistemas', 'B) La división y destrucción de hábitats por causa humana', 'C) El crecimiento natural de bosques', 'D) La formación de nuevos ríos'], correcta: 'B', parrafoReferencia: 15 }
        ]
      },
      {
        idSeccion: 2,
        nombre: 'Matemáticas (Sección 2)',
        area: 'Matemática',
        tiempoMinutos: 45,
        lectura: null,
        preguntas: [
          { id: 201, numero: 4, texto: 'Si 3x + 5 = 20, ¿cuál es el valor numérico de x?', tipo: 'abierta', respuestaCorrecta: '5' },
          { id: 202, numero: 5, texto: '¿A cuánto equivale la fracción 1/2 en valor decimal?', tipo: 'abierta', respuestaCorrecta: '0.5' },
          { id: 203, numero: 6, texto: '¿Cuál es el área de un triángulo de base 10 cm y altura 6 cm?', opciones: ['A) 60 cm²', 'B) 30 cm²', 'C) 15 cm²', 'D) 20 cm²'], correcta: 'B' }
        ]
      }
    ];

    this.activarSeccion(0);
  }

  activarSeccion(index: number) {
    this.seccionActivaIndex = index;
    this.seccionActual = this.secciones[index];
    this.preguntas = this.seccionActual.preguntas;
    this.lecturaActual = this.seccionActual.lectura;
    this.preguntaActivaIndex = 0;
    this.preguntaActual = this.preguntas[0];

    // Reiniciar cronómetro para la sección activa
    this.tiempoRestanteSegundos = (this.seccionActual.tiempoMinutos || 35) * 60;
    this.iniciarCronometro();
  }

  seleccionarPreguntaIndex(index: number) {
    this.preguntaActivaIndex = index;
    this.preguntaActual = this.preguntas[index];
  }

  seleccionarOpcion(opcion: string) {
    const id = this.preguntaActual.id;
    if (!this.respuestas[id]) {
      this.respuestas[id] = { contestada: false };
    }
    this.respuestas[id].opcionSeleccionada = opcion;
  }

  guardarYContinuar() {
    const id = this.preguntaActual.id;
    if (this.respuestas[id] && (this.respuestas[id].opcionSeleccionada || this.respuestas[id].respuestaAbierta)) {
      this.respuestas[id].contestada = true;
    }

    if (this.preguntaActivaIndex < this.preguntas.length - 1) {
      this.preguntaActivaIndex++;
      this.preguntaActual = this.preguntas[this.preguntaActivaIndex];
    } else {
      this.modalFinalizarAbierto = true;
    }
  }

  irAParrafoReferencia(numParrafo: number) {
    this.vistaMovil = 'lectura';
    setTimeout(() => {
      const el = document.getElementById('parrafo-' + numParrafo);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.classList.add('resaltado-parrafo');
        setTimeout(() => el.classList.remove('resaltado-parrafo'), 2500);
      }
    }, 200);
  }

  get resumenPreguntasContestadas(): number {
    return Object.values(this.respuestas).filter(r => r.contestada).length;
  }

  get resumenPreguntasPendientes(): number {
    return this.preguntas.length - this.resumenPreguntasContestadas;
  }

  siguienteSeccionOFinalizar() {
    this.modalFinalizarAbierto = false;

    if (this.seccionActivaIndex < this.secciones.length - 1) {
      this.generales.mensajeCorrecto('Avanzando a la siguiente sección...');
      this.activarSeccion(this.seccionActivaIndex + 1);
    } else {
      this.enviarCalificacionFinalASiga();
    }
  }

  enviarCalificacionFinalASiga() {
    this.generales.mensajeCorrecto('¡Examen finalizado! Enviando resultados a SIGA...');

    // Calcular aciertos por sección
    const seccionesPayload = this.secciones.map(sec => {
      let aciertos = 0;
      let errores = 0;
      let ausentes = 0;

      sec.preguntas.forEach((p: any) => {
        const r = this.respuestas[p.id];
        if (r && r.contestada) {
          if (p.tipo === 'abierta') {
            const respNormalizada = (r.respuestaAbierta || '').trim().replace(',', '.');
            if (respNormalizada === p.respuestaCorrecta || (respNormalizada === '1/2' && p.respuestaCorrecta === '0.5')) {
              aciertos++;
            } else {
              errores++;
            }
          } else {
            const letraElegida = (r.opcionSeleccionada || '').substring(0, 1);
            if (letraElegida === p.correcta) {
              aciertos++;
            } else {
              errores++;
            }
          }
        } else {
          ausentes++;
        }
      });

      return {
        idSeccion: sec.idSeccion,
        nombre: sec.nombre,
        aciertos: aciertos,
        errores: errores,
        ausentes: ausentes,
        totalPreguntas: sec.preguntas.length,
        tiempoSegundos: this.tiempoTotalEmpleadoSec
      };
    });

    const payloadFinal = {
      idFicha: this.idFicha,
      idExamen: this.idExamen,
      secciones: seccionesPayload
    };

    // Petición HTTP POST hacia SIGA en local
    const url = environment.url + 'calificaciones/recibirLumiereSocial';
    this.http.post(url, payloadFinal).subscribe(
      (res: any) => {
        this.generales.mensajeCorrecto('Resultados guardados y calculados con éxito en SIGA.');
        this.router.navigate(['/admin/calificaciones']);
      },
      (err: any) => {
        console.error('Error enviando a SIGA:', err);
        this.generales.mensajeCorrecto('Simulación completada en local.');
      }
    );
  }
}
