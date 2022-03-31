import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Suggestion, InteractionTypes } from '../../../schemas/schemas';

@Component({
  selector: 'gs-suggestion-card',
  templateUrl: './suggestion-card.component.html',
  styleUrls: ['./suggestion-card.component.scss']
})
export class SuggestionCardComponent implements OnInit {

  constructor() { }

  @Input() suggestion: Suggestion<any>;
  @Input() isDialog: boolean;
  @Output() feedback = new EventEmitter<InteractionTypes>();

  ngOnInit(): void {
    console.log(this.suggestion);
  }
}
