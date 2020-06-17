import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  answer = new FormControl('');
  question = this.getQuestion();

  constructor(
    private storage: StorageService
  ) { }

  ngOnInit(): void {
  }

  getQuestion() {
    const words = this.storage.getStoreKey('words') || {};
    const keys = Object.keys(words);
    return words[keys[ keys.length * Math.random() << 0]];
  }

  checkAnswer() {
    const words = this.storage.getStoreKey('words') || {};

    if (words[this.answer.value] === 'fuck') {
      alert('ok');
    }

    this.answer.setValue('');
    this.question = this.getQuestion();
  }

}
