import { Component } from '@angular/core';
import { Exercise } from './exercise';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  exercises: Exercise[] = [{
    name: 'abdominal',
    duration: 3,
    repetition: 4,
    preparation: 5,
    rest: 10
  }];

  title = 'Cronometro';
  config = false;
}
