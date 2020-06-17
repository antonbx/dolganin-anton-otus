import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  language = new FormControl(this.storage.getStoreKey('destinationLang'));
  number = new FormControl(this.storage.getStoreKey('wordsNumber'));

  constructor(
    private storage: StorageService
  ) { }

  ngOnInit(): void {
  }

  save() {
    this.storage.setStoreKey('destinationLang', this.language.value);
    this.storage.setStoreKey('wordsNumber', this.number.value);
  }

}
