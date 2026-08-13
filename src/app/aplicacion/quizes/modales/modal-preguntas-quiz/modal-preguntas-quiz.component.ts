import { Component, Input } from '@angular/core';
import { Pregunta } from '../../../../interfaces/pregunta.interface';
import { GeneralesService } from '../../../../servicios/generales.service';
import { AplicacionQuizesService } from '../../../../servicios/aplicacion-quizes.service';

@Component({
  selector: 'app-modal-preguntas-quiz',
  templateUrl: './modal-preguntas-quiz.component.html',
  styleUrl: './modal-preguntas-quiz.component.css'
})
export class ModalPreguntasQuizComponent {
  @Input() datos = {
    idQuiz: 0,
    nombreQuiz: '',
    preguntas: new Array<Pregunta>()
  };
  @Input() lista: any;
  @Input() idQuiz = 0;
  @Input() nombreQuiz = '';
  @Input() update = false;
  numero = '0';
  cargando = false;
  constructor(
    private generales: GeneralesService,
    private servicio: AplicacionQuizesService
  ){}

  ngOnInit(){
    this.datos.idQuiz = this.idQuiz;
    this.datos.nombreQuiz = this.nombreQuiz;
  }

  crear(){
    this.datos.preguntas = new Array<Pregunta>();
    this.generales.delay(500).then(fun => {
      for (let index = 0; index < parseInt(this.numero); index++) {
        this.datos.preguntas.push({
          indice: this.datos.preguntas.length + 1, // el siguiente índice
          pregunta: '',
          respuestaA: '',
          respuestaB: '',
          respuestaC: '',
          respuestaD: '',
          correcta: 'A', // valor por defecto
          explicacion: '',
          idLectura: 0
        });  
      }
    });
  }

  procesar(texto: string){
    this.datos.preguntas = new Array<Pregunta>();
    this.generales.delay(500).then(fun => {
      const bloques = texto
        .split('|P)')
        .map(b => b.trim())
        .filter(b => b);
        
    
      const preguntas: Pregunta[] = [];
    
      bloques.forEach((bloque, idx) => {
        const lineas = bloque
          .split(/\r?\n/)
          .map(l => l.trim())
          .filter(l => l);
    
        if (lineas.length < 6) return; // pregunta + 4 opciones + explicación
    
        const preguntaTexto = lineas[0];
    
        const opcionesArray = lineas
          .filter(l => /^\(\d\)/.test(l))
          .map(l => {
            const textoLimpio = l.replace(/^\(\d\)\s*/, '').trim();
            const correcta = textoLimpio.endsWith('<>');
            return {
              texto: correcta ? textoLimpio.replace('<>', '').trim() : textoLimpio,
              correcta
            };
          });
    
        if (opcionesArray.length !== 4) return; // asegurar que haya 4 opciones
    
        const [op1, op2, op3, op4] = opcionesArray;
    
        let correcta: 'A' | 'B' | 'C' | 'D' = 'A';
        if (op1.correcta) correcta = 'A';
        else if (op2.correcta) correcta = 'B';
        else if (op3.correcta) correcta = 'C';
        else if (op4.correcta) correcta = 'D';
    
        const explicacionLinea = lineas.find(l => l.startsWith('(E)'))?.replace('(E)', '').trim() || '';
    
        this.datos.preguntas.push({
          idLectura: 0,
          indice: idx + 1, // campo incremental empezando en 1
          pregunta: preguntaTexto,
          respuestaA: op1.texto,
          respuestaB: op2.texto,
          respuestaC: op3.texto,
          respuestaD: op4.texto,
          correcta,
          explicacion: explicacionLinea
        });
      });
    });
  }

  guardar(){
    this.datos.preguntas.forEach((pregunta: Pregunta) => {
      if(!this.servicio.validarPregunta(pregunta)){
        return ;
      }
    });
    this.cargando = true;
    this.servicio.preguntas(this.datos).subscribe((respuesta: any) => {
      this.cargando = false;
      this.generales.mensajeCorrecto('Preguntas cargadas correctamente');
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }

  memoria(preguntas: any){
    
  }
}
