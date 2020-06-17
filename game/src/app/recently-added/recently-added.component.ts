import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TextHelperService } from '../text-helper.service';

@Component({
  selector: 'app-recently-added',
  templateUrl: './recently-added.component.html',
  styleUrls: ['./recently-added.component.css']
})
export class RecentlyAddedComponent implements OnInit {

  phrase = new FormControl('');

  constructor(
    private textHelper: TextHelperService
  ) { }

  ngOnInit(): void {
  }

  addPhrase() {
    this.textHelper.savePhrase(this.phrase.value);
    this.phrase.setValue('');
  }
}
