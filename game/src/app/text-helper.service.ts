import { Injectable } from '@angular/core';
import { TranslateService } from './translate.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class TextHelperService {

  constructor(
    private translator: TranslateService,
    private storage: StorageService
  ) { }

  savePhrase(text: string) {
    text.split(' ')
      .filter((word) => {
        return word.length;
      })
      .map((word) => {
        this.translator.translate(
          word,
          this.storage.getStoreKey('destinationLang') || 'en'
        ).subscribe(({text}) => {
          if (text.length) {
            const words = this.storage.getStoreKey('words') || {};
            words[word] = text.shift();
            this.storage.setStoreKey(
              'words',
              words
            );
          }
        });
      });
  }
}
