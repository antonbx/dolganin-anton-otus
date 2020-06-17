import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TextHelperService } from '../text-helper.service';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-recently-added',
  templateUrl: './recently-added.component.html',
  styleUrls: ['./recently-added.component.css']
})
export class RecentlyAddedComponent implements OnInit {

  phrase = new FormControl('');

  constructor(
    private textHelper: TextHelperService,
    private storage: StorageService
  ) { }

  ngOnInit(): void {
  }

  latest() {
    let text = '';
    const phrases = this.storage.getStoreKey('words');

    for (const key in phrases) {
      text += key + ' - ' + phrases[key] + '\n';
    }

    return text;
  }

  addPhrase() {
    this.textHelper.savePhrase(this.phrase.value);
    this.phrase.setValue('');
  }
}
