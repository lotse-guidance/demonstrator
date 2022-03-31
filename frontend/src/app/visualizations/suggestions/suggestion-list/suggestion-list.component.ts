import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InteractionTypes, Suggestion } from '../../../schemas/schemas';

@Component({
  selector: 'gs-suggestion-list',
  templateUrl: './suggestion-list.component.html',
  styleUrls: ['./suggestion-list.component.scss']
})
export class SuggestionListComponent<T> {
  @Input() suggestions: Suggestion<T>[]
  @Input() hideTitle: boolean = false;
  @Input() horizontal: boolean = false;
  @Output() actions = new EventEmitter<SuggestionInteractionPair<T>>();
}


export interface SuggestionInteractionPair<T> {
  suggestion: Suggestion<T>;
  action: InteractionTypes;
}
