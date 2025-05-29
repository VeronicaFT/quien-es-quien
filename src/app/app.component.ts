import { Component } from '@angular/core';

interface Character {
  name: string;
  img: string;
  glasses: boolean;
  longHair: boolean;
  hairColor: 'rubio' | 'castaño' | 'pelirrojo' | 'negro';
  beard: boolean;
  mustache: boolean;
  bald?: boolean; // Solo para hombres
  eliminated: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'quien-es-quien';

  gameStarted = false;
  gameEnded = false;
  win = false;
  respuestaPregunta: string | null = null;
  preguntaToast: string | null = null;
  activeQuestion: number | null = null;
  showInstructions = false;

  questions = [
    { text: '¿Tiene gafas?', key: 'glasses', asked: false },
    { text: '¿Tiene el pelo largo?', key: 'longHair', asked: false },
    { text: '¿Tiene barba?', key: 'beard', asked: false },
    { text: '¿Tiene bigote?', key: 'mustache', asked: false },
    { text: '¿Es calvo?', key: 'bald', asked: false },
    { text: '¿Tiene el pelo rubio?', key: 'hairColor', value: 'rubio', asked: false },
    { text: '¿Tiene el pelo castaño?', key: 'hairColor', value: 'castaño', asked: false },
    { text: '¿Tiene el pelo pelirrojo?', key: 'hairColor', value: 'pelirrojo', asked: false },
    { text: '¿Tiene el pelo negro?', key: 'hairColor', value: 'negro', asked: false },
  ];

  characters: Character[] = [
    { name: 'Ana', img: 'assets/ana.png', glasses: true, longHair: true, hairColor: 'rubio', beard: false, mustache: false, eliminated: false },
    { name: 'Luis', img: 'assets/luis.png', glasses: false, longHair: false, hairColor: 'castaño', beard: true, mustache: false, bald: false, eliminated: false },
    { name: 'Marta', img: 'assets/marta.png', glasses: false, longHair: true, hairColor: 'pelirrojo', beard: false, mustache: false, eliminated: false },
    { name: 'Carlos', img: 'assets/carlos.png', glasses: true, longHair: false, hairColor: 'negro', beard: false, mustache: true, bald: false, eliminated: false },
    { name: 'Sofía', img: 'assets/sofia.png', glasses: false, longHair: false, hairColor: 'castaño', beard: false, mustache: false, eliminated: false },
    { name: 'Pablo', img: 'assets/pablo.png', glasses: true, longHair: false, hairColor: 'rubio', beard: false, mustache: true, bald: true, eliminated: false },
    { name: 'Elena', img: 'assets/elena.png', glasses: false, longHair: false, hairColor: 'negro', beard: false, mustache: false, eliminated: false },
    { name: 'Diego', img: 'assets/diego.png', glasses: false, longHair: false, hairColor: 'pelirrojo', beard: true, mustache: false, bald: false, eliminated: false },
    { name: 'Laura', img: 'assets/laura.png', glasses: true, longHair: true, hairColor: 'castaño', beard: false, mustache: false, eliminated: false },
    { name: 'Sergio', img: 'assets/sergio.png', glasses: false, longHair: false, hairColor: 'negro', beard: true, mustache: false, bald: true, eliminated: false },
    { name: 'Julia', img: 'assets/julia.png', glasses: true, longHair: false, hairColor: 'rubio', beard: false, mustache: false, eliminated: false },
    { name: 'Tomás', img: 'assets/tomas.png', glasses: false, longHair: false, hairColor: 'castaño', beard: false, mustache: true, bald: false, eliminated: false }
  ];

  hiddenCharacter!: Character;

  startGame() {
    this.gameStarted = true;
    this.gameEnded = false;
    this.win = false;
    this.questions.forEach(q => q.asked = false);
    this.characters.forEach(c => c.eliminated = false);
    this.hiddenCharacter = this.characters[Math.floor(Math.random() * this.characters.length)];
  }

  askQuestion(q: any) {
    q.asked = true;
    let answer: boolean;
    if (q.key === 'hairColor') {
      answer = this.hiddenCharacter.hairColor === q.value;
    } else if (q.key === 'bald') {
      answer = !!this.hiddenCharacter.bald;
    } else if (q.key === 'glasses') {
      answer = this.hiddenCharacter.glasses;
    } else if (q.key === 'longHair') {
      answer = this.hiddenCharacter.longHair;
    } else if (q.key === 'beard') {
      answer = this.hiddenCharacter.beard;
    } else if (q.key === 'mustache') {
      answer = this.hiddenCharacter.mustache;
    } else {
      answer = false;
    }
    this.respuestaPregunta = answer ? 'Sí' : 'No';
    this.preguntaToast = q.text;
    this.activeQuestion = this.questions.findIndex(qq => qq === q);
    // Ya no se elimina ningún personaje automáticamente
  }

  toggleEliminated(character: Character) {
    character.eliminated = !character.eliminated;
  }

  guessCharacter(character: Character) {
    this.gameEnded = true;
    this.win = character === this.hiddenCharacter;
  }

  restartGame() {
    this.gameStarted = false;
    this.gameEnded = false;
    this.win = false;
    this.activeQuestion = null;
  }
}
