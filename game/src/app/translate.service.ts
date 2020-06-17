import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  serviceAddress = 'https://translate.yandex.net/api/v1.5/tr.json/translate';
  key = 'trnsl.1.1.20160725T055439Z.e9ab033b62450207.d49f163fc7dbe36a05ef944c584382440e9d01ab';

  constructor(private http: HttpClient) { }

  translate(text: string, destinationLanguage: string) {
    const sourceLanguage = 'ru';
    return this.http.get(
      this.serviceAddress + '?key=' + this.key +
      '&lang=' + sourceLanguage + '-' + destinationLanguage +
      '&text=' + text);
  }
}
