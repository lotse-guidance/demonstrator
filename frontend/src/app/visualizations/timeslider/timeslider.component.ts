import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatSlider, MatSliderChange } from '@angular/material/slider';
import { TrackableVisualizationComponent } from '../trackable-visualization.component';
import { Suggestion } from '../../schemas/schemas';

@Component({
  selector: 'gs-timeslider',
  templateUrl: './timeslider.component.html',
  styleUrls: ['./timeslider.component.scss']
})
export class TimesliderComponent extends TrackableVisualizationComponent<string> implements OnInit {

  @Input() minYear: Date;
  @Input() maxYear: Date;
  @ViewChild('slider', {static: false}) public sliderRef: MatSlider;

  userValue: Date;
  valueBeforePreview: Date;

  minMonth = 0;
  currMonth = 0;
  maxMonth = 0;

  @Input() currYear: Date;
  @Output() currYearChange = new EventEmitter<Date>();

  ngOnInit(): void {
    super.ngOnInit();
    this.userValue = this.currYear;

    this.minMonth = this.dateToMonthValueForSlider(this.minYear);
    this.maxMonth = this.dateToMonthValueForSlider(this.maxYear);
    this.currMonth = this.minMonth;
  }

  private dateToMonthValueForSlider(date: Date): number {
    return date.getFullYear() * 12 + date.getMonth();
  }

  getComponent(): string {
    return 'slider';
  }

  getName(): string {
    return 's1';
  }

  getStrategies(): Array<string> {
    return ['month_change'];
  }

  updateYear(event: MatSliderChange): void {
    if (event.value) {
      this.currYearChange.emit(this.sliderValueToDate(event.value));
    }
  }

  slideComplete(event: MatSliderChange): void {
    console.log(event);
    let newValue = this.sliderValueToDate(event.value);
    const offset = newValue.getTimezoneOffset()
    newValue = new Date(newValue.getTime() - (offset*60*1000))
    const update = newValue.toISOString().split('T')[0]
    this.guidanceService.updateState({
      updates: {
        'month': update
      },
      re_evaluate_actions: false
    })
  }

  private sliderValueToDate(val: number): Date {
    const year = Math.floor(val / 12);
    const month = val % 12;

    console.log(new Date(year, month + 1, 0, 0, 0, 0));
    // https://stackoverflow.com/questions/222309/calculate-last-day-of-month
    return new Date(year, month + 1, 0, 0, 0, 0);
  }

  guidancePreviewEnd(suggestion: Suggestion<string>): void {
    this.setCurrYear(this.valueBeforePreview);
  }

  guidancePreviewStart(suggestion: Suggestion<string>): void {
    console.log('starting preview');
    this.valueBeforePreview = this.currYear;
    this.setCurrYear(new Date(new Date(suggestion.event.value).toDateString()));
  }

  setCurrYear(newVal: Date): void {
    console.log('setting new slider date to', newVal);
    this.currYear = newVal;
    this.currYearChange.emit(newVal);
    this.currMonth = this.dateToMonthValueForSlider(this.currYear);
  }
}
