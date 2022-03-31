import { extent } from 'd3';
import { Component, Input, OnInit } from '@angular/core';
import { ChannelService } from '../services/channel.service';
import { WeatherdataService } from '../services/weatherdata.service';
import { Measurement } from '../schemas/schemas';

@Component({
  selector: 'gs-weather-analysis',
  templateUrl: './weather-analysis.component.html',
  styleUrls: ['./weather-analysis.component.scss']
})
export class WeatherAnalysisComponent implements OnInit {

  constructor(private dataService: WeatherdataService,
              public channelService: ChannelService) { }

  data: Measurement[];
  date: Date;
  minDate: Date;
  maxDate: Date;

  dimensions: MeasurementDimension[] = ['humidity' , 'pressure' , 'avg_temp'];

  xAxisDimension: MeasurementDimension = 'avg_temp';
  yAxisDimension: MeasurementDimension = 'humidity';
  colorDimension: MeasurementColorDimension = 'pressure';

  ngOnInit(): void {
    this.dataService.getAllMeasurements().subscribe(data => {
      this.data = data;

      const [minYear, maxYear] = extent(this.data, d => d.date);

      this.date = minYear;
      this.minDate = minYear;
      this.maxDate = maxYear;
    });

  }
}

export type MeasurementDimension = 'humidity' | 'pressure' | 'avg_temp';
export type MeasurementColorDimension = MeasurementDimension | 'continent';
