import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { TrackableVisualizationComponent } from '../../visualizations/trackable-visualization.component';
import { Suggestion } from '../../schemas/schemas';

@Directive()
export abstract class GenericAxisSelectorComponent<T> extends TrackableVisualizationComponent<T> {

  @Input() dimensions: T[];
  @Input() label: string;
  @Input() value: T;
  @Output() valueChange = new EventEmitter<T>();

  valueBeforePreview: T;

  getComponent(): string {
    return 'axis-selector';
  }

  getName(): string {
    return this.label;
  }

  getStrategies(): Array<string> {
    return [];
  }

  guidancePreviewEnd(suggestion: Suggestion<T>): void {
    this.value = this.valueBeforePreview;
    this.valueChange.next(this.valueBeforePreview);
  }

  guidancePreviewStart(suggestion: Suggestion<T>): void {
    this.valueBeforePreview = this.value;
    this.value = suggestion.event.value;
    this.valueChange.next(suggestion.event.value);
  }

  selectAxis(newValue: T): void {
    this.value = newValue;
    this.valueChange.next(newValue);
  }

}
