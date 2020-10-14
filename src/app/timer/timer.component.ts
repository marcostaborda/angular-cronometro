import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Exercise } from '../exercise';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit, OnDestroy {
  @Input() exercises: Exercise[] = [];
  currentExercise: number = 0;
  currentRepetition: number = 0;
  currentPhase: number = 0;
  timeLeft: number;
  interval: NodeJS.Timeout;

  constructor() { }
  ngOnDestroy(): void {
    this.pause();
  }

  ngOnInit(): void {
    this.restart();
  }

  formatPhase(phase: number) {
    switch (phase) {
      case 0:
        return 'Preparação';
      case 1:
        return 'Exercício';
      case 2:
        return 'Descanso';
      default:
        return 'Finish';
    }
  }
  formatTimeLeft(time: number) {
    return (time / 10).toString();
  }
  restart() {
    this.currentExercise = 0;
    this.currentRepetition = 0;
    this.currentPhase = 0;
    this.timeLeft = this.getTimeOfCurrentPhase();
  }
  next() {
    if (this.currentPhase < 2) {
      this.currentPhase++;
    } else {
      const ex = this.exercises[this.currentExercise];

      if (this.currentRepetition < ex.repetition - 1) {
        this.currentRepetition++;
        this.currentPhase = 1;
      } else {
        if (this.currentExercise < this.exercises.length) {
          this.currentExercise++;
          this.currentRepetition = 0;
          this.currentPhase = 0;
        } else {
          return;
        }
      }
    }
    this.timeLeft = this.getTimeOfCurrentPhase();
  }
  start() {
    if (!this.interval) {
      this.interval = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          this.next();
        }
      }, 100);
    }
  }
  pause() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = undefined;
    }
  }
  getTimeOfCurrentPhase() {
    const exerciseCurrent = this.exercises[this.currentExercise];
    switch (this.currentPhase) {
      case 0:
        return exerciseCurrent.preparation * 10;
      case 1:
        return exerciseCurrent.duration * 10;
      case 2:
        return exerciseCurrent.rest * 10;
    }
  }
}
